const mongoose = require('mongoose');

 const rectorSchema = new mongoose.Schema({

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

    password : {
       type: String,
      required: true
    },

    hostelBlock : {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'E', 'F'],
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
 });

 module.exports = mongoose.model('Rector', rectorSchema);