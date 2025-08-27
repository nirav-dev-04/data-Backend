const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Rector = require('../models/Rector');
const Admin = require('../models/Admin');

//sign JWT
const generateToken = (id,role) =>{
    return jwt.sign({ id, role }, process.env.JWT_SECRET,{
        expiresIn: "1h",
    });
};

//register new user
const registerUser = async(req,res) => {
    try{

        const{ userName, email, password, role } = req.body;
        if(!userName || !email || !password || !role){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        //checks if user already exists 
        let existingUser = (await Student.findOne({ email })) || 
                           (await Rector.findOne({ email }))  ||
                           (await Admin.findOne({ email }));

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create new user
        let user;
        if(role === 'student'){
            user = await Student.create({
                userName, 
                email,
                password: hashedPassword
            });
        }
        else if(role === 'rector'){
            user = await Rector.create({
                userName,
                email,
                password: hashedPassword
            });
        }
        else if(role === 'admin'){
            user = await Admin.create({
                userName,
                email,
                password: hashedPassword
            });
        }
        else{
            return res.status(400).json({
                message: "Invalid role"
            });
        }

        res.status(201).json({
            success: true,
            message: "Registered Successfully",
            token: generateToken(user._id,role),
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role
            }
        });
    }catch(err){
        res.status(500).json({ message: err.message});
    }
};

//login user 
const loginUser = async (req,res) =>{
    try{
        const { email, password } = req.body;

        let user = (await Student.findOne({ email })) || 
                    (await Rector.findOne({ email }))  ||
                    (await Admin.findOne({ email }));

       if(!user){
        return res.status(401).json({ message: "Invalid credentials "});
       }

       const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch){
        return res.status(401).json({ message: "Invalid credentials"})
       }

       let role = "student";
       if(user instanceof Rector) role = "rector";
       if(user instanceof Admin) role = "admin";

       res.json({
        success: true,
        message: "Logged-in Successfully",
        token: generateToken(user._id,role),
        user:{
            id: user._id,
            userName: user.userName,
            email: user.email,
            role,
        },
       });
    }catch(err){
        res.status(500).json({ message: err.message});
    }
};

//get current loggedin user
const getUser = async(req, res)=>{
    res.json({
        id: req.user._id,
        userName: req.user.userName,
        email: req.user.email,
        role: req.user.role
    });
};

//logout user
const logoutUser = (req,res) =>{
    res.json({
        success: true,
        message: "Logged out"
    });
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    logoutUser
};