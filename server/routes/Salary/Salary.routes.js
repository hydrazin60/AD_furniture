import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { createNewSalary } from "../../controllers/Manager/Salary/Salary .controller.js";

const SalaryRouter = express.Router();

SalaryRouter.post("/create/salary/:branchId", isAuthenticated, createNewSalary);

export default SalaryRouter;
