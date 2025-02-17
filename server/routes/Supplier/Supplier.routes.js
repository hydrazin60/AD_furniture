import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { createNewSupplier } from "../../controllers/Manager/Supplier/Supplier.controller.js";

const SupplierRoutes = express.Router();

SupplierRoutes.post(
  "/customer/register/:branchId",
  isAuthenticated,

  createNewSupplier
);

export default  SupplierRoutes;
