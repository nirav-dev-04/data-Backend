const express = require("express");
const router = express.Router();
const { getComplaints, getComplaintById, updateComplaintStatus } = require("../controllers/rectorController");
const authMiddleware = require("../middlewares/authMiddleware");
const {validateComplaint} = require("../middlewares/validateMiddleware");

router.get("/complaints",authMiddleware,validateComplaint,getComplaints)

router.get("/complaints/:id",authMiddleware,validateComplaint,getComplaintById)

router.put("/complaints/:id/status",authMiddleware,validateComplaint,updateComplaintStatus)

module.exports = router;