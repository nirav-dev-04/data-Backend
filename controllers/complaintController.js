const Complaint = require("../models/Complaint");

const getAllComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find().populate("studentId", "userName hostelBlock");
    res.json(complaints);
  } catch (err) {
    next(err);
  }
};

const getComplaintById = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate("studentId", "userName hostelBlock");
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    res.json(complaint);
  } catch (err) {
    next(err);
  }
};

const createComplaint = async (req, res, next) => {
  try {
    const { complaintText } = req.body;

    if (!complaintText) {
      return res.status(400).json({ message: "Complaint text is required" });
    }

    const newComplaint = new Complaint({
      studentId: req.user.id, // from authMiddleware
      complaintText,
    });

    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    next(err);
  }
};


const updateComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    if (complaint.studentId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this complaint" });
    }

    if (complaint.status !== "pending") {
      return res.status(400).json({ message: "Cannot edit complaint once processing has started" });
    }

    complaint.complaintText = req.body.complaintText || complaint.complaintText;
    await complaint.save();

    res.json(complaint);
  } catch (err) {
    next(err);
  }
};

const deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    await complaint.deleteOne();
    res.json({ message: "Complaint deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint,
}
