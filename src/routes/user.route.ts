import { Router } from "express";
import * as controller from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/auth_role.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  authorizeRole("SUPERADMIN"),
  controller.create
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRole("SUPERADMIN"),
  controller.update
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRole("SUPERADMIN"),
  controller.remove
);
router.get(
  "/",
  authMiddleware,
  authorizeRole("SUPERADMIN"),
  controller.findAll
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRole("SUPERADMIN"),
  controller.findOne
);

export default router;
