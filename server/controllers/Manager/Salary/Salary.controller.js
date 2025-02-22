import mongoose, { Mongoose } from "mongoose";
import Salary from "../../../models/Salary/Salary.models.js";
import Worker from "../../../models/user/worker/worker.models.js";
import Branch from "../../../models/Branch/Branch.model.js";
import { sendSalaryMail } from "../../../utils/mail/Salary.mail.js";

// export const createNewSalary = async (req, res) => {
//   try {
//     const {
//       staffId,
//       baseSalary,
//       bonus = 0,
//       overTime = 0,
//       deductions = 0,
//       paymentMethod,
//     } = req.body;
//     const AutherId = req.staffId;
//     const BranchId = req.params.branchId;

//     if (!staffId || !AutherId || !BranchId || !baseSalary) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "staffId, AutherId, BranchId, and baseSalary are required",
//       });
//     }

//     if (
//       !mongoose.Types.ObjectId.isValid(staffId) ||
//       !mongoose.Types.ObjectId.isValid(AutherId) ||
//       !mongoose.Types.ObjectId.isValid(BranchId)
//     ) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid staffId, AutherId, or BranchId",
//       });
//     }

//     const StaffData = await Worker.findById(staffId);
//     if (!StaffData) {
//       return res
//         .status(404)
//         .json({ success: false, error: true, message: "Staff not found" });
//     }

//     if (!StaffData.BranchId || StaffData.BranchId.toString() !== BranchId) {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "Worker does not belong to this branch",
//       });
//     }

//     const Auther = await Worker.findById(AutherId);
//     if (!Auther) {
//       return res
//         .status(404)
//         .json({ success: false, error: true, message: "Author ID not found" });
//     }

//     if (Auther.role !== "Manager" && Auther.role !== "Admin") {
//       return res
//         .status(403)
//         .json({ success: false, error: true, message: "Unauthorized access" });
//     }

//     const BranchData = await Branch.findById(BranchId);
//     if (!BranchData) {
//       return res
//         .status(404)
//         .json({ success: false, error: true, message: "Branch not found" });
//     }

//     if (Auther.role !== "Admin") {
//       if (Auther.BranchId.toString() !== BranchData._id.toString()) {
//         return res.status(403).json({
//           success: false,
//           message: "Unauthorized to upload a final product ",
//         });
//       }
//     }

//     const totalSalary = baseSalary + bonus + overTime - deductions;
//     const newSalary = new Salary({
//       staffId,
//       branchId: BranchId,
//       baseSalary,
//       bonus,
//       deductions,
//       overTime,
//       totalSalary,
//       paymentMethod,
//       createdBy: AutherId,
//     });

//     await newSalary.save();

//     const populateData = await Salary.findById(newSalary._id)
//       .populate("staffId", "fullName phoneNumber email address")
//       .populate("branchId", "branchName address branchPhoneNumber");

//     if (!populateData) {
//       return res
//         .status(404)
//         .json({ success: false, error: true, message: "Salary not found" });
//     }

//     if (!StaffData.salaryDetails) StaffData.salaryDetails = [];
//     StaffData.salaryDetails.push(newSalary._id);
//     await StaffData.save();

//     sendSalaryMail(
//       StaffData.email,
//       StaffData.fullName,
//       BranchData.branchName,
//       baseSalary,
//       bonus,
//       overTime,
//       deductions,
//       totalSalary,
//       paymentMethod
//     );

//     return res.status(201).json({
//       success: true,
//       message: "Salary created successfully",
//       salary: populateData,
//     });
//   } catch (err) {
//     console.error(`Error in createNewSalary middleware: ${err}`);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: "An error occurred while processing salary",
//     });
//   }
// };

export const createNewSalary = async (req, res) => {
  try {
    const {
      staffId,
      baseSalary,
      bonus = 0,
      overTime = 0,
      deductions = 0,
      paymentMethod,
      notes,
      salaryDateFrom,
      salaryDateTo,
    } = req.body;

    const AutherId = req.staffId;
    const BranchId = req.params.branchId;

    if (
      !staffId ||
      !AutherId ||
      !BranchId ||
      !baseSalary ||
      !salaryDateFrom ||
      !salaryDateTo
    ) {
      return res.status(400).json({
        success: false,
        error: true,
        message:
          "staffId, AutherId, BranchId, baseSalary, salaryDateFrom, and salaryDateTo are required",
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

    if (Auther.role !== "Admin") {
      if (Auther.BranchId.toString() !== BranchData._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to upload a final product ",
        });
      }
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
      notes,
      paymentMethod,
      salaryDateFrom,
      salaryDateTo,
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

    sendSalaryMail(
      StaffData,
      BranchData,
      baseSalary,
      bonus,
      overTime,
      deductions,
      totalSalary,
      paymentMethod,
      salaryDateFrom,
      salaryDateTo
    );

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

export const getAllSalaryAtMonthly = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const BranchId = req.params.branchId;
    const { month, year } = req.query; // Extract month and year from query parameters

    // Validate AutherId
    if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }

    // Check if the user exists
    const Auther = await Worker.findById(AutherId);
    if (!Auther) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Auther not found",
      });
    }

    // Check if the user is authorized (Manager or Admin)
    if (Auther.role !== "Manager" && Auther.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Unauthorized access",
      });
    }

    // Validate BranchId
    if (!mongoose.Types.ObjectId.isValid(BranchId) || !BranchId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid branchId",
      });
    }

    // Check if the branch exists
    const BranchData = await Branch.findById(BranchId);
    if (!BranchData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Branch not found",
      });
    }

    // Check if the user is authorized to access this branch
    if (Auther.role !== "Admin") {
      if (BranchData.BranchStaff?.toString() !== Auther._id.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to get salary for this branch",
        });
      }
    }

    // Validate month and year
    if (!month || !year) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Month and year are required",
      });
    }

    // Create a date range for the specified month and year
    const startDate = new Date(year, month - 1, 1); // Month is 0-indexed in JavaScript
    const endDate = new Date(year, month, 0, 23, 59, 59); // Last day of the month

    // Fetch salary data for the specified month and year
    const SalaryData = await Salary.find({
      branchId: BranchId,
      createdAt: { $gte: startDate, $lte: endDate }, // Filter by date range
    })
      .populate("staffId", "fullName phoneNumber email address")
      .populate("branchId", "branchName address branchPhoneNumber")
      .sort({ createdAt: -1 });

    if (!SalaryData || SalaryData.length === 0) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No salary data found for the specified month and year",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Salary fetched successfully",
      salary: SalaryData,
    });
  } catch (err) {
    console.error(`Error in getAllSalary middleware: ${err}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: "An error occurred while processing salary",
    });
  }
};

export const deleteSalary = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const SalaryId = req.params.salaryId;

    // Validate AutherId
    if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }

    // Validate SalaryId
    if (!mongoose.Types.ObjectId.isValid(SalaryId) || !SalaryId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid SalaryId",
      });
    }

    // Check if the user exists
    const Auther = await Worker.findById(AutherId);
    if (!Auther) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Auther not found",
      });
    }

    // Check if the user is authorized (Manager or Admin)
    if (Auther.role !== "Manager" && Auther.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Unauthorized access",
      });
    }

    // Find the salary record
    const salaryRecord = await Salary.findById(SalaryId);
    if (!salaryRecord) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Salary not found",
      });
    }

    // If the user is a Manager, check if they are authorized to delete this salary
    if (Auther.role !== "Admin") {
      const BranchId = salaryRecord.branchId;

      // Find the branch associated with the salary
      const BranchData = await Branch.findById(BranchId);
      if (!BranchData) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Branch not found",
        });
      }

      // Check if the Manager is assigned to this branch
      if (BranchData.BranchStaff?.toString() !== Auther._id.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to delete salary for this branch",
        });
      }
    }

    // Delete the salary record
    await Salary.deleteOne({ _id: SalaryId });

    return res.status(200).json({
      success: true,
      error: false,
      message: "Salary deleted successfully",
      salary: salaryRecord,
    });
  } catch (err) {
    console.error(`Error in deleteSalary middleware: ${err}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: "An error occurred while processing salary",
    });
  }
};

export const OneSalaryDetails = async (req, res) => {
  try {
    const salaryId = req.params.salaryId;
    const AutherId = req.staffId;

    if (!mongoose.Types.ObjectId.isValid(salaryId) || !salaryId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid salary ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
    const AutherData = await Worker.findById(AutherId);
    if (!AutherData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }
    const SalaryData = await Salary.findById(salaryId)
      .populate(
        "staffId",
        "fullName  email phoneNumber address profilePic  role "
      )
      .populate(
        "branchId",
        "branchName branchPhoneNumber address  branchImage "
      )
      .populate(
        "createdBy",
        "fullName  email phoneNumber address profilePic  role "
      );
    if (!SalaryData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Salary not found",
      });
    }
    if (
      AutherData.role !== "Admin" &&
      AutherData.role !== "Manager" &&
      AutherData._id.toString() !== SalaryData.staffId.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to view this salary",
      });
    }
    if (
      AutherData.role !== "Admin" &&
      AutherData._id.toString() !== SalaryData.staffId.toString()
    ) {
      const Branchid = AutherData.BranchId;
      const BranchData = await Branch.findById(Branchid);
      if (!BranchData) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Branch not found",
        });
      }
      if (
        BranchData.BranchStaff?.toString() !== SalaryData.branchId.toString()
      ) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to view this salary",
        });
      }
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Salary found successfully",
      salary: SalaryData,
    });
  } catch (error) {
    console.log(`Error in OneSalary: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: "An error occurred while processing salary",
    });
  }
};

// export const UpdateSalary = async (req, res) => {
//   try {
//     const AUtherId = req.staffId;
//     const SalaryId = req.params.salaryId;
//     const { staffId, baseSalary, bonus, overTime, deductions, paymentMethod } =
//       req.body;
//     if (!mongoose.Types.ObjectId.isValid(AUtherId) || !AUtherId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid AutherId",
//       });
//     }
//     if (!Mongoose.Types.ObjectId.isValid(SalaryId) || !SalaryId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid SalaryId",
//       });
//     }
//     const AutherData = await Worker.findById(AUtherId);
//     if (!AutherData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Author not found",
//       });
//     }
//     if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "You are not authorized to update this salary",
//       });
//     }

//     const SalaryData = await Salary.findById(SalaryId);
//     if (!SalaryData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Salary not found",
//       });
//     }
//     if (AutherData.role !== "Admin") {
//       const Branchid = AutherData.BranchId;
//       const BranchData = await Branch.findById(Branchid);
//       if (!BranchData) {
//         return res.status(404).json({
//           success: false,
//           error: true,
//           message: "Branch not found",
//         });
//       }
//       if (
//         BranchData.BranchStaff?.toString() !== SalaryData.branchId.toString()
//       ) {
//         return res.status(403).json({
//           success: false,
//           error: true,
//           message: "You are not authorized to update this salary",
//         });
//       }
//     }

//     const totalSalary = baseSalary + bonus + overTime - deductions;

//     if (staffId !== undefined) {
//       if (!Mongoose.Types.ObjectId.isValid(staffId) || !staffId) {
//         return res.status(400).json({
//           success: false,
//           error: true,
//           message: "Invalid staffId",
//         });
//       }
//       SalaryData.staffId = staffId;
//     }
//     if (baseSalary !== undefined) {
//       SalaryData.baseSalary = baseSalary;
//     }
//     if (bonus !== undefined) {
//       SalaryData.bonus = bonus;
//     }
//     if (overTime !== undefined) {
//       SalaryData.overTime = overTime;
//     }
//     if (deductions !== undefined) {
//       SalaryData.deductions = deductions;
//     }
//     if (paymentMethod !== undefined) {
//       SalaryData.paymentMethod = paymentMethod;
//     }
//     if (totalSalary !== undefined) {
//       SalaryData.totalSalary = totalSalary;
//     }

//     await SalaryData.save();
//     const PopulateData = await Salary.findById(SalaryData._id)
//       .populate(
//         "staffId",
//         "fullName  email phoneNumber address profilePic  role "
//       )
//       .populate(
//         "branchId",
//         "branchName branchPhoneNumber address  branchImage "
//       )
//       .populate("createdBy", "fullName  email  ");

//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: "Salary updated successfully",
//       salary: PopulateData,
//     });
//   } catch (error) {
//     console.log(`Error in updateSalary: ${error.message}`);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: `Internal Server Error: ${error.message}`,
//     });
//   }
// };

export const UpdateSalary = async (req, res) => {
  try {
    const AutherId = req.staffId; // Fixed typo: AUtherId -> AutherId
    const SalaryId = req.params.salaryId;
    const { staffId, baseSalary, bonus, overTime, deductions, paymentMethod } =
      req.body;

    // Validate AutherId
    if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }

    // Validate SalaryId
    if (!mongoose.Types.ObjectId.isValid(SalaryId) || !SalaryId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid SalaryId",
      });
    }

    // Check if the user exists
    const AutherData = await Worker.findById(AutherId);
    if (!AutherData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }

    // Check if the user is authorized (Admin or Manager)
    if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to update this salary",
      });
    }

    // Find the salary record
    const SalaryData = await Salary.findById(SalaryId);
    if (!SalaryData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Salary not found",
      });
    }

    // If the user is a Manager, check if they are authorized to update this salary
    if (AutherData.role !== "Admin") {
      const BranchId = AutherData.BranchId; // Get the branch ID of the Manager

      // Find the branch associated with the Manager
      const BranchData = await Branch.findById(BranchId);
      if (!BranchData) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Branch not found",
        });
      }

      // Check if the salary belongs to the Manager's branch
      if (BranchData._id.toString() !== SalaryData.branchId.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to update this salary",
        });
      }
    }

    // Validate and update fields
    if (staffId !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(staffId)) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Invalid staffId",
        });
      }
      SalaryData.staffId = staffId;
    }

    if (baseSalary !== undefined) {
      SalaryData.baseSalary = baseSalary;
    }

    if (bonus !== undefined) {
      SalaryData.bonus = bonus;
    }

    if (overTime !== undefined) {
      SalaryData.overTime = overTime;
    }

    if (deductions !== undefined) {
      SalaryData.deductions = deductions;
    }

    if (paymentMethod !== undefined) {
      SalaryData.paymentMethod = paymentMethod;
    }

    // Calculate total salary
    const totalSalary =
      (baseSalary || SalaryData.baseSalary) +
      (bonus || SalaryData.bonus) +
      (overTime || SalaryData.overTime) -
      (deductions || SalaryData.deductions);

    SalaryData.totalSalary = totalSalary;

    // Save the updated salary record
    await SalaryData.save();

    // Populate the updated salary record
    const PopulateData = await Salary.findById(SalaryData._id)
      .populate("staffId", "fullName email phoneNumber address profilePic role")
      .populate("branchId", "branchName branchPhoneNumber address branchImage")
      .populate("createdBy", "fullName email");

    return res.status(200).json({
      success: true,
      error: false,
      message: "Salary updated successfully",
      salary: PopulateData,
    });
  } catch (error) {
    console.error(`Error in updateSalary: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};
