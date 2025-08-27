const express = require("express");
const router = express.Router();
const {getAllUsers,getUserById,addRector,removeRector,getAllComplaints,
    getComplaintById,deleteComplaint,} = require("../controllers/adminController");

router.get("/users",getAllUsers)

router.get("/users/:id",getUserById)

router.post("/rectors",addRector)

router.delete("/rectors/:id",removeRector)

router.get("/complaints",getAllComplaints)

router.get("/complaints/:id",getComplaintById)

router.delete("/complaints/:id",deleteComplaint)

module.exports = router;