import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../email/emailHandler.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  let { fullName, email, password } = req.body;

  try {
    // ✅ 1. Trim inputs
    fullName = fullName?.trim();
    email = email?.trim().toLowerCase();

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (fullName.length < 3) {
      return res.status(400).json({
        message: "Full name must be at least 3 characters",
      });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registerd" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          ENV.CLIENT_URL,
        );
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }
    } else {
      res.status(400).jsaon({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error while signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    email = email?.trim().toLowerCase();
    password = password?.trim();

    //Check email and password
    if (!email || !password) {
      return res.status(400).json({
        message: "Emil and Password are required",
      });
    }

    //check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    //check email verified
    // if (!user.isVerified) {
    //   return res.status(400).json({
    //     message: "Please verify your email",
    //   });
    // }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal error",
    });
  }
};

export const logout = (_, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({
        message: "Profile pic is required",
      });
    }

    const userId = req.user._id;
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true },
    ).select("-password");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
