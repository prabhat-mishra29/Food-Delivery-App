import { UserModel } from "../models/User-model.js";

// add items to user cart.
export const addToCart = async(req,res) => {
    try {
        let userData = await UserModel.findOne({_id:req.body.userId})

        if(!userData){
            return res.json({success:false,message:"The user is not present while fetching user data from the token."})
        }

        console.log("userData = ",userData);

        let cartData =  await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1 ;
        }
        else{
            cartData[req.body.itemId] +=1 ;
        }

        console.log("cartData : ",cartData);

        await UserModel.findByIdAndUpdate(req.body.userId,{cartData});

        console.log("updated userData : ",userData);

        res.json({success:true , message:"Added to Cart",userData});
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error while adding into the cart."})
    }
}


// remove items to user cart.
export const removeToCart = async(req,res) => {
    try {
        let userData = await UserModel.findById(req.body.userId)

        if(!userData){
            return res.json({success:false,message:"The user is not present while fetching user data from the token."})
        }

        console.log("userData = ",userData);

        let cartData =  await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }

        console.log("cartData : ",cartData);

        await UserModel.findByIdAndUpdate(req.body.userId,{cartData});

        console.log("updated userData : ",userData);

        res.json({success:true , message:"Remove from Cart",userData});
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error while removing from the cart."})
    }
}


// fetch user cart.
export const getCart = async(req,res) => {
    try {
        let userData = await UserModel.findOne({_id:req.body.userId})

        if(!userData){
            return res.json({success:false,message:"The user is not present while fetching user data from the token."})
        }

        console.log("userData = ",userData);

        let cartData =  await userData.cartData;

        res.json({success:true , message:"Cart items generated successfuly",cartData});
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error while fetching cart-items."})
    }
}