const express = require("express");
const router = express.Router();

router.get("/me",(req,res)=>{
    res.send("Get student profile");
});

router.put("/me",(req,res)=>{
    res.send("Update student profile");
});

router.post("/complaints",(req,res)=>{
    res.send("Raise new complaint");
})

router.get("/complaints",(req,res)=>{
    res.send("Get all the complaints");
});

router.get("/complaints/:id",(req,res)=>{
    res.send(`Get complaint with ID ${req.params.id}`);
});

module.exports = router;