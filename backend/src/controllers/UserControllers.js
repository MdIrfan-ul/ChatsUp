import mongoose from "mongoose";
import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import multer from "multer";

export const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name||!email||!password){
            return res.status(400).json({success:false,messsage:"All Fields are Required"});
        }

        // Check if the file exists in the request
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Profile picture is required" });
        }

        let profilePicture = req.file.filename;

        const user = new UserModel({ name, email, password, profilePicture });

        await user.save();

        // Delete the file after saving user details
        // fs.unlinkSync(req.file.path);

        res.status(200).json({ success: true, message: "User registered successfully", user });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // Handle Mongoose validation errors
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ success: false, message: errors.join(", ") });
        } else if (error.code === 11000) {
            // Handle duplicate key error (e.g., email already exists)
            return res.status(400).json({ success: false, message: "Email is already registered" });
        }else if (error instanceof multer.MulterError) {
            // Handle Multer-specific errors (like file size limit)
            if (error.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ success: false, message: "File size is too large. Max limit is 3MB." });
            }
        }
         else {
            // Handle other types of errors
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
};

export const Signin = async(req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:"user not found"});
        }
        if(password){
          const passwordMatch=  await bcrypt.compare(password,user.password);
          if(passwordMatch){
            const userWithoutPassword = user.toObject();
            delete userWithoutPassword.password;
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 ,sameSite:"strict"});
            return res.status(200).json({success:true,message:"user logged in",user:userWithoutPassword,token});

          }else{
            return res.status(400).json({success:false,message:"Invalid Credentials"});
          }

        }
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const getUsers =async(req,res)=>{
    try {
        const loggedUser  = req.userId;
        const allUsers = await UserModel.find({_id:{$ne:loggedUser}}).select('-password');;
        res.status(200).json({success:true,message:"Fetched all users",allUsers});

    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const logout = (req,res)=>{
    try {
        res.cookie("jwt",{maxAge:0});
        res.status(200).json({success:true,message:"Logged out successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server Error"});
    }
}