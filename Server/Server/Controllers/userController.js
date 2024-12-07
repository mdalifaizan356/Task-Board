const { json } = require("express");
const userModel = require("../Models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { uploadFile } = require("../Utility/cloudinaryServices");
const { genertaeOtp } = require("../Utility/otpGen");
const { sendMail } = require("../Utility/SendOTP");
const jwt = require("jsonwebtoken");
const secretKey = "faizannaziaffaizannaziaffaizannaziaffaizan"

 
// Create User 
exports.createUser = async (req, res) => {
    try {
        const { Email, Password, Photo, OTP, ...restData } = req.body;
        // Check Email already exist or not.
        const existUser = await userModel.findOne({ Email });
        if (existUser) {
            return res.status(404).json({ message: "User Already Exist" });
        }
        const fileupload = await uploadFile(req.files)
        // console.log("Upload Photo faizan",fileupload);
        fileupload.forEach((Photo) => {
            PhotoUrl = Photo.url;
        });
        const randotp = await genertaeOtp();
        if (randotp) {
            sendMail(`${Email}`, "OTP for CRUD", `${randotp}`);
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(Password, salt);

        const finalData = {
            Email,
            Password: hash,
            Photo: PhotoUrl,
            OTP: randotp,
            ...restData,
        }
        console.log("finalData", finalData);
        const newUser = new userModel(finalData);
        await newUser.save();
        console.log("register new User", newUser);
        return res.status(200).json({ message: "Create Account Successfull" });
    }
    catch (err) {
        console.log("Error", err);
        return res.status(404).json({ message: "Internal Error", err });
    }
};


// Login User
exports.loginUser = async (req, res) => {
    const { Email, Password } = req.body
    // console.log(Email, Password);
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
    const token = jwt.sign({ id: databaseEmail._id }, secretKey,) //{expiresIn:1m}

    return res.status(200).json({ token, message: "user login successfully" });
};

//Fetch All user
exports.getAllUser = async (req, res) => {
    const user = await userModel.find()
    res.status(200).json(user);

};

// Find user by ID
exports.findOneUser = async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const user = await userModel.findById(id)
    console.log(user);
};

// Update User
exports.updateUserById = async (req, res) => {
    console.log("Request received to update user"); // 1. Entry point
    console.log("Request Body:", req.body); // 2. Log incoming request body

    const { id } = req.body; // Extracting `id` from request body
    if (!id) {
        console.log("Error: No ID provided in the request body"); // 3. Log error if ID is missing
        return res.status(400).json({ error: "ID is required to update the user" });
    }

    console.log("ID extracted from request body:", id); // 4. Log extracted ID
    const data = req.body; // Remaining data to update
    console.log("Data to update:", data); // 5. Log data being used for update

    // Update user in database
    const user = await userModel.findByIdAndUpdate(id, data, { new: true }); // `new: true` returns updated document
    if (!user) {
        console.log("Error: User not found with ID:", id); // 6. Log if no user is found
        return res.status(404).json({ error: "User not found" });
    }

    console.log("User successfully updated:", user); // 7. Log updated user data
    res.status(200).json(user); // Send updated user in response
};


