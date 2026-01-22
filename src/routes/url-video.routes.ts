import { Router } from "express";
import { UrlVideoController } from "../controllers/url-video.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { uploadFile } from "../middlewares/upload.middleware";

const router = Router();
const controller = new UrlVideoController();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["SUPERADMIN"]),
  uploadFile("thumbnail", "thumbnails"),
  controller.create,
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["SUPERADMIN"]),
  uploadFile("thumbnail", "thumbnails"),
  controller.update,
);

router.delete("/:id", authMiddleware, roleMiddleware(["SUPERADMIN"]), controller.delete);

export default router;
