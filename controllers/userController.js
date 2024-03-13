import nodemailer from "nodemailer";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import DeliverAgent from "../models/deliveryAgent.js";
import ResetToken from "../models/passwordResetToken.js";
import bcrypt from "bcryptjs";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password, isDeliveryingAgent } = req.body;

  if (isDeliveryingAgent) {
    const agent = await DeliverAgent.findOne({ email });

    if (agent && (await agent.matchPassword(password))) {
      const token = generateToken(res, agent._id);

      res.json({
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        deliveryAgent: true,
        token,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  // console.log(userExists)

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const resetPassword = async (req, res) => {
  const { frgtEml } = req.body;
  const user = await User.findOne({ email: frgtEml });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const tokenExist = await ResetToken.findOne({ email: frgtEml });
  let resetToken;
  const salt = await bcrypt.genSalt(0);
  const token = await bcrypt.hash(frgtEml, salt);
  const shortToken = token.substring(0, 10);

  if (tokenExist) {
    resetToken = await ResetToken.findOneAndUpdate(
      { email: frgtEml },
      { token: shortToken, time: new Date() }
    );
  } else {
    resetToken = await ResetToken.create({
      email: user.email,
      token: shortToken,
      time: new Date(),
    });
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "utsav96jaiswal@gmail.com", 
      pass: "xivqulyawyhpmjsx",
    },
  });

  let mailOptions = {
    from: "utsav96jaiswal@gmail.com>", // Sender address
    to: user.email, // List of recipients
    subject: "Password Reset", // Subject line
    text: "Want to Reset Password", // Plain text body
    html: `<p>Hear is the Link, <a href=https://proshop-front.onrender.com/forget-password?email=${user.email}&&token=${shortToken}>click to change<a></p>`, // HTML body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
  res.json({});
};

const getUpPass = async (req, res) => {
  const { email, newPass, token } = req.body;

  const updateUser = await ResetToken.findOne({ email });

  var timeDiff = new Date().getTime() - new Date(updateUser.time).getTime();
  var tmeInMinutes = timeDiff / (1000 * 60);

  if (Math.floor(tmeInMinutes) < 6) {
    if (token === updateUser.token) {
      const hashedPassword = await bcrypt.hash(newPass, 10);
      await User.findOneAndUpdate({ email }, { password: hashedPassword });
      return res.status(200).send("Password updated successfully");
    } else {
      return res.status(404).send(`Token doesn't match`);
    }
  } else {
    return res.status(404).send("Time has been exceeded");
  }
};

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  resetPassword,
  getUpPass,
};
