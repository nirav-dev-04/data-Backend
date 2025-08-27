const Student = require("../models/Student");
const Rector = require("../models/Rector");
const Admin = require("../models/Admin");
const Complaint = require("../models/Complaint");

const getAllUsers = async (req, res, next) => {
  try 
  {
    const students = await Student.find().select("-password");
    const rectors = await Rector.find().select("-password");
    const admins = await Admin.find().select("-password");

    res.json({ students, rectors, admins });
  } catch (err) {
    next(err);
  }
};


const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let user =
      (await Student.findById(id).select("-password")) ||
      (await Rector.findById(id).select("-password")) ||
      (await Admin.findById(id).select("-password"));

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const addRector = async (req, res, next) => {
  try {
    const { userName, email, password, hostelBlock } = req.body;

    if (!userName || !email || !password || !hostelBlock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const rector = new Rector({ userName, email, password, hostelBlock });
    await rector.save();

    res.status(201).json(rector);
  } catch (err) {
    next(err);
  }
};


const removeRector = async (req, res, next) => {
  try {
    const rector = await Rector.findById(req.params.id);

    if (!rector) return res.status(404).json({ message: "Rector not found" });

    await rector.deleteOne();
    res.json({ message: "Rector removed successfully" });
  } catch (err) {
    next(err);
  }
};

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

const deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    await Complaint.deleteOne();
    res.json({ message: "Complaint deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addRector,
  removeRector,
  getAllComplaints,
  getComplaintById,
  deleteComplaint,
}
