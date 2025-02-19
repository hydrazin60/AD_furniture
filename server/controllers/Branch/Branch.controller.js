import cloudinary from "../../utils/cloudnary.js";
import { getDataUri } from "../../utils/dataUri.js";
import bcrypt from "bcrypt";
import Worker from "../../models/user/worker/worker.models.js";
import Branch from "../../models/Branch/Branch.model.js";

export const createNewBranch = async (req, res) => {
  try {
    const { branchName, branchPassword, address } = req.body;
    const branchImages = req.files;

    // Validate required fields
    // 
    if (!branchName || !branchPassword || !address) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Branch name, password, and address are required",
      });
    }

    // Check if branch already exists
    const existingBranch = await Branch.findOne({ branchName });
    if (existingBranch) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Branch already exists",
      });
    }

    // Verify admin permissions
    const staffId = req.staffId;
    const staffData = await Worker.findById(staffId);
    if (!staffData || staffData.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Only admin can create a new branch",
      });
    }

    // Handle branch images
    const imageUris = [];
    if (Array.isArray(branchImages) && branchImages.length > 0) {
      await Promise.all(
        branchImages.map(async (image) => {
          try {
            const fileUri = getDataUri(image);
            const cloudResponse = await cloudinary.uploader.upload(
              fileUri.content,
              {
                folder: "BranchImages",
              }
            );
            imageUris.push({
              public_id: cloudResponse.public_id,
              url: cloudResponse.secure_url,
            });
          } catch (error) {
            console.error("Error uploading branch image:", error);
          }
        })
      );
    }

    // Ensure at least one image is uploaded
    if (imageUris.length === 0) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "At least one branch image is required",
      });
    }
    // Hash the branch password
    const hashedPassword = await bcrypt.hash(branchPassword, 10);
    // Create new branch
    const newBranch = new Branch({
      branchName,
      branchPassword: hashedPassword,
      address,
      branchImage: imageUris,
      branchCreateBy: staffData._id, // Correct field name
    });

    // Save the branch to the database
    const savedBranch = await newBranch.save();
    // Remove sensitive data before sending the response
    const branchData = savedBranch.toObject();
    delete branchData.branchPassword;
    // Populate the branchCreateBy field with admin details
    const populatedBranch = await Branch.findById(branchData._id).populate(
      "branchCreateBy", // Correct field name
      "-password" // Exclude password field
    );

    return res.status(201).json({
      success: true,
      error: false,
      message: "Branch created successfully",
      data: populatedBranch,
    });
  } catch (error) {
    console.error("Error in createNewBranch controller:", error.message);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};

export const updateBranch = async (req, res) => {
  try {
    const branchId = req.params.branchId;
    const AutherId = req.staffId;
    const { branchName, branchPassword, address } = req.body;
    const branchImages = req.files;

    console.log(req.files);
    console.log(req.body);

    if (!branchId || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "branchId and AutherId are required",
      });
    }

    const Auther = await Worker.findById(AutherId);
    if (!Auther) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author ID not found",
      });
    }

    if (Auther.role !== "Manager" && Auther.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Only manager and admin can update a branch",
      });
    }

    const branchData = await Branch.findById(branchId);
    if (!branchData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Branch not found",
      });
    }

    if (Auther.role !== "Admin") {
      if (Auther._id.toString() !== branchData.branchCreateBy.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "Unauthorized to update this branch",
        });
      }
    }

    const imageUris = [];
    if (Array.isArray(req.files) && req.files.length > 0) {
      await Promise.all(
        branchImages.map(async (image) => {
          try {
            const fileUri = getDataUri(image);
            const cloudResponse = await cloudinary.uploader.upload(
              fileUri.content,
              {
                folder: "BranchImages",
              }
            );
            imageUris.push({
              public_id: cloudResponse.public_id,
              url: cloudResponse.secure_url,
            });
          } catch (error) {
            console.error("Error uploading branch image:", error);
          }
        })
      );
    }

    let hashedPassword;
    if (branchPassword) {
      hashedPassword = await bcrypt.hash(branchPassword, 10);
    }

    const updatedBranch = await Branch.findByIdAndUpdate(
      branchId,
      {
        branchName,
        branchPassword: hashedPassword || branchData.branchPassword, // Use existing password if not provided
        address,
        branchImage: imageUris.length > 0 ? imageUris : branchData.branchImage, // Use existing images if no new ones are uploaded
      },
      { new: true }
    );

    const populatedBranch = await Branch.findById(updatedBranch._id).populate(
      "branchCreateBy",
      "-password"
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "Branch updated successfully",
      data: populatedBranch,
    });
  } catch (error) {
    console.error("Error in updateBranch controller:", error.message);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};

export const getAllBranchBtAdmin = async (req, res) => {
  try {
    const AuterId = req.staffId;
    if (!AuterId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Admin not found",
      });
    }
    const Auther = await Worker.findById(AuterId);
    if (!Auther) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Admin not found",
      });
    }
    if (Auther.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Only admin can get all branches",
      });
    }

    const BranchData = await Branch.find().populate(
      "branchCreateBy",
      "-password"
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "Branches fetched successfully",
      data: BranchData,
    });
  } catch (error) {
    console.error("Error in getAllBranchBtAdmin controller:", error.message);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};

export const GetObeBranchDetailsByBothAdminANdManager = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const Branchid = req.params.branchId;
    if (!AutherId || !Branchid) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Admin and branchId are required",
      });
    }
    const AUther = await Worker.findById(AutherId);
    if (!AUther) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Admin not found",
      });
    }
    if (AUther.role !== "Admin" && AUther.role !== "Manager") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Only admin and manager can get all branches",
      });
    }

    const BranchData = await Branch.findById(Branchid).populate(
      "branchCreateBy",
      "-password"
    );

    if (AUther.role !== "Admin") {
      if (BranchData.branchCreateBy.toString() !== AUther._id.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to get this branch details",
        });
      }
    }
    return res.status(200).json({
      success: true,
      error: false,
      message: "Branches fetched successfully",
      data: BranchData,
    });
  } catch (error) {
    console.error(
      "Error in GetObeBranchByBothAdminANdManager controller:",
      error.message
    );
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};

export const deleteBranch = async (req, res) => {
  try {
    const branchId = req.params.branchId;
    const AutherId = req.staffId;
    if (!branchId || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "branchId and AutherId are required",
      });
    }
    const Auther = await Worker.findById(AutherId);
    if (!Auther) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author ID not found",
      });
    }
    if (Auther.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Only admin can delete a branch",
      });
    }

    const branchData = await Branch.findById(branchId);
    if (!branchData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Branch not found",
      });
    }
    await Branch.findByIdAndDelete(branchId);
    return res.status(200).json({
      success: true,
      error: false,
      message: "Branch deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteBranch controller:", error.message);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};
