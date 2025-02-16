import Branch from "../../../models/Branch/Branch.model.js";
import Product from "../../../models/product/FinalProduct/Product.models.js";
import Worker from "../../../models/user/worker/worker.models.js";
import cloudinary from "../../../utils/cloudnary.js";
import { getDataUri } from "../../../utils/dataUri.js";

export const UploadFinalProduct = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const BranchId = req.params.branchId;
    const {
      productName,
      productDescription,
      productPrice,
      productCategory,
      productQuantity,
    } = req.body;
    const productImages = req.files || [];

    // Validate required fields
    if (!productName || !productPrice) {
      return res.status(400).json({
        success: false,
        message: "Product name and price are required",
      });
    }
    if (!AutherId || !BranchId) {
      return res.status(400).json({
        success: false,
        message: "Author ID and Branch ID are required",
      });
    }

    // Fetch author details
    const AuthorData = await Worker.findById(AutherId);
    if (!AuthorData)
      return res
        .status(404)
        .json({ success: false, message: "Author not found" });

    // Authorization check
    if (!["Manager", "Admin"].includes(AuthorData.role)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to upload a final product",
      });
    }

    // Fetch branch details
    const BranchData = await Branch.findById(BranchId);
    if (!BranchData)
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });

    // Admin restriction (if applicable)
    if (
      AuthorData.role === "Admin" &&
      AuthorData._id.toString() !== BranchData.BranchStaff.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to upload product for this branch",
      });
    }

    // Limit image upload to 5
    if (productImages.length > 5) {
      return res.status(400).json({
        success: false,
        message: "You can only upload up to 5 images",
      });
    }

    // Upload images to Cloudinary
    const imageUris = [];
    if (Array.isArray(productImages) && productImages.length > 0) {
      await Promise.all(
        productImages.map(async (image) => {
          try {
            const fileUri = getDataUri(image);
            const cloudResponse = await cloudinary.uploader.upload(
              fileUri.content,
              { folder: "productImage" }
            );
            imageUris.push({
              public_id: cloudResponse.public_id,
              url: cloudResponse.secure_url,
            });
          } catch (error) {
            console.error("Error uploading product image:", error);
          }
        })
      );
    }

    // Create and save the product
    const newProduct = new Product({
      productName,
      productDescription,
      productPrice: Number(productPrice),
      branchId: BranchId,
      productCategory,
      productQuantity: Number(productQuantity),
      productImage: imageUris,
      ProductUploadedBy: AutherId,
    });

    const savedProduct = await newProduct.save();

    // Populate response data
    const PopulateProductData = await Product.findById(savedProduct._id)
      .populate("ProductUploadedBy", "name role") // Only fetch name and role
      .populate("branchId", "branchName location") // Optimize query performance
      .exec();

    return res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      data: PopulateProductData,
    });
  } catch (error) {
    console.error(`Error in UploadFinalProduct: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// export const UploadFinalProduct = async (req, res) => {
//   try {
//     const AutherId = req.staffId;
//     const BranchId = req.params.branchId;
//     const {
//       productName,
//       productDescription,
//       productPrice,
//       productCategory,
//       productQuantity,
//     } = req.body;
//     const productImage = req.files;

//     if (!productName || !productPrice) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Product name and price are required",
//       });
//     }
//     if (!AutherId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Author ID is required",
//       });
//     }
//     if (!BranchId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Branch ID is required",
//       });
//     }
//     const AUtherData = await Worker.findById(AutherId);
//     if (!AUtherData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Author not found",
//       });
//     }
//     if (AUtherData.role !== "Manager" && AUtherData.role !== "Admin") {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "You are not authorized to upload a final product",
//       });
//     }
//     const BranchData = await Branch.findById(BranchId);
//     if (!BranchData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Branch not found",
//       });
//     }
//     if (
//       AUtherData.role === "Admin" &&
//       AUtherData._id.toString() !== BranchData.BranchStaff.toString()
//     ) {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message:
//           "You are not authorized to upload a final product for this branch",
//       });
//     }

//     const imageUris = [];
//     if (Array.isArray(productImage) && productImage.length > 0) {
//       await Promise.all(
//         productImage.map(async (image) => {
//           try {
//             const fileUri = getDataUri(image);
//             const cloudResponse = await cloudinary.uploader.upload(
//               fileUri.content,
//               {
//                 folder: "productImage",
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
//     if (imageUris.length >= 5) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "You can only upload up to 5 images",
//       });
//     }
//     const newProduct = await Product.create({
//       productName,
//       productDescription,
//       productPrice,
//       branchId: BranchId,
//       productCategory,
//       productQuantity,
//       productImage: imageUris,
//       ProductUploadedBy: AutherId,
//     });

//     const savedProduct = await newProduct.save();
//     const PopulateProductData = await Product.findById(savedProduct._id)
//       .populate("ProductUploadedBy")
//       .populate("branchId")
//       .populate("ProductUploadedBy");

//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: "Product uploaded successfully",
//       data: PopulateProductData,
//     });
//   } catch (error) {
//     console.log(`error in UploadFinalProduct middleware: ${error}`);
//     return res.status(400).json({
//       success: false,
//       error: true,
//       message: `Error in UploadFinalProduct middleware: ${error}`,
//     });
//   }
// };
