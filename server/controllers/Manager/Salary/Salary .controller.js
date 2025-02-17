import mongoose from "mongoose";
import Salary from "../../../models/Salary/Salary.models.js";
import Worker from "../../../models/user/worker/worker.models.js";
import Branch from "../../../models/Branch/Branch.model.js";

export const createNewSalary = async (req, res) => {
  try {
    const {
      staffId,
      baseSalary,
      bonus = 0,
      overTime = 0,
      deductions = 0,
      paymentMethod,
    } = req.body;
    const AutherId = req.staffId;
    const BranchId = req.params.branchId;

    if (!staffId || !AutherId || !BranchId || !baseSalary) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "staffId, AutherId, BranchId, and baseSalary are required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(staffId) ||
      !mongoose.Types.ObjectId.isValid(AutherId) ||
      !mongoose.Types.ObjectId.isValid(BranchId)
    ) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid staffId, AutherId, or BranchId",
      });
    }

    const StaffData = await Worker.findById(staffId);
    if (!StaffData) {
      return res
        .status(404)
        .json({ success: false, error: true, message: "Staff not found" });
    }

    if (!StaffData.BranchId || StaffData.BranchId.toString() !== BranchId) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Worker does not belong to this branch",
      });
    }

    const Auther = await Worker.findById(AutherId);
    if (!Auther) {
      return res
        .status(404)
        .json({ success: false, error: true, message: "Author ID not found" });
    }

    if (Auther.role !== "Manager" && Auther.role !== "Admin") {
      return res
        .status(403)
        .json({ success: false, error: true, message: "Unauthorized access" });
    }

    const BranchData = await Branch.findById(BranchId);
    if (!BranchData) {
      return res
        .status(404)
        .json({ success: false, error: true, message: "Branch not found" });
    }
    if (
      Auther.role === "Admin" &&
      BranchData.BranchStaff?.toString() !== Auther._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to add salary for this branch",
      });
    }

    const totalSalary = baseSalary + bonus + overTime - deductions;
    const newSalary = new Salary({
      staffId,
      branchId: BranchId,
      baseSalary,
      bonus,
      deductions,
      overTime,
      totalSalary,
      paymentMethod,
      createdBy: AutherId,
    });

    await newSalary.save();

    const populateData = await Salary.findById(newSalary._id)
      .populate("staffId", "fullName phoneNumber email address")
      .populate("branchId", "branchName address branchPhoneNumber");

    if (!populateData) {
      return res
        .status(404)
        .json({ success: false, error: true, message: "Salary not found" });
    }

    if (!StaffData.salaryDetails) StaffData.salaryDetails = [];
    StaffData.salaryDetails.push(newSalary._id);
    await StaffData.save();

    return res.status(201).json({
      success: true,
      message: "Salary created successfully",
      salary: populateData,
    });
  } catch (err) {
    console.error(`Error in createNewSalary middleware: ${err}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: "An error occurred while processing salary",
    });
  }
};
