const express = require("express");
const router = express.Router();
const { getComplaints, getComplaintById, updateComplaintStatus } = require("../controllers/rectorController");

router.get("/complaints",getComplaints)

router.get("/complaints/:id",getComplaintById)

router.put("/complaints/:id/status",updateComplaintStatus)

module.exports = router;