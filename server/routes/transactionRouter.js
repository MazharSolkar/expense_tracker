import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js"
import isOwnerMiddleware from "../middlewares/isOwnerMiddleware.js";
import * as transactionController from "../controllers/transactionController.js"

const router = Router();

router.get('/', authMiddleware, transactionController.index);
router.post('/store', authMiddleware, transactionController.store);
router.delete('/delete/:id', authMiddleware, isOwnerMiddleware, transactionController.destroy);

export default router;