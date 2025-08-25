const express = require("express");
const router = express.Router();

router.post("/register",(req,res)=>{
    res.send("Register User");
});

router.post("/login",(req,res)=>{
    res.send("Login user");
});

router.get("/me",(req,res)=>{
    res.send("Get logged-in user profile");
});

router.post("/logout",(req,res)=>{
    res.send("Logout user");
});

module.exports = router;