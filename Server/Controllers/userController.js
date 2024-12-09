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
    const token = jwt.sign({ id: databaseEmail._id }, secretKey, { expiresIn: "1m" });
    return res.status(200).json({ token, message: "user login successfully" });
};


// // Recover Password
// exports.recoverPassword = async (req, res) => {
//     const { Email, newPassword, OTP } = req.body
//     console.log(Email, newPassword, OTP);
    
//     const databaseEmail = await userModel.findOne({ Email })
//     console.log(databaseEmail);
//     if (databaseEmail) {
//         const randotp = await genertaeOtp();
//         console.log(randotp);
//         if (randotp) {
//             sendMail(`${Email}`, "OTP for CRUD", `${randotp}`);
//             console.log("OTP sent");
//         }
//     }
//     else{
//         return res.status(400).json({ message: "please Signup" });
//     }


// };





exports.recoverPassword = async (req, res) => {
  const { Email, newPassword, OTP } = req.body;

  const user = await userModel.findOne({ Email });
  if (!user) {
    return res.status(400).json({ message: "Email is not registered" });
  }

//   If OTP is provided, verify the OTP and update the password
  if (OTP && newPassword) {
    // Check if OTP matches
    if (user.OTP !== OTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Update password (make sure to hash it if required)
    const dataBasePassword = user.Password;
    const matchPassword = await bcrypt.compare(newPassword, dataBasePassword);

    user.Password = newPassword; // For example, hash the password before saving
    user.OTP = undefined; // Clear OTP after successful reset
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  }

//   If OTP is not provided, generate OTP and send it via email
  if (!user.OTP) {
    const randotp = await genertaeOtp();
        if (randotp) {
            sendMail(`${Email}`, "OTP for CRUD", `${randotp}`);
        }

    // Save OTP to user's record (for comparison later)
    user.OTP = randotp;
    await user.save();
  }
};
