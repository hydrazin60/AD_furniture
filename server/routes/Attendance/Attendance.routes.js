import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { createNewAttendance } from "../../controllers/Manager/Attendance/Attendance.controller.js";

const AttendanceRouter = express.Router();
AttendanceRouter.post(
  "/attendance/:workerId",
  isAuthenticated,
  createNewAttendance
);
export default AttendanceRouter;
