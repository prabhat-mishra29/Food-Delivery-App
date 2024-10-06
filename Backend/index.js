import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import { connectDB } from "./config/DB.js";
import { foodRouter } from "./routes/foodRoute.js";
import { userRouter } from "./routes/UserRoute.js";
import { CartRouter } from "./routes/CartRoute.js";
import { orderRouter } from "./routes/OrderRoute.js";

dotenv.config({
    path:'./.env'
})

//app config:-
const app=express();
const port=4000;

//middlewares:-
app.use(express.json())
app.use(cors())


connectDB();


// api end-points
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",CartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API working!")
})


app.listen(port,()=>{
    console.log(`App is runing on http://localhost:${port}`);
})