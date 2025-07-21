import express from 'express'
import { auth } from '../middlewares/auth.js'
import { createContent } from '../controllers/content.controllers.js'

let router =express.Router()

router.post("/",auth,createContent)

export default router