import mongoose from "mongoose";
import Branch from "../../../models/Branch/Branch.model.js";
import RawMaterial from "../../../models/product/RawMaterial/rawMaterial.models.js";
import Worker from "../../../models/user/worker/worker.models.js";
import cloudinary from "../../../utils/cloudnary.js";
import { getDataUri } from "../../../utils/dataUri.js";

export const UploadRawMaterial = async (req, res) => {
  try {
    const AutherId = req.staffId;
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

    if (AuthorData.role !== "Admin") {
      if (BranchData.managerId.toString() !== AuthorData._id.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message:
            "You are not authorized to upload raw material for this branch",
        });
      }
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

    BranchData.rawMaterials.push(newRawMaterial._id);
    await BranchData.save();

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
}; //ok

export const getAllRawMaterial = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const BranchId = req.params.branchId;
    if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(BranchId) || !BranchId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid BranchId",
      });
    }
    const BranchData = await Branch.findById(BranchId);
    if (!BranchData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Branch not found",
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
    const AllRawMaterial = await RawMaterial.find({ BranchId: BranchData._id })
      .populate("BranchId", "branchName location")
      .populate("rewMaterialUploadBy", "name role phoneNumber email");

    return res.status(200).json({
      success: true,
      message: "Raw material fetched successfully",
      error: false,
      data: AllRawMaterial,
    });
  } catch (error) {
    console.error(`Error in getAllRawMaterial controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};

export const getOneRawMaterial = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const RawMaterialId = req.params.rawMaterialId;

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

    const RawMaterialData = await RawMaterial.findById(RawMaterialId)
      .populate("BranchId", "branchName location")
      .populate("rewMaterialUploadBy", "name role phoneNumber email");

    if (!RawMaterialData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Raw material not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Raw material fetched successfully",
      error: false,
      data: RawMaterialData,
    });
  } catch (error) {
    console.log(`Error in getOneRawMaterial: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Internal server error : ${error.message}`,
    });
  }
};

export const deleteRawMaterial = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const RawMaterialId = req.params.rawMaterialId;
    if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(RawMaterialId) || !RawMaterialId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid RawMaterialId",
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
      return res.status(400).json({
        success: false,
        error: true,
        message: "You are not authorized to delete this raw material",
      });
    }

    if (AutherData.role !== "Admin") {
      const BranchId = AutherData.BranchId;
      const BranchData = await Branch.findById(BranchId);
      if (!BranchData) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Branch not found",
        });
      }
      if (AutherData._id.toString() !== BranchData.BranchStaff.toString()) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "You are not authorized to delete this raw material",
        });
      }
    }

    const RawMaterialData = await RawMaterial.findById(RawMaterialId);
    if (!RawMaterialData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Raw material not found",
      });
    }

    await RawMaterial.findByIdAndDelete(RawMaterialId);
    return res.status(200).json({
      success: true,
      message: "Raw material deleted successfully",
      error: false,
    });
  } catch (error) {
    console.error(`Error in deleteRawMaterial controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};

export const updateRawMaterial = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const rawMaterialId = req.params.rawMaterialId;
    const productImages = req.files || [];
    console.log(productImages);

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
    if (!rawMaterialId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: " Raw material ID is required",
      });
    }

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

    if (AuthorData.role === "Manager") {
      const BranchData = await Branch.findById(rawMaterialId);
      if (!BranchData) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Branch not found",
        });
      }
    }

    const RawMaterialData = await RawMaterial.findById(rawMaterialId);
    if (!RawMaterialData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Raw material not found",
      });
    }

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

    if (productName !== undefined) RawMaterialData.productName = productName;
    if (productQuantity !== undefined)
      RawMaterialData.productQuantity = productQuantity;
    if (UnitPicsProductPrice !== undefined)
      RawMaterialData.UnitPicsProductPrice = UnitPicsProductPrice;
    if (productBrands !== undefined)
      RawMaterialData.productBrands = productBrands;
    if (productDescription !== undefined)
      RawMaterialData.productDescription = productDescription;
    if (productCategory !== undefined)
      RawMaterialData.productCategory = productCategory;
    if (productUnit !== undefined) RawMaterialData.productUnit = productUnit;
    if (discount !== undefined) RawMaterialData.discount = discount;
    if (vat !== undefined) RawMaterialData.vat = vat;
    if (imageUris.length > 0) RawMaterialData.productImage = imageUris;
    if (totalPrice !== undefined) RawMaterialData.totalPrice = totalPrice;

    const updatedRawMaterial = await RawMaterial.findByIdAndUpdate(
      RawMaterialId,
      RawMaterialData,
      { new: true }
    )
      .populate("BranchId", "branchName location")
      .populate("rewMaterialUploadBy", "name role phoneNumber email");

    return res.status(200).json({
      success: true,
      message: "Raw material updated successfully",
      error: false,
      data: updatedRawMaterial,
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
