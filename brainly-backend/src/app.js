import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import db from "./config/db.js";
import userRoutes from './routes/user.routes.js'
import contentRoutes from './routes/content.route.js'
import brainRoutes from './routes/share.route.js'
import {rateLimit} from 'express-rate-limit'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
let app = express();
db()

//middleware
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))
app.use(rateLimit({
    windowMs:30*1000,
    limit:10,
    standardHeaders:true,
    legacyHeaders:false
}))
app.use(helmet())
app.use(cors())
app.use(express.json());

//routes
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/content",contentRoutes)
app.use("/api/v1/brain",brainRoutes)

export default app;
