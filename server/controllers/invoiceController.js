const Invoice = require("../models/Invoice");
const User = require("../models/User.js"); 
const puppeteer = require("puppeteer");

// Create Invoice
const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create({
      ...req.body,
      user: req.user.userId, // from authMiddleware
    });
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get User's Invoices
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.userId });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Invoice
const updateInvoice = async (req, res) => {
  try {

    const invoice = await Invoice.findById(req.params.id);

    if (req.user.role !== "admin" && invoice.user.toString() !== req.user.userId) {
       return res.status(403).json({ message: "Unauthorized" });
     }

    if (!invoice || invoice.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Prevent normal users from editing `ispaid`
    if (req.body.hasOwnProperty("ispaid")) {
      delete req.body.ispaid;  // Remove this field before update
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(invoice);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Invoice
const deleteInvoice = async (req, res) => {
  try {

    const invoice = await Invoice.findById(req.params.id);

    if (req.user.role !== "admin" && invoice.user.toString() !== req.user.userId) {
       return res.status(403).json({ message: "Unauthorized" });
     }

    if (!invoice || invoice.user.toString() !== req.user.userId) {
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

    if (req.user.role !== "admin" && invoice.user.toString() !== req.user.userId) {
       return res.status(403).json({ message: "Unauthorized" });
     }

    if (!invoice || invoice.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const getSingleInvoice = await Invoice.findOne({ _id: req.params.id, user: req.user.userId });
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
      invoice.user._id.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Prepare styled HTML for PDF
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { text-align: center; color: #333; }
            .invoice-box {
              border: 1px solid #eee;
              padding: 20px;
              max-width: 800px;
              margin: auto;
              box-shadow: 0 0 10px rgba(0,0,0,0.15);
            }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f4f4f4; }
            .footer { margin-top: 40px; text-align: center; color: gray; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <h1>Invoice</h1>
            <p><strong>Invoice ID:</strong> ${invoice._id}</p>
            <p><strong>Name:</strong> ${invoice.user.firstname} ${invoice.user.lastname}</p>
            <p><strong>Email:</strong> ${invoice.user.email}</p>
            <p><strong>Amount:</strong> ₹${invoice.amount}</p>
            <p><strong>Status:</strong> ${invoice.isPaid ? " Paid" : "Unpaid"}</p>
            <p><strong>Date:</strong> ${new Date(invoice.createdAt).toLocaleDateString()}</p>

            <table>
              <tr>
                <th>Service</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>${invoice.service || "Web Development"}</td>
                <td>${invoice.description || "Freelance project"}</td>
                <td>₹${invoice.amount}</td>
              </tr>
            </table>

            <div class="footer">
              Thank you for your business.
            </div>
          </div>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    // Set PDF response headers
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${invoice._id}.pdf`,
    });

    res.send(pdfBuffer);
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
