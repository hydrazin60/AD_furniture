import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import {
  GetAllStaffData,
  GetOneStaffData,
  UpdateStaffData,
} from "../../controllers/Manager/Staff/Staff.controller.js";
import { uploadSingleImage } from "../../middleware/multer.js";

const StaffRouter = express.Router();

StaffRouter.get("/view/staff/:staffIds", isAuthenticated, GetOneStaffData);
StaffRouter.get("/view/all/staff", isAuthenticated, GetAllStaffData);
StaffRouter.put(
  "/update/staff",
  isAuthenticated,
  uploadSingleImage("profilePic"),
  UpdateStaffData
);
export default StaffRouter;
