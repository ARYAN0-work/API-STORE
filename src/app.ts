import express from "express";
import route from "./routes/routes"

const app = express()

app.use(express.json())

app.use('/',route);

export default app;