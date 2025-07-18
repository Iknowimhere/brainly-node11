import express from 'express'
import { signin, signup } from '../controllers/user.controllers.js';
import { validate } from '../middlewares/validation.js';
import singupSchema from '../schemas/user.schema.js';
let router=express.Router()

//singup
// /api/v1/users/signup
router.post("/signup",validate(singupSchema),signup );

//singin
router.post("/signin",signin );

export default router