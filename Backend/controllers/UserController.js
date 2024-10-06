import { UserModel } from "../models/User-model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// log-in:-
export const loginUser = async (req,res) => {
    const {email,password} = req.body;

    try{
        const user = await UserModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User does not exist."})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"Password is not matched."})
        }

        //generate token:-
        const token = createToken(user._id);

        res.json(
            {
                success:true,
                message:"user login successfuly",
                token,
                user
            }
        )
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error while login user!"})
    }

}


const createToken = (id) =>{
    return jwt.sign(
        {
            id
        },
        process.env.JWT_SECRET
    )
}

//register-user:-
export const registerUser = async (req,res) => {
    const{name,email,password}=req.body;

    try{
        const existedUser = await UserModel.findOne({
            $or: [{name}, {email}]
            //Check userName or email present or not
            //$or = is a mongoDB operators
        })

        if(existedUser){
            return res.json({success:false,message:"User already exists."})
        }

        //validating email format and strong password:-
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email!"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter a Strong Password!"})
        }

        //hashing user password:-
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new UserModel({
            name:name,
            email:email,
            password:hashPassword
        })

        //save in the database:-
        const user = await newUser.save();

        console.log(user);
        
        //generate token:-
        const token = createToken(user._id)

        res.json(
            {
                success:true,
                message:"user register successfuly",
                token,
                user
            }
        )
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error while creating user!"})
    }
}