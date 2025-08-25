const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./database/connection");

// Import middlewares
const authMiddleware = require("./middleware/authMiddleware");
const { validateComplaint, validateLogin } = require("./middleware/validateMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect Database
connectDB();

// Import routes
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const rectorRoutes = require("./routes/rectorRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

// API Routes
app.use("/api/students", studentRoutes); // keep open (for signup/login)
app.use("/api/admins", authMiddleware, adminRoutes);
app.use("/api/rectors", authMiddleware, rectorRoutes);
app.use("/api/complaints", authMiddleware, complaintRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Hostel Management System API ");
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
