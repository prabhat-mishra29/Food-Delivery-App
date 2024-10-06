import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"Food Processing"
    },
    date:{
        type:Date,
        default:Date.now()
    },
    payment:{
        type:Boolean,
        default:false
    }
}, {timestamps: true})


export const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema)

/*
  Note:-[mongoDB standardize form]
  When "Order" model stores in database, it converts to lower and plural. --> orders
*/