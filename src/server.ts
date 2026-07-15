import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async ()=>{
    try {
        await connectDB();
        app.listen(PORT,()=>{
        })
    } catch (error) {
        process.exit(1);
    }
}

startServer();