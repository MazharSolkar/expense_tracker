import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./database/connectDB.js";
import authRouter from "./routes/authRouter.js";
import transactionRouter from "./routes/transactionRouter.js";

connectDB();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res)=> res.json({message: "hi"}))

app.use("/api/auth", authRouter);
app.use("/api/transaction", transactionRouter);
app.all("*", (req, res) =>
  res.json({ status: "error", message: "404 route not found" })
);

app.listen(process.env.PORT, () => {
  console.log(`listening on http://127.0.0.1:${process.env.PORT}`);
});