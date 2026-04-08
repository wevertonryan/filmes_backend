import express from "express";
import cors from "cors";
import routes from "../routes/route.js"
import connectDB from "../db/conn.js";

const app = express();

app.use(express.json())

app.use(cors(
    {credentials: true, origin: "http://localhost:5173"}
))

app.use("/filmes", routes);

export default app;