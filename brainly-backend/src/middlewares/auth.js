import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';


export let auth=async (req,res,next)=>{
    //get token from headers
    let token=req.headers?.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).send("Please Login")
    }
    //verfying token using jwt
    let decodedToken=jwt.verify(token,"topSecret")
    //check user exists in the db
    let user=await User.findById(decodedToken.id)
    if(!user){
        return res.status(401).send("There is no such user please register")
    }
    //attach user to req object
    req.userId=user._id
    next()
}

