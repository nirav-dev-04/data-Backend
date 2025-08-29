const express = require("express");
const router = express.Router();
const {getAllUsers,getUserById,addRector,removeRector,getAllComplaints,
    getComplaintById,deleteComplaint,} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const {validateComplaint}   = require("../middlewares/validateMiddleware");

router.get("/users",authMiddleware,getAllUsers)

router.get("/users/:id",authMiddleware,getUserById)

router.post("/rectors",authMiddleware,addRector)

router.delete("/rectors/:id",authMiddleware,removeRector)

router.get("/complaints",authMiddleware,validateComplaint ,getAllComplaints)

router.get("/complaints/:id",authMiddleware,validateComplaint ,getComplaintById)

router.delete("/complaints/:id",authMiddleware,validateComplaint,deleteComplaint)

module.exports = router;