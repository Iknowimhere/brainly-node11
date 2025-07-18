import express from "express";
import db from "./config/db.js";
import userRoutes from './routes/user.routes.js'
import profileRoutes from './routes/profile.route.js'
import cors from 'cors'
let app = express();
db()



//middleware
app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json());

//routes
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/profile",profileRoutes)

// /api/v1/profile
// /api/v1/users


export default app;
