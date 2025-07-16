import express from 'express'
import { signin, signup } from '../controllers/user.controllers.js';
let router=express.Router()

//singup
// /api/v1/users/singup
router.post("/signup",signup );

//singin
router.post("/signin",signin );

export default router