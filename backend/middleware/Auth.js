const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware for authenticating token
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    console.log("user: ", req.userId);
    next();
  } catch (error) {
    console.log("inside auth catch block");
    console.error("Token verification error:", error.message); // Log error details
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
