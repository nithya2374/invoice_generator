const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");

const {
  signup,
  login,
  logout,
  getMe,
  refreshToken
} = require("../controllers/authController");

const { authMiddleware } = require("../middleware/authMiddleware");

//  Signup Route (Local)
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("businessName").notEmpty().withMessage("Business name is required"),
    body("contactNumber").matches(/^\d{10}$/).withMessage("Contact number must be 10 digits"),
    body("country").notEmpty().withMessage("Country is required"),
  ],
  signup
);

//  Login Route (Local)
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

//  Get Current User Info (Protected)
router.get("/me", authMiddleware, getMe);

//  Refresh Token Route
router.get("/refresh-token", refreshToken);

//  Logout
router.post("/logout", logout);


module.exports = router;
