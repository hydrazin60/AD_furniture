import Worker from "../../models/user/worker/worker.models.js";
import bcrypt from "bcrypt";
import cloudinary from "../../utils/cloudnary.js";
import jwt from "jsonwebtoken";
import Branch from "../../models/Branch/Branch.model.js";
import mongoose from "mongoose";

const uploadProfilePic = async (file) => {
  try {
    const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;
    const cloudResponse = await cloudinary.uploader.upload(fileBase64, {
      folder: "profilePic",
    });
    return cloudResponse.secure_url;
  } catch (uploadErr) {
    console.error("Cloudinary Upload Error:", uploadErr);
    throw new Error("Failed to upload profile picture");
  }
};

const checkExistingUser = async (email, phoneNumber) => {
  const existingUser = await Worker.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  return existingUser;
};

const createUser = async (userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 10);
  const user = await Worker.create({
    ...userData,
    password: hashPassword,
  });
  return user;
};

export const StaffRegister = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const {
      fullName,
      email,
      phoneNumber,
      password,
      address,
      role,
      branchName,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
    const AutherData = await Worker.findById(AutherId);
    if (!AutherData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }

    if (role === "Manager") {
      if (AutherData.role !== "Admin") {
        return res.status(403).json({
          success: false,
          error: true,
          message: "Only Admin can create Manager",
        });
      }
    }

    if (!fullName || !phoneNumber || !password || !branchName) {
      return res.status(400).json({
        success: false,
        error: true,
        message:
          "Full name, phone number, password, and branch name are required",
      });
    }
    const branch = await Branch.findOne({ branchName });
    if (!branch) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Branch not found",
      });
    }
    const existingStaff = await checkExistingUser(email, phoneNumber);
    if (existingStaff) {
      return res.status(400).json({
        success: false,
        error: true,
        message: `Staff with email ${
          email || ""
        } or phone number ${phoneNumber} already exists`,
      });
    }

    let profilePicURI = null;
    if (req.file) {
      profilePicURI = await uploadProfilePic(req.file);
    }

    const staff = await createUser({
      fullName,
      email,
      phoneNumber,
      password,
      address,
      profilePic: profilePicURI,
      role,
      BranchId: branch._id,
      StaffRegistery: AutherId,
    });

    const populatedStaff = await Worker.findById(staff._id).populate(
      "BranchId",
      "branchName address branchImage"
    );
    if (
      populatedStaff.role === "Manager" ||
      populatedStaff.role === "MonthlySalaryWorkers" ||
      populatedStaff.role === "DailyWageWorkers" ||
      populatedStaff.role === "ProjectBasedWorkers" ||
      populatedStaff.role === "DeliveryBoy"
    ) {
      branch.BranchStaff.push(staff._id);
      await branch.save();
    }

    const { password: _, ...staffData } = populatedStaff.toObject();

    res.status(201).json({
      success: true,
      error: false,
      message: `${fullName} registered successfully`,
      data: staffData,
    });
  } catch (err) {
    console.error(`Error in StaffRegister:`, err);
    res.status(500).json({
      success: false,
      error: true,
      message: "An unexpected error occurred while registering staff",
    });
  }
};

export const StaffLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email and password are required",
      });
    }

    const staff = await Worker.findOne({ email });
    if (!staff) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Staff not found! Please register first",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, staff.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Incorrect password",
      });
    }

    const staffData = staff.toObject();
    delete staffData.password;

    const populatedStaff = await Worker.findById(staff._id).populate(
      "BranchId",
      "_id branchName address branchImage numberOfWorkers rawMaterials vehicles"
    );

    if (populatedStaff.role !== "Admin") {
      if (!populatedStaff.BranchId) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Branch information not found for this staff",
        });
      }
      staffData.BranchId = populatedStaff.BranchId;
    }

    const token = jwt.sign({ staffId: staff._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .header("Authorization", token)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({
        success: true,
        error: false,
        message: `${staff.fullName} logged in successfully`,
        token: `Bearer ${token}`,
        data: staffData,
      });
  } catch (error) {
    console.log(`Error in Staff Login:`, error.message);
    return res.status(500).json({
      success: false,
      error: true,
      message: "An unexpected error occurred while logging in staff",
    });
  }
};

export const StaffDelete = async (req, res) => {
  try {
    const staffId = req.params.id;
    const AutherId = req.staffId;

    if (!mongoose.Types.ObjectId.isValid(staffId) || !staffId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid staffId",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
  } catch (error) {
    console.log(`Error in Staff Delete:`, error.message);
    return res.status(500).json({
      success: false,
      error: true,
      message: "An unexpected error occurred while deleting staff",
    });
  }
};
