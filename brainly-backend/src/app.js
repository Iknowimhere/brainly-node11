import express from "express";
import db from "./config/db.js";
import userRoutes from './routes/user.routes.js'
import profileRoutes from './routes/profile.route.js'
let app = express();
db()



//middleware
app.use(express.json());

//routes
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/profile",profileRoutes)

// /api/v1/profile
// /api/v1/users


export default app;
