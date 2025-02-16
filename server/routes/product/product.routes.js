import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { UploadFinalProduct } from "../../controllers/Manager/Product/FinalProduct.controller.js";
import { uploadMultipleImages } from "../../middleware/multer.js";
import { UploadRawMaterial } from "../../controllers/Manager/Product/rawMaterial.controller.js";
const productRouter = express.Router();

productRouter.post(
  "/upload/finalproduct/:branchId",
  isAuthenticated,
  uploadMultipleImages("productImages", 5), // Change to "productImages"
  UploadFinalProduct
);

productRouter.post(
  "/upload/rawmaterial/:branchId",
  isAuthenticated,
  uploadMultipleImages("productImage", 5),  
  UploadRawMaterial
);
export default productRouter;
