import User from "../models/user.model.js"

export let getUserProfile=async (req,res,next)=>{
    let user=await User.findById(req.userId)
    res.send(`hello ${user.username}`)
}