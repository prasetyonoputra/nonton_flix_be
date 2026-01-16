import { Application } from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import videoRoute from "./video.route";
import profileRoute from "./profile.route";
import friendRoute from "./friend.routes";
import ratingRoute from "./rating.route";
import commentRoute from "./comment.route";
import playlistRoute from "./playlist.route";

export const registerRoutes = (app: Application) => {
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/videos", videoRoute);
    app.use("/api/profiles", profileRoute);
    app.use("/api/friends", friendRoute);
    app.use("/api/ratings", ratingRoute);
    app.use("/api/comments", commentRoute);
    app.use("/api/playlists", playlistRoute);
};
