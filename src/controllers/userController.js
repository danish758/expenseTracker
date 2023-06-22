const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../modals/userModal");
const { ACCESS_TOKEN_SECERT } = require("../config/env");

const registerUser = asyncHandler(async (req, res) => {
  try {
    console.log("request", req.body);
    const { username, email, password, phone } = req.body || {};
    if (!username || !email || !password || !phone) {
      console.log("inn");
      res.status(400).json({ message: "All fields are mandatory!" });
    }
    const emailAvailable = await Users.findOne({ email });
    const phoneAvailable = await Users.findOne({ phone });
    if (emailAvailable) {
      res.status(400);
      throw new Error("Email already exist!");
    } else if (phoneAvailable) {
      res.status(400);
      throw new Error("Phone already exist!");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({
      _id: user.id,
      email: user.email,
      phone,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body || {};
    if (!phone || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const user = await Users.findOne({ phone });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            phone: user.phone,
            id: user.id,
          },
        },
        ACCESS_TOKEN_SECERT
        // { expiresIn: "59m" }
      );
      res.status(200).json({ id: user.id, accessToken, phone, success: true });
    } else {
      res.status(401);
      throw new Error("email or password is not valid");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
