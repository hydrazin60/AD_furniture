import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import {
  deleteProduct,
  getAllFinalProduct,
  getOneProductDetails,
  UpdateProduct,
  UploadFinalProduct,
} from "../../controllers/Manager/Product/FinalProduct.controller.js";
import { uploadMultipleImages } from "../../middleware/multer.js";
import {
  deleteRawMaterial,
  getAllRawMaterial,
  getOneRawMaterial,
  updateRawMaterial,
  UploadRawMaterial,
} from "../../controllers/Manager/Product/rawMaterial.controller.js";

const productRouter = express.Router();

productRouter.post(
  "/upload/finalproduct/:branchId",
  isAuthenticated,
  uploadMultipleImages("productImages", 5),
  UploadFinalProduct
);
productRouter.get("/get/finalproduct", isAuthenticated, getAllFinalProduct);

productRouter.put(
  "/update/finalproduct/:productId",
  uploadMultipleImages("productImages", 5),
  isAuthenticated,
  UpdateProduct
);

productRouter.get(
  "/get/one/finalproduct/:productId",
  isAuthenticated,
  getOneProductDetails
);

productRouter.delete(
  "/delete/finalproduct/:productId",
  isAuthenticated,
  deleteProduct
);
/////////////////////////////////////////////
productRouter.post(
  "/upload/rawmaterial/:branchId",
  isAuthenticated,
  uploadMultipleImages("productImage", 5),

  UploadRawMaterial
);
productRouter.get(
  "/get/all/rawmaterial/:branchId",
  isAuthenticated,
  getAllRawMaterial
);

productRouter.get(
  "/get/one/rawmaterial/:rawMaterialId",
  isAuthenticated,
  getOneRawMaterial
);

productRouter.delete(
  "/delete/rawMaterial/:rawMaterialId",
  isAuthenticated,
  deleteRawMaterial
);

productRouter.post(
  "/edit/rawmaterial/:rawMaterialId",
  isAuthenticated,
  uploadMultipleImages("productImage", 5),
  UploadRawMaterial
);
export default productRouter;
