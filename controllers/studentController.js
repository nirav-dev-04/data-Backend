const student = require("../models/Student");
const complaint = require("../models/Complaint");

const getProfile = async(req,res,next) =>{
    try{
        const student = await student.findbyId(req.user.id).select("-password");
        if(!student){
            return res.status(404).json({ message: "Student not found "});
        }
        res.json(student);
    }
    catch(err){
        next(err);
    }
};

const updateProfile = async (req,res,next) =>{
    try{
        const updates = req.body;
        const student = await student.findbyIdAndUpdate(req.user.id,updates,{
            new:true,
        }).select("-password");

        if(!student){
            return res.status(404).json({ message: "Student not found"});
        }

        res.json({
            message: "Profile updated successfully",
            student
        });
    }catch(err){
        next(err);
    }
}

const raiseComplaint = async (req,res,next) =>{
    try{
        const { complaintText } = req.body;

        if(!complaintText){
            return res.status(400).json({ message: "Complaint text is required"});
        }
        const complaint = await Complaint.create({
            studentId: req.user.id,
            complaintText
        });

        res.status(201).json({
            message: "Complaint submitted successfully",
            complaint
        });
    }catch(err){
        next(err);
    }
}

const getMyComplaints = async(req,res,next) =>{
    try{
        const complaints = await Complaint.find({ studentId: req.user.id });
        res.json(complaints);
    }catch(err){
        next(err);
    }
}

const getComplaintById = async(req,res,next) =>{
    try{
        const complaint = await Complaint.findOne({
            _id: req.params.id,
            studentId: req.user.id
        });
        if(!complaint){
            return res.status(404).json({ message: "Complaint not found"});
        }

        res.json(complaint);
    }
    catch(err){
        next(err);
    }
};

module.exports = {
    getProfile,
    updateProfile,
    raiseComplaint,
    getMyComplaints,
    getComplaintById
};