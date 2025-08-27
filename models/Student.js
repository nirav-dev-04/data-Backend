const mongoose = require('mongoose');
 
 const studentSchema = new mongoose.Schema({

   userName : {
     type: String,
    required: true
  },
   email : {
     type: String,
    required: true,
    unique: true,
    lowercase: true
   },
   password :{
     type: String,
    required: true
   },
   roomNo :{
      type: String,
    required: false
   },
   hostelBlock :{
       type: String,
      enum: ['A', 'B', 'C', 'D', 'E', 'F'],
    required: false
   },
   createdAt:{
      type: Date,
      default: Date.now 
   }
 });


 module.exports = mongoose.model('Student' , studentSchema);
