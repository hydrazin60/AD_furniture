// import Branch from "../../../models/Branch/Branch.model.js";
// import Branch from "../../../models/Branch/Branch.model.js";
// import Customer from "../../../models/user/Customer/customer.models.js";
// import cloudinary from "../../../utils/cloudnary.js";
// import { getDataUri } from "../../../utils/dataUri.js";
// export const createNewCustomer = async (req, res) => {
//   try {
//     const authorId = req.staffId;
//     const branchId = req.params.branchId;
//     const companyImage = req.files;
//     const {
//       companyName,
//       customerName,
//       companyWebsite,
//       companySocialMediaLink,
//       phoneNumber,
//       email,
//       customerCategory,
//       description,
//       address,
//       paymentType,
//       note,
//     } = req.body;
//     if (!customerName || !email) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Customer name and email are required",
//       });
//     }

//     if (!authorId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Author ID not found",
//       });
//     }

//     if (!branchId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Branch ID not found",
//       });
//     }

//     const AUther = await Worker.findById(authorId);
//     if (!AUther) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Author ID not found",
//       });
//     }
//     const Branch = await Branch.findById(branchId);
//     if (AUther.role !== "Admin") {
//       if (!Branch) {
//         return res.status(404).json({
//           success: false,
//           error: true,
//           message: "Branch ID not found",
//         });
//       }
//     }

//     if (AUther.role !== "Manager" && AUther.role !== "Admin") {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "You are not authorized to create a new customer",
//       });
//     }
//     if (
//       AUther.role === "Admin" &&
//       AUther._id.toString() !== Branch.BranchStaff.toString()
//     ) {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "You are not authorized to create a new customer",
//       });
//     }
//     const imageUris = [];
//     if (Array.isArray(companyImage) && companyImage.length > 0) {
//       await Promise.all(
//         companyImage.map(async (image) => {
//           try {
//             const fileUri = getDataUri(image);
//             const cloudResponse = await cloudinary.uploader.upload(
//               fileUri.content,
//               {
//                 folder: "companyImage",
//               }
//             );
//             imageUris.push({
//               public_id: cloudResponse.public_id,
//               url: cloudResponse.secure_url,
//             });
//           } catch (error) {
//             console.error("Error uploading branch image:", error);
//           }
//         })
//       );
//     }
//     const newCustomer = new Customer({
//       companyName,
//       customerName,
//       companyWebsite,
//       companySocialMediaLink,
//       phoneNumber,
//       email,
//       customerCategory,
//       description,
//       address,
//       paymentType,
//       note,
//       companyImage: imageUris,
//       customerCreateBy: authorId,
//       BranchId: branchId,
//     });

//     await newCustomer.save();
//     const populateData = await Customer.findById(newCustomer._id)
//       .populate("BranchId", "branchName address , branchPhoneNumber")
//       .populate("customerCreateBy", "fullName phoneNumber email address");

//     return res.status(201).json({
//       success: true,
//       error: false,
//       message: `${customerName} created successfully`,
//       data: populateData,
//     });
//   } catch (error) {
//     console.log(`error in createNewCustomer middleware: ${error}`);
//     return res.status(400).json({
//       success: false,
//       error: true,
//       message: `Error in createNewCustomer middleware: ${error}`,
//     });
//   }
// };

import Branch from "../../../models/Branch/Branch.model.js";
import Customer from "../../../models/user/Customer/customer.models.js";
import Worker from "../../../models/user/worker/worker.models.js";
import cloudinary from "../../../utils/cloudnary.js";
import { getDataUri } from "../../../utils/dataUri.js";

export const createNewCustomer = async (req, res) => {
  try {
    const authorId = req.staffId;
    const branchId = req.params.branchId;
    const companyImages = req.files;

    const {
      companyName,
      customerName,
      companyWebsite,
      companySocialMediaLink,
      phoneNumber,
      email,
      customerCategory,
      description,
      address,
      paymentType,
      note,
    } = req.body;

    // Validate required fields
    if (!customerName || !email) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Customer name and email are required",
      });
    }

    if (!authorId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Author ID is required",
      });
    }

    if (!branchId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Branch ID is required",
      });
    }

    // Check if the author exists
    const author = await Worker.findById(authorId);
    if (!author) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }

    // Check if the branch exists (only for Managers)
    const branchData = await Branch.findById(branchId);
    if (author.role === "Manager" && !branchData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Branch not found",
      });
    }

    // Authorization check
    if (author.role !== "Manager" && author.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to create a new customer",
      });
    }

    // Upload company images to Cloudinary
    const imageUris = [];
    if (Array.isArray(companyImages) && companyImages.length > 0) {
      await Promise.all(
        companyImages.map(async (image) => {
          try {
            const fileUri = getDataUri(image);
            const cloudResponse = await cloudinary.uploader.upload(
              fileUri.content,
              {
                folder: "companyImage",
              }
            );
            imageUris.push({
              public_id: cloudResponse.public_id,
              url: cloudResponse.secure_url,
            });
          } catch (error) {
            console.error("Error uploading company image:", error);
          }
        })
      );
    }

    // Create the new customer
    const newCustomer = new Customer({
      companyName,
      customerName,
      companyWebsite,
      companySocialMediaLink,
      phoneNumber,
      email,
      customerCategory,
      description,
      address,
      paymentType,
      note,
      companyImage: imageUris,
      customerCreateBy: authorId,
      BranchId: branchId,
    });

    await newCustomer.save();

    // Populate the response with branch and author details
    const populateData = await Customer.findById(newCustomer._id)
      .populate("BranchId", "branchName address branchPhoneNumber")
      .populate("customerCreateBy", "fullName phoneNumber email address");

    return res.status(201).json({
      success: true,
      error: false,
      message: `${customerName} created successfully`,
      data: populateData,
    });
  } catch (error) {
    console.error(`Error in createNewCustomer: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error in createNewCustomer: ${error.message}`,
    });
  }
};
