import express from "express";
import route from "./routes/routes"

const app = express()

app.use('/',route);

export default app;