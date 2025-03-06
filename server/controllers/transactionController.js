import asyncHandler from "../utils/asyncHandler.js";
import Transaction from "../models/Transaction.js";
import storeValidator from "../validators/transaction/storeValidator.js";
import updateValidator from "../validators/transaction/updateValidator.js";

const index = asyncHandler(async (req, res) => {
  const authUserId = req.user.id;
  const transactions = await Transaction.find({user: authUserId}).sort({ createdAt: -1 });

  const summary = await Transaction.aggregate([
    {
      $group: {
        _id: null,
        totalIncome: {
          $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
        },
        totalExpense: {
          $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalIncome: 1,
        totalExpense: 1,
        totalSavings: { $subtract: ["$totalIncome", "$totalExpense"] },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    message: "All transactions fetched successfully",
    transactions,
    summary: summary[0] || { totalIncome: 0, totalExpense: 0, totalSavings: 0 },
  });
});

const store = asyncHandler(async (req, res) => {
  const {error} = storeValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details.map((err) => err.message) });
  }

  const { description, amount, type, date} = req.body;

  const authUserId = req.user.id;

  const transaction = await Transaction.create({
    description,
    date,
    amount,
    type,
    user: authUserId,
  });

  return res
    .status(201)
    .json({ status: "success", message: "Transaction created", transaction });
});

const destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const transaction = await Transaction.findById(id);

  if (!transaction) {
    return res
      .status(404)
      .json({ status: "error", message: "Transaction not found" });
  }

  await transaction.deleteOne();

  return res.status(200).json({
    status: "success",
    message: "Transaction deleted successfully",
  });
});

export { index, store, destroy };