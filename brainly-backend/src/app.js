import express from "express";
import db from "./config/db.js";
import userRoutes from './routes/user.routes.js'
let app = express();
db()



//middleware
app.use(express.json());

//routes
app.use(userRoutes)


export default app;
