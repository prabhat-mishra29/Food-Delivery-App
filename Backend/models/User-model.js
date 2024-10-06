import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        default:{}
    }
}, { timestamps: true , minimize:false } );


export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

/*
  Note:-[mongoDB standardize form]
  When "User" model stores in database, it converts to lower and plural. --> users
*/