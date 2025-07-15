import express from 'express'
import { signin, signup } from '../controllers/user.controllers.js';
let router=express.Router()

//singup
router.post("/signup",signup );

//singin
router.post("/signin",signin );

export default router