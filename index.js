const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();
const cors = require('cors'); 
app.use(cors());
app.use(express.json());

 // setup mongoose connection
  main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/HostelManagement')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
}

// Import your models here (optional, but useful if you want to test or use them here)
const Student = require('./models/student');
const Admin = require('./models/Admin');
const Rector = require('./models/rector');
const Complaint = require('./models/Complaint');

// Import route files
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const rectorRoutes = require("./routes/rectorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/rectors", rectorRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/complaints", complaintRoutes);

app.get('/',(req,res)=>{
   res.send("Welcome to the Hostel Management System API");
})
app.listen(3000 , () =>{
    console.log("Server is running on port 3000");
})

