import jwt from 'jsonwebtoken'


export let auth=(req,res,next)=>{
    let token=req.headers?.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).send("Unauthenticated")
    }
    let decodedToken=jwt.verify(token,"topSecret")
    console.log(decodedToken);
    
    next()
}

