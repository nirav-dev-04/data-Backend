
const mongoose = require('mongoose');

 const complaintSchema = new mongoose.Schema({

    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student',required: true },
    complaintText: {    
      type: String,
      required: true},

       status:{
       type: String,
      enum: ['pending', 'in-progress', 'resolved'],
      default: 'pending'
    },

    createdAt: {
      type: Date,
      default: Date.now
    },
    
    resolvedAt : {type: Date}
 });

 module.exports = mongoose.model('Complaint', complaintSchema);