import express from "express";
import cors from "cors";
import routes from "../routes/route.js"
import connectDB from "../db/conn.js";

const app = express();

app.use(express.json())

app.use(cors(
    {credentials: true, origin: "https://silver-space-orbit-7v46jqqqjgqfgr9-5173.app.github.dev/"}
))

app.use("/filmes", routes);

export default app;