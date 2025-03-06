import Transaction from "../models/Transaction.js";
import asyncHandler from "../utils/asyncHandler.js";

const isOwnerMiddleware = asyncHandler(async (req, res, next) => {

    const { id } = req.params;
    const authUserId = req.user.id;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        status: "error",
        message: "Transaction not found",
      });
    }

    if (transaction.user.toString() !== authUserId) {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized: You cannot access this transaction",
      });
    }

    next();
});

export default isOwnerMiddleware;