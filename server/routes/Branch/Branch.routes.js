import express from "express";
import {
  createNewBranch,
  deleteBranch,
  getAllBranchBtAdmin,
  GetObeBranchDetailsByBothAdminANdManager,
  updateBranch,
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
BranchRouter.put(
  "/update/branch/:branchId",
  isAuthenticated,
  uploadMultipleImages("branchImage", 6),
  updateBranch
);

BranchRouter.delete("/delete/branch/:branchId", isAuthenticated, deleteBranch);
export default BranchRouter;
