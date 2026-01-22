import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();
const controller = new UserController();

router.get("/", authMiddleware, roleMiddleware(["SUPERADMIN"]), controller.getAll);

router.get("/:id", authMiddleware, controller.getById);

router.post("/", authMiddleware, roleMiddleware(["SUPERADMIN"]), controller.create);

router.put("/:id", authMiddleware, controller.update);

router.delete("/:id", authMiddleware, roleMiddleware(["SUPERADMIN"]), controller.delete);

export default router;
