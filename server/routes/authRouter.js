import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import guestMiddleware from "../middlewares/guestMiddleware.js";
import * as authController from "../controllers/authController.js";

const router = Router();

router.post("/register", guestMiddleware, authController.register);
router.post("/login", guestMiddleware, authController.login);
router.delete("/logout", authMiddleware, authController.logout);

export default router;