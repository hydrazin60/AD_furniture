import Branch from "../../../models/Branch/Branch.model.js";
import Product from "../../../models/product/FinalProduct/Product.models.js";
import Worker from "../../../models/user/worker/worker.models.js";
import cloudinary from "../../../utils/cloudnary.js";
import { getDataUri } from "../../../utils/dataUri.js";
import mongoose from "mongoose";

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
        message: "Unauthorized to upload a final product ",
      });
    }

    // Fetch branch details
    const BranchData = await Branch.findById(BranchId);
    if (!BranchData)
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });

    if (AuthorData.role !== "Admin") {
      if (AuthorData.BranchId.toString() !== BranchData._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to upload a final product ",
        });
      }
    }
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
      .populate("ProductUploadedBy", "name role email phoneNumber") // Only fetch name and role
      .populate("branchId", "branchName location") // Optimize query performance
      .exec();

    BranchData.finalProducts.push(savedProduct._id);
    await BranchData.save();

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

export const getAllFinalProduct = async (req, res) => {
  try {
    const AUtherId = req.staffId;
    const AutherData = await Worker.findById(AUtherId);
    if (!AutherData) {
      console.log(`Error in getAllFinalProduct: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }
    if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
      return res.status(400).json({
        success: success,
        error: true,
        message: "You are not authorized to perform this action",
      });
    }
    if (AutherData.role !== "Admin") {
      const BranchId = AutherData.BranchId;
      const BranchData = await Branch.findById(BranchId);
      if (!BranchData) {
        console.log(`Error in getAllFinalProduct: ${error.message}`);
        return res.status(500).json({
          success: false,
          error: true,
          message: "Branch not found",
        });
      }
    }

    const products = await Product.find({})
      .populate("branchId", "branchName address branchPhoneNumber")
      .populate("ProductUploadedBy", "name role email phoneNumber")
      .exec();

    return res.status(200).json({
      success: true,
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.error(`Error in getAllFinalProduct: ${error.message}`);
    return res.status(500).json({});
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const ProductId = req.params.productId;
    const {
      productName,
      productDescription,
      productPrice,
      productCategory,
      productQuantity,
    } = req.body;
    const productImages = req.files || [];

    if (!ProductId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "ProductId and AutherId are required",
      });
    }
    if (!AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "ProductId and AutherId are required",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(ProductId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid ProductId",
      });
    }
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
      return res.status(400).json({
        success: false,
        error: true,
        message: "You are not authorized to perform this action",
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
    }
    const ProductData = await Product.findById(ProductId);
    if (!ProductData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product not found",
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
    if (productName !== undefined) ProductData.productName = productName;
    if (productDescription !== undefined)
      ProductData.productDescription = productDescription;
    if (productPrice !== undefined) ProductData.productPrice = productPrice;
    if (productCategory !== undefined)
      ProductData.productCategory = productCategory;
    if (productQuantity !== undefined)
      ProductData.productQuantity = productQuantity;
    if (imageUris.length > 0) ProductData.productImage = imageUris;
    await ProductData.save();
    const populateData = await Product.findById(ProductData._id)
      .populate("branchId", "branchName address branchPhoneNumber")
      .populate("ProductUploadedBy", "name role email phoneNumber");

    return res.status(200).json({
      success: true,
      data: populateData,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(`Error in UpdateProduct: ${error.message}`);
    return res.status(500).json({
      error: true,
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const ProductId = req.params.productId;
    const AutherId = req.staffId;
    if (!mongoose.Types.ObjectId.isValid(ProductId) || !ProductId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid ProductId",
      });
    }

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
    if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "You are not authorized to perform this action",
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
    }
    const ProductData = await Product.findById(ProductId);
    if (!ProductData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product not found",
      });
    }
    await ProductData.remove();
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: ProductData,
    });
  } catch (error) {
    console.error(`Error in deleteProduct: ${error.message}`);
    return res.status(500).json({
      error: true,
      success: false,
      message: "Internal server error",
    });
  }
};

export const getOneProductDetails = async (req, res) => {
  try {
    const AUtherId = req.staffId;
    const ProductId = req.params.productId;

    if (!mongoose.Types.ObjectId.isValid(ProductId) || !ProductId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid ProductId",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(AUtherId) || !AUtherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }

    const AutherData = await Worker.findById(AUtherId);
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
        message: "You are not authorized to perform this action",
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
    }

    const ProductData = await Product.findById(ProductId)
      .populate("branchId", "branchName address branchPhoneNumber")
      .populate("ProductUploadedBy", "name role email phoneNumber");
    if (!ProductData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product not found",
      });
    }

    if (!ProductData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: ProductData,
      message: "Product found successfully",
    });
  } catch (error) {
    console.error(`Error in getOneProductDetails: ${error.message}`);
    return res.status(500).json({
      success: false,
      true: false,
      message: "Internal server error",
    });
  }
};
