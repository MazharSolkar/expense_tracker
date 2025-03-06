import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const guestMiddleware = asyncHandler(async (req, res, next) => {
  // Check if a token exists in cookies
  const token = req.cookies.token;
  if (token) {
    try {
      // Verify the token
      jwt.verify(token, process.env.JWT_SECRET);
      return res.status(403).json({ status: "failed", message: "Access denied: Already logged in" });
    } catch (error) {
      // If the token is invalid or expired, proceed as a guest
      next();
    }
  } else {
    // If no token, proceed as a guest
    next();
  }
});

export default guestMiddleware;