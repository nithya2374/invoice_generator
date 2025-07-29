const express = require("express");
const router = express.Router();

const {
  getSummary,
  markInvoicePaid,
  deleteUser,
  getUserDetails,
  getAllInvoices,
  blockUnblockUser,
  getMonthlyStats,
  searchInvoices,
  getStatus,
} = require("../controllers/adminController");

const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");


router.get("/summary",authMiddleware,adminMiddleware, getSummary);
router.get("/status", authMiddleware, adminMiddleware, getStatus);
router.put("/invoice/:id/mark-paid", authMiddleware, adminMiddleware, markInvoicePaid);
router.delete("/user/:id",authMiddleware, adminMiddleware, deleteUser);
router.get("/user/:id",authMiddleware,adminMiddleware, getUserDetails);
router.get("/invoices",authMiddleware,adminMiddleware, getAllInvoices);
router.put("/user/:id/block", authMiddleware,adminMiddleware, blockUnblockUser);
router.get("/stats", authMiddleware,adminMiddleware, getMonthlyStats);
router.get("/search", authMiddleware,adminMiddleware, searchInvoices);

module.exports = router;
