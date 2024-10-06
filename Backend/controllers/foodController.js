import { FoodModel } from "../models/Food-model.js";
import fs from "fs"

//add food items
export const addFood = async (req,res) =>{

    let image_filename = `${req.file.filename}`

    const food =  new FoodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    //We donot use "cloudinary" here,so we directly paste 'filename' to the image section.

    try{
        await food.save();
        res.json({success:true,message:"food added",data:food})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error while adding!"})
    }
}


//all food list:-
export const listFood = async (req,res) => {
    try{
        const foods=await FoodModel.find({});
        //console.log("food list = ",foods)
        res.json({success:true,message:"list of foods",data:foods})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error while fetching list of foods!"})
    }
}


//remove food item:-
export const removeFood = async (req,res) => {
    try{
        const food=await FoodModel.findById(req.body.id);
        fs.unlink(`./uploads/${food.image}`,()=>{})

        await FoodModel.findByIdAndDelete(req.body.id);

        res.json({success:true,message:"food removed"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error while deleting!"})
    }
}