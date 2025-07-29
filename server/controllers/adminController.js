const User = require("../models/User");
const Invoice = require("../models/Invoice");

// 1. GET /api/admin/summary
const getSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalInvoices = await Invoice.countDocuments();
    const totalPaid = await Invoice.countDocuments({ isPaid: true });

    res.json({
      totalUsers,
      totalInvoices,
      totalPaid,
      totalUnpaid: totalInvoices - totalPaid,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching summary" });
  }
};

// 2. PUT /api/admin/invoice/:id/mark-paid
const markInvoicePaid = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    invoice.isPaid = true;
    await invoice.save();
    res.json({ message: "Invoice marked as paid" });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark as paid" });
  }
};

// 3. DELETE /api/admin/user/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

// 4. GET /api/admin/user/:id
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user details" });
  }
};

// 5. GET /api/admin/invoices
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("user", "name email");
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: "Error fetching invoices" });
  }
};

// 6. PUT /api/admin/user/:id/block
const blockUnblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully` });
  } catch (err) {
    res.status(500).json({ message: "Error updating block status" });
  }
};

// 7. GET /api/admin/stats
const getMonthlyStats = async (req, res) => {
  try {
    const stats = await Invoice.aggregate([
      {
        $group: {
          _id: { $substr: ["$createdAt", 0, 7] }, // YYYY-MM
          total: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Error generating stats" });
  }
};

// 8. GET /api/admin/search?query=clientName
const searchInvoices = async (req, res) => {
  try {
    const query = req.query.query || "";
    const invoices = await Invoice.find({
      $or: [
        { clientName: { $regex: query, $options: "i" } },
        { status: { $regex: query, $options: "i" } },
      ],
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: "Error searching invoices" });
  }
};

const getStatus = async (req, res) => {
  try {
    //  Basic Counts
    const totalUsers = await User.countDocuments();
    const totalInvoices = await Invoice.countDocuments();
    const paidCount = await Invoice.countDocuments({ status: "paid" });
    const unpaidCount = await Invoice.countDocuments({ status: "unpaid" });

    //  Monthly Revenue (only paid invoices)
    const monthlyRevenue = await Invoice.aggregate([
      {
        $match: { status: "paid" } // Only include paid invoices
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          totalRevenue: { $sum: "$totalAmount" }, // Sum revenue
        }
      },
      {
        $sort: { "_id": 1 } // Sort by month (Jan to Dec)
      }
    ]);

    //  Format monthlyRevenue nicely
    const formattedRevenue = monthlyRevenue.map(item => ({
      month: item._id,
      totalRevenue: item.totalRevenue
    }));

    //  Send the data
    res.status(200).json({
      monthlyRevenue: formattedRevenue,
      totalUsers,
      totalInvoices,
      paidCount,
      unpaidCount
    });

  } catch (error) {
    console.error("Stats error", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getSummary,
  markInvoicePaid,
  deleteUser,
  getUserDetails,
  getAllInvoices,
  blockUnblockUser,
  getMonthlyStats,
  searchInvoices,
  getStatus,
};
