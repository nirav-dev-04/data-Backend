const rector = require("../models/Rector");
const complaint = require("../models/Complaint");
const student = require("../models/Student");
const Rector = require("../models/Rector");


const getComplaints = async(req,res,next) =>{
    try{
        const rector = await Rector.findById(req.user.id);

        if(!rector){
            return res.status(404).json({ message: "Rector not found" });
        }

        const students = await student.find({ hostelBlock: rector.hostelBlock }).select("_id");

        const studentIds = students.map((s)=> s._id);

        const complaints = await Complaint.find({ studentId: { $in: studentIds }});

        res.json(complaints)
    }catch(err){
        next(err);
    }
}

const getComplaintById = async (req,res,next) =>{
    try{
        const rector = await rector.findBy(req.user.id);
        if(!rector){
            return res.status(404).json({ message: "Rector not found "});
        }
        const complaint = await Complaint.findById(req.params.id).populate("studentId","userName hostelBlock");

        if(!complaint){
            return res.status(404).json({ message: "Complaint not found"});
        }

        if(complaint.studentId.hostelBlock !== rector.hostelBlock){
            return res.status(403).json({ message: "Not authorized to view this complaint" });
        }
        res.json(complaint);
    }
    catch(err){
        next(err);
    }
}

const updateComplaintStatus = async(req,res,next)=>{
    try{
        const { status } = req.body;

        if(!["in-progress", "resolved"].includes(status)){
            return res.status(400).json({ message: "Invalid status"});
        }

        const rector = await Rector.findById(req.user.id);
        if(!rector){
            return res.status(404).json({ message: "Rector not found"})
        }
        
        const complaint = await Complaint.findById(req.params.id).populate("studenId", "hostelBlock");

        if(!complaint){
            return res.status(404).json({ message: "Complaint not found"});
        }
        if (complaint.studentId.hostelBlock !== rector.hostelBlock) {
            return res.status(403).json({ message: "Not authorized to update this complaint" });
        }
        complaint.status = status;
        if(status === "resolved"){
            complaint.resolvedAt = new Date();
        }
        await complaint.save();

        res.json({
            message: "Complaint status updated successfully",
            complaint
        });
    }
    catch{err}{
        next(err);
    }
}

module.exports = {
    getComplaints,
    getComplaintById,
    updateComplaintStatus
}