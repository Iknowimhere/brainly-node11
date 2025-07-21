import express from 'express'
import { auth } from '../middlewares/auth.js'
import { getContentForLink, shareContent } from '../controllers/share.controllers.js'

let router =express.Router()

router.post("/share",auth,shareContent)
router.get("/share/:hash",getContentForLink)

export default router