import Worker from "../../models/user/worker/worker.models.js";
import bcrypt from "bcrypt";
import cloudinary from "../../utils/cloudnary.js";
import Branch from "../../models/Branch/Branch.model.js";
import jwt from "jsonwebtoken";
export const StaffRegister = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      password,
      address,
      role,
      branchName,
    } = req.body;
    const Branch = await Branch.findOne({ branchName });
    if (!Branch) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Branch not found",
      });
    }
    if (!fullName) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Full name is required",
      });
    }

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Phone number is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Password is required",
      });
    }

    const existingStaff = await Worker.findOne({
      $or: [{ email }, { phoneNumber }],
    });

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
      try {
        const fileBase64 = `data:${
          req.file.mimetype
        };base64,${req.file.buffer.toString("base64")}`;
        const cloudResponse = await cloudinary.uploader.upload(fileBase64, {
          folder: "profilePic",
        });
        profilePicURI = cloudResponse.secure_url;
      } catch (uploadErr) {
        console.error("Cloudinary Upload Error:", uploadErr);
        return res.status(500).json({
          success: false,
          error: true,
          message: "Failed to upload profile picture",
        });
      }
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const staff = await Worker.create({
      fullName,
      email,
      phoneNumber,
      password: hashPassword,
      address,
      profilePic: profilePicURI,
      role,
      BranchId: Branch._id,
    });

    const { password: _, ...StaffData } = staff.toObject();

    const populatedStaff = await Worker.findById(staff._id).populate(
      "BranchId",
      "branchName address branchImage"
    );

    res.status(201).json({
      success: true,
      error: false,
      message: `${fullName} registered successfully`,
      data: StaffData,
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
    console.log("Login Request Body:", req.body);
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

    // if (!populatedStaff.BranchId) {
    //   return res.status(400).json({
    //     success: false,
    //     error: true,
    //     message: "Branch information not found for this staff",
    //   });
    // }
    // staffData.BranchId = populatedStaff.BranchId;

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
