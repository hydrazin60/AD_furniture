import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { UploadFinalProduct } from "../../controllers/Manager/Product/FinalProduct.controller.js";
import { uploadMultipleImages } from "../../middleware/multer.js";
const productRouter = express.Router();

productRouter.post(
  "/upload/finalproduct/:branchId",
  isAuthenticated,
  uploadMultipleImages("productImages", 5), // Change to "productImages"
  UploadFinalProduct
);

export default productRouter;
