import { User } from "../models/auth.models.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { setCookies } from "../utils/setCookies.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email or password is required",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "this user already exists, please signIn",
      });
    }

    

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      user: newUser,
      success: true,
      message: "account is created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email or password is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user does not exist, please create account",
      });
    }

    const checkpassword = await bcrypt.compare(password, user.password);

    if (!checkpassword) {
      return res.status(404).json({
        success: false,
        message: "email or password is incorrect",
      });
    }

    const token = generateToken(user);

    setCookies(res, token);

    return res.status(200).json({
      success: true,
      message: "User sign in successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};


export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0), 
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
