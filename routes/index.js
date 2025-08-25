const express = require("express");
const authRoutes = require("./authRoutes");
const studentRoutes = require("./studentRoutes");
const rectorRoutes = require("./rectorRoutes");
const adminRoutes = require("./adminRoutes");
const complaintRoutes = require("./complaintRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/students",studentRoutes);
router.use("/rectors", rectorRoutes);
router.use("/admins", adminRoutes);
router.use("/complaints", complaintRoutes);

module.exports = router;