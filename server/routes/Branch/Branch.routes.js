import express from "express";
import {
  createNewBranch,
  getAllBranchBtAdmin,
  GetObeBranchDetailsByBothAdminANdManager,
} from "../../controllers/Branch/Branch.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { uploadMultipleImages } from "../../middleware/multer.js";
const BranchRouter = express.Router();

BranchRouter.post(
  "/register",
  isAuthenticated,
  uploadMultipleImages("branchImage", 6),
  createNewBranch
);
BranchRouter.get("/get/allBranch", isAuthenticated, getAllBranchBtAdmin);
BranchRouter.get(
  "/get/one/branch/:branchId",
  isAuthenticated,
  GetObeBranchDetailsByBothAdminANdManager
);

export default BranchRouter;
