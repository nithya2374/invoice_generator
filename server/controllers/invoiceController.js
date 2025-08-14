const Invoice = require("../models/Invoice");
const User = require("../models/User.js"); 
const PDFDocument = require("pdfkit");

// Create Invoice
const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create({
      ...req.body,
      user: req.user._id, // from authMiddleware
    });
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get User's Invoices
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user._id });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Invoice
const updateInvoice = async (req, res) => {
  try {

    const invoice = await Invoice.findById(req.params.id);

     if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (req.user.role !== "admin" && invoice.user.toString() !== req.user._id.toString()) {
       return res.status(403).json({ message: "Unauthorized" });
     }

    // Prevent normal users from editing `ispaid`
    if (req.body.hasOwnProperty("ispaid")) {
      delete req.body.ispaid;  // Remove this field before update
    }

    // Recalculate totalAmount if Items are provided
    if (req.body.Items && Array.isArray(req.body.Items)) {
      req.body.totalAmount = req.body.Items.reduce((acc, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return acc + price * quantity;
      }, 0);
    }
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedInvoice);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Invoice
const deleteInvoice = async (req, res) => {
  try {

    const invoice = await Invoice.findById(req.params.id);

    if (req.user.role !== "admin" && invoice.user.toString() !== req.user._id.toString()) {
       return res.status(403).json({ message: "Unauthorized" });
     }

    if (!invoice || invoice.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: "Invoice deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingleInvoice = async (req, res) => {
  try {

    const invoice = await Invoice.findById(req.params.id);

    if (req.user.role !== "admin" && invoice.user.toString() !== req.user._id.toString()) {
       return res.status(403).json({ message: "Unauthorized" });
     }

    if (!invoice || invoice.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const getSingleInvoice = await Invoice.findOne({ _id: req.params.id, user: req.user._id });
    if (!invoice) return res.status(404).json({ message: "Not found" });
    res.json(invoice);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const generateInvoicePDF = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("user");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Protect the invoice: only admin or owner can download
    if (
      req.user.role !== "admin" &&
      invoice.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${invoice._id}.pdf`,
    });

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // Title
    doc.fontSize(20).text("MyInvoiceApp", { align: "center" });
    doc.moveDown();

    // Invoice details
    doc.fontSize(12).text(`Invoice ID: ${invoice._id}`);
    doc.text(`Name: ${invoice.user?.name}`);
    doc.text(`Email: ${invoice.user?.email}`);
    doc.text(`Amount: ₹${invoice.totalAmount}`);
    doc.text(`Status: ${invoice.ispaid ? "Paid" : "Unpaid"}`);
    doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`);
    doc.moveDown();

    // Items table
    doc.fontSize(14).text("Items:", { underline: true });
    doc.moveDown(0.5);

    if (invoice.Items && invoice.Items.length > 0) {
      invoice.Items.forEach((item, index) => {
        doc.fontSize(12).text(`${index + 1}. ${item.description || "Service"} - ₹${item.amount || invoice.totalAmount}`);
      });
    } else {
      doc.fontSize(12).text("No items found.");
    }

    // Footer
    doc.moveDown(2);
    doc.fontSize(10).fillColor("gray").text("Thank you for your business!", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "PDF generation failed" });
  }
};
    


module.exports = {
  createInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
  getSingleInvoice,
  generateInvoicePDF,
};
