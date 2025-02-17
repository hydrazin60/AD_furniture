import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { uploadMultipleImages } from "../../middleware/multer.js";
import { createNewCustomer } from "../../controllers/Manager/Customer/Customer.controller.js";
const customerRouter = express.Router();

customerRouter.post(
  "/register/newCustomer/:branchId",
  isAuthenticated,
  uploadMultipleImages("companyImage", 6),
  createNewCustomer
);

export default customerRouter;
