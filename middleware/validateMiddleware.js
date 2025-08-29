//checked the input data before the saving to db.

function validateComplaint(req, res, next) {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Complaint title and description are required" });
    }

    if (description.length < 10) {
        return res.status(400).json({ message: "Description must be at least 10 characters long" });
    }

    next(); // data is valid, move forward
}

function validateLogin(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    next();
}

module.exports = { validateComplaint, validateLogin };