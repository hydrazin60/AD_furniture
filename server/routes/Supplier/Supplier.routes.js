import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import {
  createNewSupplier,
  DeleteSupplier,
  getAllSuppliers,
  getOneSupplierData,
  UpdateSupplier,
} from "../../controllers/Manager/Supplier/Supplier.controller.js";

const SupplierRoutes = express.Router();

SupplierRoutes.post(
  "/customer/register/:branchId",
  isAuthenticated,

  createNewSupplier
);

SupplierRoutes.get("/get/supplier", isAuthenticated, getAllSuppliers);
SupplierRoutes.get(
  "/get/one_supplier/:supplierId",
  isAuthenticated,
  getOneSupplierData
);
SupplierRoutes.delete(
  "/delete/supplier/:supplierId",
  isAuthenticated,
  DeleteSupplier
);
SupplierRoutes.put(
  "/update/supplier/:supplierId",
  isAuthenticated,
  UpdateSupplier
);
export default SupplierRoutes;
