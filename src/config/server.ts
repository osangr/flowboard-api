import express from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import projectRoutes from "../routes/project";

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use("/api/v1/projects", projectRoutes);

export default app;
