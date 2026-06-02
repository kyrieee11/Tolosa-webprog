const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      type: user.type,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

// GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to fetch users",
    });
  }
};

// POST /api/users
const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      contactNumber,
      email,
      type,
      username,
      password,
      address,
      isActive,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !age ||
      !gender ||
      !contactNumber ||
      !email ||
      !username ||
      !password ||
      !address
    ) {
      return res.status(400).json({
        message: "Please fill in all required fields",
      });
    }

    if (!/^\d+$/.test(String(age))) {
      return res.status(400).json({
        message: "Age must be a number only",
      });
    }

    if (!/^\d{11}$/.test(String(contactNumber))) {
      return res.status(400).json({
        message: "Contact number must be 11 digits",
      });
    }

    if (String(username).includes(" ")) {
      return res.status(400).json({
        message: "Username must not contain spaces",
      });
    }

    if (String(password).length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase() });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      age,
      gender,
      contactNumber,
      email,
      type: type || "editor",
      username,
      password: hashedPassword,
      address,
      isActive: typeof isActive === "boolean" ? isActive : true,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to create user",
    });
  }
};

// PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.age && !/^\d+$/.test(String(updateData.age))) {
      return res.status(400).json({
        message: "Age must be a number only",
      });
    }

    if (
      updateData.contactNumber &&
      !/^\d{11}$/.test(String(updateData.contactNumber))
    ) {
      return res.status(400).json({
        message: "Contact number must be 11 digits",
      });
    }

    if (updateData.username && String(updateData.username).includes(" ")) {
      return res.status(400).json({
        message: "Username must not contain spaces",
      });
    }

    if (updateData.password) {
      if (String(updateData.password).length < 8) {
        return res.status(400).json({
          message: "Password must be at least 8 characters",
        });
      }

      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to update user",
    });
  }
};

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to delete user",
    });
  }
};

// POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account is inactive",
      });
    }

    // LabAct7 Enhancement 1: viewers cannot log in
    if (user.type === "viewer") {
      return res.status(403).json({
        message: "Viewers cannot log in",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: user.type,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to login",
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};