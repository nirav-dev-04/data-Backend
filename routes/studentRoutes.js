const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, raiseComplaint, getMyComplaints, getComplaintById } = require("../controllers/studentController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateComplaint } = require("../middlewares/validateMiddleware");

router.get("/me",authMiddleware,getProfile);

router.put("/me",authMiddleware,updateProfile);

router.post("/complaints",authMiddleware,validateComplaint,raiseComplaint);

router.get("/complaints",authMiddleware,getMyComplaints);

router.get("/complaints/:id",authMiddleware,getComplaintById);

module.exports = router;