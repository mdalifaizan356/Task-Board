const { json } = require("express");
const userModel = require("../Models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { genertaeOtp } = require("../Utility/otpGen");
const { sendMail } = require("../Utility/SendOTP");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;

 
// Create User 
exports.createUser = async (req, res) => {
    try {
        const { Email, Password, Photo, OTP, ...restData } = req.body;
        // Check Email already exist or not. 
        const existUser = await userModel.findOne({ Email });
        if (existUser) {
            return res.status(404).json({ message: "User Already Exist" });
        }
        const randotp = await genertaeOtp();
        if (randotp) {
            sendMail(`${Email}`, "OTP for CRUD", `${randotp}`);
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(Password, salt);

        const finalData = {
            Email,
            Password: hash,
            OTP: randotp,
            ...restData,
        }
        console.log("finalData", finalData);
        const newUser = new userModel(finalData);
        await newUser.save();
        console.log("register new User", newUser);
        
        return res.status(200).json({ Email, message: "Create Account Successfull" });
    }
    catch (err) {
        console.log("Error", err);
        return res.status(404).json({ message: "Internal Error", err });
    }
};


// OTP Varification
exports.otpVarification = async (req, res) => {
    console.log(req.body);
    // return
    const {Email, OTP} = req.body;
    const databaseEmail = await userModel.findOne({Email })
    console.log(databaseEmail);
    if (databaseEmail) {
        const match = databaseEmail.OTP == OTP;
        if(match){
            await userModel.findOneAndUpdate({ Email },{ $unset: { OTP : "" } });
            return res.status(200).json({ Email, message: "OTP match" });
        } 
    }
    else{
        return res.status(404).json({ message: "OTP not match" });
    }

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


// exports.recoverPassword = async (req, res) => {
//     const { Email, newPassword, OTP } = req.body;
//     const user = await userModel.findOne({ Email });
//     if (user) {
//         const randotp = await genertaeOtp();
//         console.log(randotp);
//         await userModel.findOneAndUpdate({ Email },{ $set: { OTP : randotp } });
//         if (randotp) {
//             sendMail(`${Email}`, "OTP for CRUD", `${randotp}`);
//         }
//         res.send.status(200).json({ message: "User Found" });
//     }
//     else{
//         return res.status(400).json({ message: "Email is not registered" });
//     }
//     if (user.OTP) {
//         const match = user.OTP == OTP;
//         if(match){
//             const salt = bcrypt.genSaltSync(10);
//             const hash = bcrypt.hashSync(newPassword, salt);
//             await userModel.updateOne(
//                 { Email },
//                 { $set: { Password: hash }, $unset: { OTP: "" } }
//               );
//             return res.status(200).json({ Email, message: "OTP match" });
//         } 
//     }
//     else{
//         return res.status(404).json({ message: "OTP not match" });
//     }
//   };



// // Change Password
// exports.changePassword = async (req, res) => {
//     console.log(req.body);
//     const {Email, oldpass, newpass } = req.body

//     const user = await userModel.findOne({ Email });
//     console.log(user);
//         if (!user) {
//             return res.status(400).json({ message: "Email is not registered" });
//         }
//         const dataBasePassword = user.Password;
//         console.log(dataBasePassword);
//         const matchPassword = await bcrypt.compare(oldpass, dataBasePassword);
//         if(match){
//                     return res.status(404).json({ message: "Incorrect Password" });
//         }
    
    

// };