import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';


export let auth=async (req,res,next)=>{
    let token=req.headers?.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).send("Please Login")
    }
    let decodedToken=jwt.verify(token,"topSecret")
    let user=await User.findById(decodedToken.id)
    if(!user){
        return res.status(401).send("There is no such user please register")
    }
    req.userId=user._id
    next()
}

