import cloudinary from "../../utils/cloudnary.js";
import { getDataUri } from "../../utils/dataUri.js";
import bcrypt from "bcrypt";
import Branch from "../../models/Branch/Branch.model.js";
import Worker from "../../models/user/worker/worker.models.js";

export const createNewBranch = async (req, res) => {
  try {
    const { branchName, branchPassword, address } = req.body;
    const branchImages = req.files;

    // Validate required fields
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


