const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser, logoutUser } = require('../controllers/authController');
const authMiddleware = require("../middlewares/authMiddleware");
const {validateLogin} = require("../middlewares/validateMiddleware");

router.post("/register",registerUser);

router.post("/login",validateLogin,loginUser);

router.get("/me",authMiddleware,getUser);

router.post("/logout",logoutUser);

module.exports = router;