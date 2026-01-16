import { Router } from "express";
import * as controller from "../controllers/video.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/auth_role.middleware";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/videos/thumbnail"),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = file.originalname
            .replace(ext, "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-");
        cb(null, `${Date.now()}-${name}${ext}`);
    },
});

export const upload = multer({ storage });
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
