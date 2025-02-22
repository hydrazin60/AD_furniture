import express from "express";
import { uploadSingleImage } from "../../../middleware/multer.js";
import {
  AdminRegister,
  VerifyAdmin,
} from "../../../controllers/Auth/Admin/Admin.Auth.controller.js";
const adminAuthRouter = express.Router();
adminAuthRouter.post(
  "/register",
  uploadSingleImage("profilePic"),
  AdminRegister
);

adminAuthRouter.get("/verify/:token", VerifyAdmin);

export default adminAuthRouter;
