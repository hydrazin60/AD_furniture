import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import {
  createNewSalary,
  deleteSalary,
  getAllSalaryAtMonthly,
  OneSalaryDetails,
  UpdateSalary,
} from "../../controllers/Manager/Salary/Salary.controller.js";

const SalaryRouter = express.Router();

SalaryRouter.post("/create/salary/:branchId", isAuthenticated, createNewSalary);
SalaryRouter.get(
  "/get/all_salary/:branchId",
  isAuthenticated,
  getAllSalaryAtMonthly
);

SalaryRouter.delete("/delete/salary/:salaryId", isAuthenticated, deleteSalary);
SalaryRouter.get(
  "/view/one_salary/:salaryId",
  isAuthenticated,
  OneSalaryDetails
);
SalaryRouter.put("/update/salaryDetails/:salaryId", isAuthenticated, UpdateSalary);

export default SalaryRouter;
