const express = require("express");
const router = express.Router();

router.get("/complaints",(req,res)=>{
    res.send("Get all the complaints");
})

router.get("/complaints/:id",(req,res)=>{
    res.send(`Get specific complaint ${req.params.id}`);
})

router.put("/complaints/:id/status",(req,res)=>{
    res.send(`Update complaint ${req.params.id} status`);
})

module.exports = router;