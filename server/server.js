const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const session = require('express-session');


// Route imports
const authRoutes = require("./routes/authRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
  "http://localhost:5173", 
  "https://invoice-generator-rust-sigma.vercel.app"
];

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
});

app.use(cors({ 
    origin: allowedOrigins,
    credentials: true,
 }));
 
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: true }));


connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user",userRoutes);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port 'http://localhost:/${PORT}`));
