const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const cors = require('cors'); 
app.use(cors());
app.use(express.json());

 // setup mongoose connection
  main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://kash1ish:k2114%40shish@cluster0.fme53.mongodb.net/')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
}

// Import your models here (optional, but useful if you want to test or use them here)
const Student = require('./models/student');
const Admin = require('./models/Admin');
const Rector = require('./models/Rector');
const Complaint = require('./models/Complaint');

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth",authRoutes);
app.get('/',(req,res)=>{
   res.send("Welcome to the Hostel Management System API");
})
app.listen(3000 , () =>{
    console.log("Server is running on port 3000");
})

