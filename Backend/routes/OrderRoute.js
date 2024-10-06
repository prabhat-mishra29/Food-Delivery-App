import express from "express"
import { listOrders, placeOrder, updateStatus, userOrder, verifyOrder } from "../controllers/OrderController.js";
import { authMiddleware } from "../middlewares/name-authentication.middleware.js";

export const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.get("/user-orders",authMiddleware,userOrder);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);