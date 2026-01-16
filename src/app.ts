import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/auth.route";
app.use("/api/auth", authRoutes);

import userRoutes from "./routes/user.route";
app.use("/api/users", userRoutes);

import videoRoute from "./routes/video.route";
app.use("/api/videos", videoRoute);

import profileRoute from "./routes/profile.route";
app.use("/api/profiles", profileRoute);

export default app;
