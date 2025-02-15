// import cloudinary from "../../utils/cloudnary.js";
// import { getDataUri } from "../../utils/dataUri.js";
// import bcrypt from "bcrypt";
// import Branch from "../../models/Branch/Branch.model.js";
// import Worker from "../../models/user/worker/worker.models.js";

// export const createNewBranch = async (req, res) => {
//   try {
//     const { branchName, branchPassword, address } = req.body;
//     console.log(req.body);
//     console.log(req.files);

//     // ✅ Check if branch already exists
//     const existingBranch = await Branch.findOne({ branchName });
//     if (existingBranch) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Branch already exists",
//       });
//     }

//     // ✅ Get authenticated staff details from DB
//     const BranchImages = req.files?.branchImage || [];
//     const BranchImageURI = [];

//     if (Array.isArray(BranchImages) && BranchImages.length > 0) {
//       await Promise.all(
//         BranchImages.map(async (image) => {
//           try {
//             const fileUri = getDataUri(image);
//             const cloudResponse = await cloudinary.uploader.upload(
//               fileUri.content,
//               {
//                 folder: "BranchImages",
//               }
//             );
//             BranchImageURI.push({
//               public_id: cloudResponse.public_id,
//               url: cloudResponse.secure_url,
//             });
//           } catch (error) {
//             console.log(`Error uploading branch image: ${error}`);
//           }
//         })
//       );
//     }

//     console.log(BranchImageURI);

//     if (BranchImageURI.length === 0) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Branch image is required",
//       });
//     }
//     // ✅ Hash the password
//     const hashedPassword = await bcrypt.hash(branchPassword, 10);

//     // ✅ Create new branch
//     const newBranch = new Branch({
//       branchName,
//       branchPassword: hashedPassword,
//       address,
//       branchImage: BranchImageURI,
//       branchCreateBy: staffData._id,
//     });

//     const savedBranch = await newBranch.save();
//     const branchData = savedBranch.toObject();
//     delete branchData.branchPassword; // ✅ Remove password before sending response

//     return res.status(201).json({
//       success: true,
//       error: false,
//       message: "Branch created successfully",
//       data: branchData,
//     });
//   } catch (error) {
//     console.error(`Error in createNewBranch controller: ${error.message}`);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: `Server error: ${error.message}`,
//     });
//   }
// };

import cloudinary from "../../utils/cloudnary.js";
import { getDataUri } from "../../utils/dataUri.js";
import bcrypt from "bcrypt";
import Branch from "../../models/Branch/Branch.model.js";
import Worker from "../../models/user/worker/worker.models.js";

export const createNewBranch = async (req, res) => {
  try {
    const { branchName, branchPassword, address } = req.body;
    const existingBranch = await Branch.findOne({ branchName });

    if (existingBranch) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Branch already exists",
      });
    }

    const staffId = req.staffId;
    const staffData = await Worker.findById(staffId);

    if (!staffData || staffData.role !== "Admin") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Only admin can create a new branch",
      });
    }

    if (!branchName || !branchPassword) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Branch name and password are required",
      });
    }

    // Handling uploaded branch images
    const branchImages = req.files?.branchImage || []; // Using array to get all uploaded files
    const imageUris = [];

    if (Array.isArray(branchImages) && branchImages.length > 0) {
      // Upload each image to Cloudinary
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

    if (imageUris.length === 0) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Branch image is required",
      });
    }
    // Hashing the branch password
    const hashedPassword = await bcrypt.hash(branchPassword, 10);

    // Creating new branch record
    const newBranch = new Branch({
      branchName,
      branchPassword: hashedPassword,
      address,
      branchImage: imageUris, // Saving the uploaded image URIs
      branchCreateBy: staffData._id,
    });

    const savedBranch = await newBranch.save();
    const branchData = newBranch.toObject();
    delete branchData.branchPassword;

    return res.status(200).json({
      success: true,
      error: false,
      message: "Branch created successfully",
      data: branchData,
    });
  } catch (error) {
    console.error("Error in createNewBranch controller:", error);
    return res.status(400).json({
      success: false,
      error: true,
      message: `Error in createNewBranch controller: ${error}`,
    });
  }
};
