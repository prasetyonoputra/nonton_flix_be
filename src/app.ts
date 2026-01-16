import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

registerRoutes(app);

export default app;
