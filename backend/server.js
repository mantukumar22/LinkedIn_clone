import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";
import mongoose from 'mongoose';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(postRoutes);
app.use(userRoutes);
app.use(express.static("uploads"))





const start = async () => {

    const connectDB = await mongoose.connect(process.env.DB_URL)

    app.listen(process.env.PORT, () => {
        console.log("Server is runnning on port 9080 ")
    })
}

start();