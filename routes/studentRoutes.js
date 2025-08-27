const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, raiseComplaint, getMyComplaints, getComplaintById } = require("../controllers/studentController");

router.get("/me",getProfile);

router.put("/me",updateProfile);

router.post("/complaints",raiseComplaint);

router.get("/complaints",getMyComplaints);

router.get("/complaints/:id",getComplaintById);

module.exports = router;