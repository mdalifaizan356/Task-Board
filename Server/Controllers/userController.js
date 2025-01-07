const { json } = require("express");
const userModel = require("../Models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { genertaeOtp } = require("../Utility/otpGen");
const { sendMail } = require("../Utility/SendOTP");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;

exports.createUser = async (req, res) => {
    try {
        const { Email, Password, Photo, OTP, ...restData } = req.body;
        const existUser = await userModel.findOne({ Email });
        if (existUser) {
            console.log("User Exists");
            const match = existUser.OTP === OTP;
            if (match) {
                const updatedUser = await userModel.findOneAndUpdate({ Email },{$set: {...restData,
                Password: bcrypt.hashSync(Password, bcrypt.genSaltSync(10))}, $unset: { OTP: "" }},
                    { new: true }
                );
                return res.status(200).json({Email, message: "Account updated successfully with OTP match!",});
            }
            else {
                return res.status(400).json({ message: "Invalid OTP!" });
            }
        }
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error", err });
    }
};



// OTP Varification
exports.otpVarification = async (req, res) => {
    const {Email} = req.body;
    const existUser = await userModel.findOne({ Email });
        if (existUser) {
            return res.status(404).json({ message: "User Already Exist" });
        }
    const randotp = await genertaeOtp();
        if (randotp) {
            sendMail(`${Email}`, "Task Board OTP", `${randotp}`);
        }
        const saveOTP = {
            Email,
            OTP: randotp,
        }
        console.log("saveOTP", saveOTP);
        const newUser = new userModel(saveOTP);
        await newUser.save();
        console.log("register new User", newUser);
        
        return res.status(200).json({ Email, message: "Create Account Successfull" });
    }



// Login User
exports.loginUser = async (req, res) => {
    const { Email, Password } = req.body
    console.log(Email, Password);
    const databaseEmail = await userModel.findOne({ Email })
    console.log(databaseEmail);
    if (!databaseEmail) {
        return res.status(400).json({ message: "please Signup" });
    }
    const dataBasePassword = databaseEmail.Password;
    const matchPassword = await bcrypt.compare(Password, dataBasePassword);

    if (!matchPassword) {
        return res.status(400).json({ message: "invalid credentials" });
    }
    const token = jwt.sign({ id: databaseEmail._id }, secretKey, { expiresIn: "30m" });
    
    return res.status(200).json({ token, databaseEmail, message: "user login successfully" });
};

// Change Psssword
exports.changePassword = async (req, res) => {
    console.log(req.body);
    try {
        const { Email, oldpass, newpass } = req.body;
        const existUser = await userModel.findOne({ Email });
        if (existUser) {
            const dataBasePassword = existUser.Password;
            const matchPassword = await bcrypt.compare(oldpass, dataBasePassword);
            if (matchPassword) {
                const updatedUser = await userModel.findOneAndUpdate({ Email },{$set: {Password: bcrypt.hashSync(newpass, bcrypt.genSaltSync(10))}},
                    { new: true }
                );
                return res.status(200).json({Email, message: "Password Change Successfully!",});
            }
            else {
                return res.status(400).json({ message: "Invalid Old Password!" });
            }
        }
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error", err });
    }
};


// Recover Psssword
exports.recoverPassword = async (req, res) => {
    console.log(req.body);
    try {
        const { Email, OTP, newpass } = req.body;
        const existUser = await userModel.findOne({ Email });
        if (existUser) {
            const dataBasePassword = existUser.Password;
            const matchPassword = await bcrypt.compare(oldpass, dataBasePassword);
            const match = existUser.OTP === OTP;
            if (matchPassword || match ) {
                const updatedUser = await userModel.findOneAndUpdate({ Email },{$set: {Password: bcrypt.hashSync(Password, bcrypt.genSaltSync(10))}, $unset: { OTP: "" }},
                        { new: true }
                    );
                return res.status(200).json({Email, message: "Password Change Successfully!",});
            }
            else {
                return res.status(400).json({ message: "Invalid Old Password!" });
            }
        }
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error", err });
    }
};

// Recover OTP Varification
exports.recoverOTPVarification = async (req, res) => {
    const {Email} = req.body;
    const existUser = await userModel.findOne({ Email });
        if (!existUser) {
            return res.status(404).json({ message: "User Not Exist" });
        }
        const randotp = await genertaeOtp();
        if (randotp) {
            sendMail(`${Email}`, "Task Board OTP", `${randotp}`);
            const addOTP = await userModel.findOneAndUpdate({ Email },{$set: {OTP: randotp}},
                { new: true }
            );
            return res.status(200).json({Email, message: "Account updated successfully with OTP match!",});
        }
    }


 // Edit profile
exports.editProfile = async (req, res) => {
    console.log(req.body);
    try {
        const { Email, oldpass, newpass } = req.body;
        const existUser = await userModel.findOne({ Email });
        if (existUser) {
            const dataBasePassword = existUser.Password;
            const matchPassword = await bcrypt.compare(oldpass, dataBasePassword);
            if (matchPassword) {
                const updatedUser = await userModel.findOneAndUpdate({ Email },{$set: {Password: bcrypt.hashSync(newpass, bcrypt.genSaltSync(10))}},
                    { new: true }
                );
                return res.status(200).json({Email, message: "Password Change Successfully!",});
            }
            else {
                return res.status(400).json({ message: "Invalid Old Password!" });
            }
        }
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error", err });
    }
};