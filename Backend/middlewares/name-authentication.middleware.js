import jwt from "jsonwebtoken"

export const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;

    if(!token){
        return res.json({success:false,message:"Not authorized! Please login again!"})
    }

    console.log("Auth token : ",token);

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // It will return the 'user' id because we send the 'id' as a payload when we create the token.

        console.log("decodedToken : ",decodedToken);

        //Create new object create karo..
        req.body.userId = decodedToken.id;

        next();
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Invalid access token"})
    }
}