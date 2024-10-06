import express from "express"
import { addToCart,removeToCart,getCart } from "../controllers/CartController.js";
import { authMiddleware } from "../middlewares/name-authentication.middleware.js";

export const CartRouter=express.Router();

CartRouter.post("/add",authMiddleware,addToCart);

CartRouter.post("/remove",authMiddleware,removeToCart);

CartRouter.get("/get",authMiddleware,getCart);