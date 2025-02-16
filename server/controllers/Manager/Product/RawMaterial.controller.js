// import Branch from "../../../models/Branch/Branch.model.js";
// import RawMaterial from "../../../models/product/RawMaterial/rawMaterial.models.js";
// import Worker from "../../../models/user/worker/worker.models.js";
// import cloudinary from "../../../utils/cloudnary.js";
// import { getDataUri } from "../../../utils/dataUri.js";

// export const UploadRawMaterial = async (req, res) => {
//   try {
//     const AutherId = req.staffId;
//     const BranchId = req.params.branchId;
//     const productImages = req.files || [];
//     const {
//       productName,
//       productQuantity,
//       UnitPicsProductPrice,
//       productBrands,
//       productDescription,
//       productCategory,
//       productUnit,
//       discount = 0,
//       vat = 0,
//     } = req.body;
//     console.log(productImages);
//     console.log(req.body);
//     if (!productName || !!UnitPicsProductPrice) {
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
//         message: "You are not authorized to upload raw material",
//       });
//     }

//     // Fetch branch data and check authorization for Admin
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
//         message: "Unauthorized to upload product for this branch",
//       });
//     }

//     // Handle product image uploads
//     const imageUris = [];
//     if (Array.isArray(productImages) && productImages.length > 0) {
//       await Promise.all(
//         productImages.map(async (image) => {
//           try {
//             const fileUri = getDataUri(image);
//             const cloudResponse = await cloudinary.uploader.upload(
//               fileUri.content,
//               { folder: "productImage" }
//             );
//             imageUris.push({
//               public_id: cloudResponse.public_id,
//               url: cloudResponse.secure_url,
//             });
//           } catch (error) {
//             console.error("Error uploading product image:", error);
//           }
//         })
//       );
//     }

//     // Calculate total price
//     let totalPrice = UnitPicsProductPrice * numberOfProducts - discount;
//     totalPrice = totalPrice + (totalPrice * vat) / 100;

//     // Create new raw material entry
//     const newRawMaterial = new RawMaterial({
//       productName,

//       UnitPicsProductPrice,
//       productBrands,
//       productDescription,
//       productQuantity,
//       productCategory,
//       productUnit,
//       discount,
//       vat,
//       BranchId: BranchData._id,
//       rewMaterialUploadBy: AUtherData._id,
//       totalPrice: totalPrice,
//       productImage: imageUris,
//     });

//     await newRawMaterial.save();

//     // Populate and return the saved data
//     const populatedRawMaterial = await RawMaterial.findById(newRawMaterial._id)
//       .populate("BranchId", "branchName location")
//       .populate("rewMaterialUploadBy", "name role phoneNumber email");

//     return res.status(201).json({
//       success: true,
//       message: "Raw material uploaded successfully",
//       error: false,
//       data: populatedRawMaterial,
//     });
//   } catch (error) {
//     console.log(`Error in UploadRawMaterial controller: ${error}`);
//     return res.status(400).json({
//       success: false,
//       error: true,
//       message: `Error in UploadRawMaterial controller: ${error}`,
//     });
//   }
// };

// // import Branch from "../../../models/Branch/Branch.model.js";
// // import RawMaterial from "../../../models/product/RawMaterial/rawMaterial.models.js";
// // import Worker from "../../../models/user/worker/worker.models.js";
// // import cloudinary from "../../../utils/cloudnary.js";
// // import { getDataUri } from "../../../utils/dataUri.js";

// // export const UploadRawMaterial = async (req, res) => {
// //   try {
// //     const AutherId = req.staffId;
// //     const BranchId = req.params.branchId;
// //     const productImages = req.files || [];
// //     const {
// //       productName,
// //       numberOfProducts,
// //       UnitPicsProductPrice,
// //       productBrands,
// //       productDescription,
// //       productQuantity,
// //       productCategory,
// //       productUnit,
// //       discount = 0,
// //       vat = 0,
// //     } = req.body;

// //     if (!AutherId) {
// //       return res.status(400).json({
// //         success: false,
// //         error: true,
// //         message: "Author ID is required",
// //       });
// //     }
// //     if (!BranchId) {
// //       return res.status(400).json({
// //         success: false,
// //         error: true,
// //         message: "Branch ID is required",
// //       });
// //     }
// //     if (!productName || !UnitPicsProductPrice) {
// //       return res.status(400).json({
// //         success: false,
// //         error: true,
// //         message: "Product name and price are required",
// //       });
// //     }
// //     const AUtherData = await Worker.findById(AutherId);
// //     if (!AUtherData) {
// //       return res.status(404).json({
// //         success: false,
// //         error: true,
// //         message: "Author not found",
// //       });
// //     }

// //     if (AUtherData.role !== "Manager" && AUtherData.role !== "Admin") {
// //       return res.status(403).json({
// //         success: false,
// //         error: true,
// //         message: "You are not authorized to upload raw material",
// //       });
// //     }
// //     const BranchData = await Branch.findById(BranchId);
// //     if (!BranchData) {
// //       return res.status(404).json({
// //         success: false,
// //         error: true,
// //         message: "Branch not found",
// //       });
// //     }

// //     if (
// //       AUtherData.role === "Admin" &&
// //       AUtherData._id.toString() !== BranchData.BranchStaff.toString()
// //     ) {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Unauthorized to upload product for this branch",
// //       });
// //     }

// //     const imageUris = [];
// //     if (Array.isArray(productImages) && productImages.length > 0) {
// //       await Promise.all(
// //         productImages.map(async (image) => {
// //           try {
// //             const fileUri = getDataUri(image);
// //             const cloudResponse = await cloudinary.uploader.upload(
// //               fileUri.content,
// //               { folder: "productImage" }
// //             );
// //             imageUris.push({
// //               public_id: cloudResponse.public_id,
// //               url: cloudResponse.secure_url,
// //             });
// //           } catch (error) {
// //             console.error("Error uploading product image:", error);
// //           }
// //         })
// //       );
// //     }

// //     const totalPrice = UnitPicsProductPrice * numberOfProducts - discount;
// //     totalPrice = totalPrice + (totalPrice * vat) / 100;
// //     const newRawMaterial = new RawMaterial({
// //       productName,
// //       numberOfProducts,
// //       UnitPicsProductPrice,
// //       productBrands,
// //       productDescription,
// //       productQuantity,
// //       productCategory,
// //       productUnit,
// //       discount,
// //       vat,
// //       BranchId: BranchData._id,
// //       rewMaterialUploadBy: AUtherData._id,
// //       totalPrice: totalPrice,
// //       productImage: imageUris,
// //     });

// //     await newRawMaterial.save();
// //     const populatedRawMaterial = await RawMaterial.findById(newRawMaterial._id)
// //       .populate("BranchId", "branchName location ")
// //       .populate("rewMaterialUploadBy", " name role phoneNumber email");

// //     return res.status(201).json({
// //       success: true,
// //       message: "Raw material uploaded successfully",
// //       error: false,
// //       data: populatedRawMaterial,
// //     });
// //   } catch (error) {
// //     console.log(`error in UploadRawMaterial controller: ${error}`);
// //     return res.status(400).json({
// //       success: false,
// //       error: true,
// //       message: `Error in UploadRawMaterial controller: ${error}`,
// //     });
// //   }
// // };

import Branch from "../../../models/Branch/Branch.model.js";
import RawMaterial from "../../../models/product/RawMaterial/rawMaterial.models.js";
import Worker from "../../../models/user/worker/worker.models.js";
import cloudinary from "../../../utils/cloudnary.js";
import { getDataUri } from "../../../utils/dataUri.js";

export const UploadRawMaterial = async (req, res) => {
  try {
    const AutherId = req.staffId; // Assuming staffId is set by isAuthenticated middleware
    const BranchId = req.params.branchId;
    const productImages = req.files || [];

    const trimmedBody = {};
    for (const key in req.body) {
      trimmedBody[key.trim()] = req.body[key];
    }

    const {
      productName,
      productQuantity,
      UnitPicsProductPrice,
      productBrands,
      productDescription,
      productCategory,
      productUnit,
      discount = 0,
      vat = 0,
    } = trimmedBody;

    if (!AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Author ID is required",
      });
    }
    if (!BranchId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Branch ID is required",
      });
    }
    if (!productName || !UnitPicsProductPrice) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Product name and price are required",
      });
    }

    // Fetch author data and check authorization
    const AuthorData = await Worker.findById(AutherId);
    if (!AuthorData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }

    if (!["Manager", "Admin"].includes(AuthorData.role)) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to upload raw material",
      });
    }

    // Fetch branch data and check authorization for Admin
    const BranchData = await Branch.findById(BranchId);
    if (!BranchData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Branch not found",
      });
    }

    if (
      AuthorData.role === "Admin" &&
      AuthorData._id.toString() !== BranchData.BranchStaff.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Unauthorized to upload product for this branch",
      });
    }

    // Handle product image uploads
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

    // Calculate total price
    let totalPrice = UnitPicsProductPrice * productQuantity - discount;
    totalPrice = totalPrice + (totalPrice * vat) / 100;

    // Create new raw material entry
    const newRawMaterial = new RawMaterial({
      productName,
      UnitPicsProductPrice,
      productBrands,
      productDescription,
      productQuantity,
      productCategory,
      productUnit,
      discount,
      vat,
      totalPrice,
      BranchId: BranchData._id,
      rewMaterialUploadBy: AuthorData._id,
      productImage: imageUris,
    });

    await newRawMaterial.save();

    // Populate and return the saved data
    const populatedRawMaterial = await RawMaterial.findById(newRawMaterial._id)
      .populate("BranchId", "branchName location")
      .populate("rewMaterialUploadBy", "name role phoneNumber email");

    return res.status(201).json({
      success: true,
      message: "Raw material uploaded successfully",
      error: false,
      data: populatedRawMaterial,
    });
  } catch (error) {
    console.error(`Error in UploadRawMaterial controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};
