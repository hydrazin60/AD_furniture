import express from "express";
import {
  StaffLogin,
  StaffRegister,
} from "../../controllers/Auth/staffAuth.controller.js";
import { uploadSingleImage } from "../../middleware/multer.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";

const staffAuthRouter = express.Router();

staffAuthRouter.post(
  "/register",
  isAuthenticated,
  uploadSingleImage("profilePic"),
  StaffRegister
);

staffAuthRouter.post("/login", StaffLogin);
export default staffAuthRouter;
