const express = require("express");
const router = express.Router();
const { getAllComplaints, getComplaintById, createComplaint,updateComplaint,deleteComplaint } = require("../controllers/complaintController");

router.get("/",getAllComplaints)

router.get("/:id",getComplaintById)

//need to authorize student first
router.post("/", createComplaint)

//need to authorize student first
router.put("/:id",updateComplaint)

//need to authorize admin first
router.delete('/:id',deleteComplaint);

module.exports = router;