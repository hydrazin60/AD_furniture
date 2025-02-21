import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import {
  createNewAttendance,
  ViewAllAttendanceAtOneDayWIthOneBranch,
  ViewMonthlyAttendanceOfOneStaff,
} from "../../controllers/Manager/Attendance/Attendance.controller.js";

const AttendanceRouter = express.Router();
AttendanceRouter.post(
  "/attendance/:workerId",
  isAuthenticated,
  createNewAttendance
);
AttendanceRouter.get(
  "/get/attendance_at_one_day/:branchId",
  isAuthenticated,
  ViewAllAttendanceAtOneDayWIthOneBranch
);

AttendanceRouter.get(
  "/get/monthly_attendance/:staffId",
  isAuthenticated,
  ViewMonthlyAttendanceOfOneStaff
);



export default AttendanceRouter;
