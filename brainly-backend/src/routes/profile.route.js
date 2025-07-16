import express from 'express'
import { getUserProfile } from '../controllers/profile.controllers.js'
import { auth } from '../middlewares/auth.js'

let router =express.Router()


router.get("/",auth,getUserProfile)

export default router