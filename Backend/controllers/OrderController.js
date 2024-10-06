import { OrderModel } from "../models/Order-model.js";
import { UserModel } from "../models/User-model.js";
import stripe from "stripe";

// Placing user order from frontend
export const placeOrder = async(req,res) => {

    const stripe_ = new stripe(`${process.env.STRIPE_SECRET_KEY}`);

    const frontend_url = "http://localhost:5173"
    try {
        const newOrder = new OrderModel(
            {
                //"userId" comes from middleware.
                userId:req.body.userId,
                items:req.body.items,
                amount:req.body.amount,
                address:req.body.address
            }
        );
        
        const response = await newOrder.save();
        console.log("response = ",response);

        //after user places order,we will clear the cart.
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        //payment link:-
        const line_items = req.body.items.map(
            (item)=>({

                price_data:{
                    currency:"inr",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:item.price*100*80
                },

                quantity:item.quantity
            })
        )

        //push delivery charge:-
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },

            quantity:1
        })

        console.log("line-items : ",line_items);

        const session = await stripe_.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        console.log("session = ",session);

        res.json({success:true,message:"Stripe works perfectly.",session_url:session.url})
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Stripe does not work perfectly."})
    }
}

//verify order:-[actualy we use webhook stripe for verifying orders]
//temporary method:-
export const verifyOrder = async(req,res) => {
    const {orderId,success} = req.body;
    try {
        //here we use success as a string.
        if(success=="true"){
            await OrderModel.findByIdAndUpdate(orderId,{
                payment:true
            })

            res.json({success:true,message:"Paid"})
        }
        else{
            //payment cancel
            await OrderModel.findByIdAndUpdate(orderId)

            res.json({success:false,message:"Not paid"})
        }
    }
    catch (error) {
        console.log(error)
        res.json({success:false,message:"Error while payment!"})
    }
}

// user orders for frontend
export const userOrder = async(req,res) => {
    try {
        const orders = await OrderModel.find({userId:req.body.userId})

        res.json({success:true,message:"Orders received perfectly.",data:orders})
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"An error occurred while extracting orders from the order-model!"})
    }
}

//Listing orders of admin pannel
export const listOrders = async (req,res) => {
    try {
      const orders = await OrderModel.find({});
      res.json({success:true,message:"Successfuly extracted list of all orders!",orders})
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error while fetching all orders!"})
    }
}

//list for updating statu
export const updateStatus = async (req,res) => {
    try {
        await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})

        res.json({success:true,message:"status updated!"})
    }
    catch (error) {
        console.log(error)
        res.json({success:false,message:"error while updating status!"})
    }
}