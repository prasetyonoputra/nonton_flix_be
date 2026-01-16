import { Router } from "express";
import * as controller from "../controllers/video.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/auth_role.middleware";
import multer from "multer";

const upload = multer({ dest: "uploads/videos/" });
const router = Router();

router.post(
    "/",
    authMiddleware,
    upload.single("thumbnail"),
    authorizeRole("SUPERADMIN"),
    controller.create
);

router.put(
    "/:id",
    authMiddleware,
    upload.single("thumbnail"),
    authorizeRole("SUPERADMIN"),
    controller.update
);

router.delete(
    "/:id",
    authMiddleware,
    authorizeRole("SUPERADMIN"),
    controller.remove
);

router.get("/", authMiddleware, controller.findAll);

router.get("/:id", authMiddleware, controller.findOne);

export default router;
