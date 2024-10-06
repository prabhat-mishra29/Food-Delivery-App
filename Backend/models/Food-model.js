import mongoose, {Schema} from "mongoose";

const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
}, {timestamps: true})


export const FoodModel = mongoose.models.Food || mongoose.model("Food", foodSchema)

/*
  Note:-[mongoDB standardize form]
  When "Food" model stores in database, it converts to lower and plural. --> foods
*/