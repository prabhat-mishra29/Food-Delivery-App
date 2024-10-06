import express from "express"
import { loginUser, registerUser } from "../controllers/UserController.js"


export const userRouter=express.Router();

userRouter.post("/register",registerUser)

userRouter.post("/login",loginUser)