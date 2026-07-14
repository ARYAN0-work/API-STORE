import express from "express";
import rootRouter from "./routes/root.routes"

const app = express()

app.use(express.json())

app.use('/',rootRouter);

app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:"Route not found"
    })
})

export default app;