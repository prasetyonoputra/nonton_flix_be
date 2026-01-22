import express from "express";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import path from "path";
import "./models/index.model";

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());
app.use("/api", routes);

app.use(errorMiddleware);

export default app;
