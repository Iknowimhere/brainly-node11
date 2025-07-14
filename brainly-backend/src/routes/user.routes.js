import express from 'express'
import { signup, singin } from '../controllers/user.controllers.js';
let router=express.Router()

//singup
router.post("/signup",signup );

//singin
router.post("/signin",singin );

export default router