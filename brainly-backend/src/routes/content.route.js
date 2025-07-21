import express from 'express'
import { auth } from '../middlewares/auth.js'
import { createContent, deleteContent, getContent } from '../controllers/content.controllers.js'

let router =express.Router()

router.post("/",auth,createContent)
router.get("/",auth,getContent)
router.delete("/:id",auth,deleteContent)

export default router