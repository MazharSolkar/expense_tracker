import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  // Check if token exists in cookies
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "Unauthenticated: No token" });
  }

  // Verify the token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.json({ status: "failed", message: "Invalid or expired token" });
  }

  // Attach user data to request object (useful for auth routes)
  req.user = decoded;
  console.log(req.user.id);
  // Proceed to the next middleware or route
  next();
});

export default authMiddleware;