const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Get all complaints");
})

router.get("/:id",(req,res)=>{
    res.send(`Get complaint with id ${req.params.id}`);
})

//need to authorize student first
router.post("/", (req,res)=>{
    res.send("Create new complaint");
})

//need to authorize student first
router.put("/:id",(req,res)=>{
    res.send(`Update complaint ${req.params.id}`);
})

//need to authorize admin first
router.delete('/:id',(req,res)=>{
    res.send(`Delete complaint ${req.params.id}`);
})

module.exports = router;