import express from "express";
import {
  AdminRegister,
  StaffLogin,
  StaffRegister,
} from "../../controllers/Auth/staffAuth.controller.js";
import { uploadSingleImage } from "../../middleware/multer.js";


const staffAuthRouter = express.Router();

staffAuthRouter.post(
  "/register",
  uploadSingleImage("profilePic"),
  StaffRegister
);
staffAuthRouter.post(
  "/admin/register",
  uploadSingleImage("profilePic"),
  AdminRegister
);
staffAuthRouter.post("/login", StaffLogin);
export default staffAuthRouter;
