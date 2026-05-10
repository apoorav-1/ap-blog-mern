import express from "express";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";





dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());


connectDB();

app.use("/api/posts" , postRoutes)
app.use("/api/auth" , authRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("the server is listening ");
});





