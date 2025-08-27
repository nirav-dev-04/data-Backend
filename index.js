const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./database/connection");

// Import middlewares
const authMiddleware = require("./middleware/authMiddleware");
const { validateComplaint, validateLogin } = require("./middleware/validateMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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
const Rector = require('./models/Rector');
const Complaint = require('./models/Complaint');

  
app.get('/',(req,res)=>{
   res.send("Welcome to the Hostel Management System API");
})
app.listen(3000 , () =>{
    console.log("Server is running on port 3000");
})

