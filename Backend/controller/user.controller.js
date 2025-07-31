// controllers/userController.js

import User from "../model/User.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import OTP from "../model/otp.model.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)

    await OTP.deleteMany({ email });

    await OTP.create({
      username,
      email,
      password,
      otp,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    console.log(`✅ OTP for ${email} is ${otp}`);

    return res.status(200).json({ msg: "OTP sent to your email." });
  } catch (error) {
    console.error("❌ Error in registerController:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ msg: "Email and OTP are required" });
    }

    const tempUser = await OTP.findOne({ email }).sort({ createdAt: -1 });
    console.log(tempUser);

    if (!tempUser) {
      return res.status(400).json({ msg: "OTP expired or not requested" });
    }

    if (tempUser.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    const newUser = new User({
      username: tempUser.username,
      email: tempUser.email,
      password: tempUser.password,
    });

    await newUser.save();
    await OTP.deleteMany({ email });

    return res.status(201).json({ msg: "Account created successfully!" });
  } catch (error) {
    console.error("❌ Error in verifyOTP:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    console.log(user.password)
    console.log(password)
    if (!user) {
      return res.status(401).json({ errors: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({ errors: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const { password: pw, ...userData } = user._doc;

    res.status(200).json({ user: userData, token });
  } catch (err) {
    console.log("❌ Error in loginController:", err);
    res.status(500).json({ msg: err });
  }
};

// export const fetchController = async (req,res) => {


//   try{
//      const { email, password } = req.body;

//     const user = await User.findOne({ email }).select("+password");

//     if(user) {
//       return res.status(200).json(user);
//     }
   

//   } catch(err) {
//     res.status(500).json({msg:err});
//   }

// }