// routes/userRoutes.js
const express = require("express");
const {authMiddleware}= require("../middleware/authMiddleware");
const User = require("../models/User");
const router = express.Router();


router.put("/update-profile/:id", authMiddleware, async (req, res) => {
  const { name, businessName, contactNumber, country } = req.body;

  try {
    
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, businessName, contactNumber, country },
      { new: true }
    );

    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
