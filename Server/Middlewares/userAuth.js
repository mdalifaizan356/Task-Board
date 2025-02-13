const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const secretKey = process.env.SECRETKEY;

module.exports = async (req, res, next) => {
    try {
        const token = req.headers?.authorization;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const splitToken = token.split(" ")[1]; // Bearer token
        const decoded = jwt.verify(splitToken, secretKey);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        const user = await userModel.findById(decoded.id).select("-password"); // Exclude password
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; // Store user data in request
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};