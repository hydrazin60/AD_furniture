import Branch from "../../../models/Branch/Branch.model.js";
import Worker from "../../../models/user/worker/worker.models.js";
import mongoose from "mongoose";
import cloudinary from "../../../utils/cloudnary.js";

export const GetOneStaffData = async (req, res) => {
  try {
    const staffId = req.params.staffIds;
    const AutherId = req.staffId;

    // Validate staffId
    if (!staffId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "staffId is required",
      });
    }

    // Check if staffId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(staffId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid staffId",
      });
    }

    // Fetch the staff data
    const staffdata = await Worker.findById(staffId).populate("BranchId");
    if (!staffdata) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Staff not found",
      });
    }

    // Fetch the author (logged-in user) data
    const AutherData = await Worker.findById(AutherId);
    if (!AutherData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }

    // Fetch the branch data of the author
    const BranchId = AutherData.BranchId;
    const BranchData = await Branch.findById(BranchId);
    if (AutherData.role !== "Admin") {
      if (!BranchData) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Branch not found",
        });
      }
    }

    // Authorization logic
    if (AutherData.role !== "Admin") {
      // If the author is not an Admin, check if the staff belongs to the same branch
      if (staffdata.BranchId.toString() !== BranchId.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to get this staff data",
        });
      }
    }

    const finastaffdata = staffdata.toObject();
    delete finastaffdata.password;
    return res.status(200).json({
      success: true,
      message: "Staff data fetched successfully",
      staff: finastaffdata,
    });
  } catch (err) {
    console.error(`Error in GetOneStaffData:`, err);
    return res.status(500).json({
      success: false,
      error: true,
      message: "An unexpected error occurred while getting staff data",
    });
  }
};

export const GetAllStaffData = async (req, res) => {
  try {
    const AutherId = req.staffId;
    if (!mongoose.Types.ObjectId.isValid(AutherId)) {
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

    if (AutherData.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to get this staff data",
      });
    }
    const staffdata = await Worker.find().populate("BranchId").limit(10);
    return res.status(200).json({
      success: true,
      message: "Staff data fetched successfully",
      staff: staffdata,
    });
  } catch (err) {
    console.error(`Error in GetAllStaffData:`, err);
    return res.status(500).json({
      success: false,
      error: true,
      message: "An unexpected error occurred while getting staff data",
    });
  }
};

export const GetAllStaffOnBranch = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const branchId = req.params.branchId;
    if (!mongoose.Types.ObjectId.isValid(AutherId)) {
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

    if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to get this staff data",
      });
    }
    const staffdata = await Worker.find({ BranchId: branchId })
      .populate("BranchId", "branchName address branchImage branchPhoneNumber")
      .populate("createdBy", "fullName email");
    return res.status(200).json({
      success: true,
      message: "Staff data fetched successfully",
      staff: staffdata,
    });
  } catch (err) {
    console.error(`Error in GetAllStaffOnBranch:`, err);
    return res.status(500).json({
      success: false,
      error: true,
      message: `An unexpected error occurred while getting staff data ${err.message} `,
    });
  }
};

export const UpdateStaffData = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const staffId = req.params.staffId;
    const { fullName, email, phoneNumber, address } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(AutherId) ||
      !mongoose.Types.ObjectId.isValid(staffId)
    ) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId or staffId",
      });
    }

    const UpdatedStaffData = await Worker.findById(staffId).select("-password");
    if (!UpdatedStaffData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Staff not found",
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

    if (
      AutherData.role !== "Admin" &&
      AutherData.role !== "Manager" &&
      UpdatedStaffData._id.toString() !== AutherData._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to update this staff data",
      });
    }

    UpdatedStaffData.fullName = fullName || UpdatedStaffData.fullName;
    UpdatedStaffData.email = email || UpdatedStaffData.email;
    UpdatedStaffData.phoneNumber = phoneNumber || UpdatedStaffData.phoneNumber;
    UpdatedStaffData.address = address || UpdatedStaffData.address;

    if (req.file) {
      const uploadProfilePic = async (file) => {
        try {
          const fileBase64 = `data:${
            file.mimetype
          };base64,${file.buffer.toString("base64")}`;
          const cloudResponse = await cloudinary.uploader.upload(fileBase64, {
            folder: "profilePic",
          });
          return cloudResponse.secure_url;
        } catch (uploadErr) {
          console.error("Cloudinary Upload Error:", uploadErr);
          throw new Error("Failed to upload profile picture");
        }
      };
      UpdatedStaffData.profilePic = await uploadProfilePic(req.file);
    }

    await UpdatedStaffData.save();

    const finastaffdata = UpdatedStaffData.toObject();
    delete finastaffdata.pa;
    const populateData = await Worker.findById(finastaffdata._id).populate(
      "BranchId",
      "branchName address branchImage branchPhoneNumber"
    );

    return res.status(200).json({
      success: true,
      message: "Staff data updated successfully",
      staff: populateData,
    });
  } catch (error) {
    console.error(`Error in UpdateStaffData: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `An unexpected error occurred while updating staff data: ${error.message}`,
    });
  }
};
