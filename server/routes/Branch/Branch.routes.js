import express from "express";
import { createNewBranch } from "../../controllers/Branch/Branch.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { uploadMultipleImages } from "../../middleware/multer.js";
const BranchRouter = express.Router();

BranchRouter.post(
  "/register",
  isAuthenticated,
  uploadMultipleImages("branchImage", 6),
  createNewBranch
);

export default BranchRouter;
