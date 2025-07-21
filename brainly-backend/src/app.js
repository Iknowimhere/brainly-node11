import express from "express";
import db from "./config/db.js";
import userRoutes from './routes/user.routes.js'
import contentRoutes from './routes/content.route.js'
import brainRoutes from './routes/share.route.js'
import cors from 'cors'
let app = express();
db()



//middleware
app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json());

//routes
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/content",contentRoutes)
app.use("/api/v1/brain",brainRoutes)

export default app;
