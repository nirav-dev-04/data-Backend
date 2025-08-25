const express = require("express");
const router = express.Router();

router.get("/users",(req,res)=>{
    res.send("Get all users");
})

router.get("/users/:id",(req,res)=>{
    res.send(`Get user with ID ${req.params.id}`);
})

router.post("/rectors",(req,res)=>{
    res.send("Add a rector");
})

router.delete("/rectors/:id",(req,res)=>{
    res.send(`Remove rector with id ${req.params.id}`);
})

router.get("/complaints",(req,res)=>{
    res.send("Get all the complaints across hostels");
})

router.get("/complaints/:id",(req,res)=>{
    res.send(`Get complaint with id ${req.params.id}`);
})

router.delete("/complaints/:id",(req,res)=>{
    res.send(`Delete complaint with id ${req.params.id}`);
})

module.exports = router;