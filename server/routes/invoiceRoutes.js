const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
  getSingleInvoice,
  generateInvoicePDF,
} = require("../controllers/invoiceController");

const {authMiddleware}= require("../middleware/authMiddleware");

router.post("/", authMiddleware, createInvoice);
router.get("/", authMiddleware, getInvoices);
router.put("/:id", authMiddleware, updateInvoice);
router.delete("/:id", authMiddleware, deleteInvoice);
router.get("/:id", authMiddleware, getSingleInvoice);
router.get("/:id/pdf",authMiddleware, generateInvoicePDF);

module.exports = router;
