const express = require("express");
const router = express.Router();
const { getAllComplaints, getComplaintById, createComplaint,updateComplaint,deleteComplaint } = require("../controllers/complaintController");
const authMiddleware = require("../middlewares/authMiddleware");
const {validateComplaint}  = require("../middlewares/validateMiddleware");

router.get("/",authMiddleware,getAllComplaints)

router.get("/:id",authMiddleware,getComplaintById)

//need to authorize student first
router.post("/", authMiddleware, validateComplaint,createComplaint)

//need to authorize student first
router.put("/:id", authMiddleware, validateComplaint,updateComplaint)

//need to authorize admin first
router.delete('/:id',authMiddleware,deleteComplaint);

module.exports = router;