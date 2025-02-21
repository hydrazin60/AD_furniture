import Attendance from "../../../models/Attendance/Attendance.models.js";
import Worker from "../../../models/user/worker/worker.models.js";
import Branch from "../../../models/Branch/Branch.model.js";
import mongoose from "mongoose";
import cron from "node-cron";

export const markAbsentAttendance = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Find workers who do not have attendance for today
    const workersWithoutAttendance = await Worker.find({
      _id: {
        $nin: await Attendance.distinct("staffId", {
          date: { $gte: today, $lt: tomorrow },
        }),
      },
    });

    if (workersWithoutAttendance.length === 0) {
      console.log("✅ No missing attendance records for today.");
      return;
    }

    // Create bulk attendance records
    const absentRecords = workersWithoutAttendance.map((worker) => ({
      staffId: worker._id,
      BranchId: worker.BranchId,
      status: "Absent",
      notes: "Auto-marked as absent",
      hoursWorked: 0,
      date: today,
    }));

    await Attendance.insertMany(absentRecords);

    console.log(`✅ Marked ${absentRecords.length} workers as absent.`);
  } catch (err) {
    console.error("❌ Error in marking absent attendance:", err);
  }
};
 

cron.schedule("0 0 * * *", markAbsentAttendance);

export const createNewAttendance = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const Workerid = req.params.workerId;
    const { status, notes, hoursWorked } = req.body;
    const { BranchId } = req.query;

    if (
      !Workerid ||
      !status ||
      !["Present", "Absent", "Leave"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Worker ID and valid status (Present, Absent, Leave) are required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(Workerid) ||
      !mongoose.Types.ObjectId.isValid(AutherId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    // Find Author (Manager/Admin)
    const Auther = await Worker.findById(AutherId);
    if (!Auther || (Auther.role !== "Manager" && Auther.role !== "Admin")) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Find Worker
    const WorkerData = await Worker.findById(Workerid);
    if (!WorkerData || WorkerData.BranchId.toString() !== BranchId) {
      return res
        .status(404)
        .json({ success: false, message: "Worker not found in this branch" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Update attendance or insert new record
    const updatedAttendance = await Attendance.findOneAndUpdate(
      { staffId: Workerid, date: today },
      { staffId: Workerid, BranchId, status, notes, hoursWorked, date: today },
      { upsert: true, new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Attendance recorded",
      attendance: updatedAttendance,
    });
  } catch (err) {
    console.error("Error in createNewAttendance:", err);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

export const ViewAllAttendanceAtOneDayWIthOneBranch = async (req, res) => {
  try {
    const branchId = req.params.branchId;
    const AutherId = req.staffId;
    let { date } = req.query;

    // Validate branchId and AutherId
    if (
      !mongoose.Types.ObjectId.isValid(branchId) ||
      !mongoose.Types.ObjectId.isValid(AutherId)
    ) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid branchId or AutherId",
      });
    }

    // Validate Date Input
    if (!date) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Date is required",
      });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid date format. Use YYYY-MM-DD.",
      });
    }

    // Convert date to start and end of the day (00:00:00 to 23:59:59)
    const startOfDay = new Date(parsedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(parsedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch the Author (Manager/Admin)
    const Auther = await Worker.findById(AutherId);
    if (!Auther || (Auther.role !== "Manager" && Auther.role !== "Admin")) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Unauthorized",
      });
    }

    // Fetch the Branch
    const BranchData = await Branch.findById(branchId);
    if (!BranchData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Branch not found",
      });
    }

    // If the requester is a Manager, ensure they can only access their branch
    if (Auther.role === "Manager" && Auther.BranchId.toString() !== branchId) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to view attendance for this branch",
      });
    }

    // Fetch Attendance Data for the given branch and date range
    const AttendanceData = await Attendance.find({
      BranchId: branchId,
      date: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate("staffId", "fullName phoneNumber email")
      .populate("BranchId", "branchName address branchPhoneNumber")
      .sort({ date: 1 });

    // Handle No Data Found
    if (!AttendanceData.length) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No attendance data found for this date",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Attendance data fetched successfully",
      data: AttendanceData,
    });
  } catch (err) {
    console.error(`Error in ViewAllAttendanceAtOneDayWIthOneBranch: ${err}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: "An unexpected error occurred while fetching attendance",
    });
  }
};

export const ViewMonthlyAttendanceOfOneStaff = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const Staffid = req.params.Staffid;
    let { month, year } = req.query;

    if (
      !mongoose.Types.ObjectId.isValid(AutherId) ||
      !mongoose.Types.ObjectId.isValid(Staffid)
    ) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId or Staffid",
      });
    }

    month = parseInt(month);
    year = parseInt(year);
    if (
      !month ||
      !year ||
      month < 1 ||
      month > 12 ||
      year < 2000 ||
      year > new Date().getFullYear()
    ) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid month or year",
      });
    }

    // Find Requester (Manager/Admin/Staff)
    const Auther = await Worker.findById(AutherId);
    if (!Auther) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Unauthorized: Requester not found",
      });
    }

    // Find Staff Member
    const Staff = await Worker.findById(Staffid);
    if (!Staff) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Staff member not found",
      });
    }

    // Authorization Logic:
    if (
      Auther.role !== "Admin" &&
      Auther.role !== "Manager" &&
      Auther._id.toString() !== Staffid.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Unauthorized: You cannot view this staff's attendance",
      });
    }

    // Additional Check: If Manager, ensure the Staff is in the same branch
    if (
      Auther.role === "Manager" &&
      Auther.BranchId.toString() !== Staff.BranchId.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Unauthorized: Staff is not in your branch",
      });
    }

    // Define Start & End Dates for Query
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    // Find Attendance
    const AttendanceData = await Attendance.find({
      staffId: Staffid,
      date: { $gte: startDate, $lt: endDate },
    })
      .populate("staffId", "fullName phoneNumber email")
      .populate("BranchId", "branchName address branchPhoneNumber")
      .sort({ date: 1 });

    // If No Attendance Found
    if (!AttendanceData.length) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No attendance data found for this staff member",
      });
    }

    // Response with Data
    return res.status(200).json({
      success: true,
      error: false,
      message: "Attendance data fetched successfully",
      data: AttendanceData,
    });
  } catch (err) {
    console.error(`Error in ViewMonthlyAttendanceOfOneStaff: ${err}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: "An unexpected error occurred while fetching attendance",
    });
  }
};

// export const ViewMonthlyAttendanceOfOneStaff = async (req, res) => {
//   try {
//     const AutherId = req.staffId;
//     const Staffid = req.params.Staffid;
//     const { month, year } = req.query;

//     if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid AutherId",
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(Staffid) || !Staffid) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid Staffid",
//       });
//     }

//     const Auther = await Worker.findById(AutherId);
//     if (
//       !Auther ||
//       (Auther.role !== "Manager" &&
//         Auther.role !== "Admin" &&
//         Auther._id.toString() !== Staffid.toString())
//     ) {
//       return res
//         .status(403)
//         .json({ success: false, error: true, message: "Unauthorized" });
//     }

//     const AttendanceData = await Attendance.find({
//       staffId: Staffid,
//       date: {
//         $gte: new Date(year, month - 1, 1),
//         $lt: new Date(year, month, 1),
//       },
//     })
//       .populate("staffId", "fullName phoneNumber email")
//       .populate("BranchId", "branchName  address branchPhoneNumber")
//       .sort({ createdAt: -1 });

//     if (!AttendanceData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "No data found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: "Attendance data fetched successfully",
//       data: AttendanceData,
//     });
//   } catch (err) {
//     console.log(`error in View AllAttendance: ${err}`);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: `An unexpected error occurred while getting all attendance ${err}`,
//     });
//   }
// };

// export const markAbsentAttendance = async () => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     const allWorkers = await Worker.find();

//     for (const worker of allWorkers) {
//       // Check if attendance exists for today
//       const existingAttendance = await Attendance.findOne({
//         staffId: worker._id,
//         date: { $gte: today, $lt: tomorrow },
//       });

//       if (!existingAttendance) {
//         // Create an "Absent" attendance record
//         const newAttendance = new Attendance({
//           staffId: worker._id,
//           BranchId: worker.BranchId,
//           status: "Absent",
//           notes: "Auto-marked as absent",
//           hoursWorked: 0,
//           date: today,
//         });

//         await newAttendance.save();

//         // Update Worker's attendance records
//         worker.Attendance.push(newAttendance._id);
//         await worker.save();
//       }
//     }

//     console.log("✅ Absent attendance marked for missing workers.");
//   } catch (err) {
//     console.error("❌ Error in marking absent attendance:", err);
//   }
// };

// cron.schedule("0 0 * * *", markAbsentAttendance);

// export const createNewAttendance = async (req, res) => {
//   try {
//     const AutherId = req.staffId;
//     const Workerid = req.params.workerId;
//     const { status, notes, hoursWorked } = req.body;
//     const { BranchId } = req.query;

//     // Validate required fields
//     if (!Workerid || !status) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Worker ID and status are required",
//       });
//     }

//     // Validate ObjectId
//     if (
//       !mongoose.Types.ObjectId.isValid(Workerid) ||
//       !mongoose.Types.ObjectId.isValid(AutherId)
//     ) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid Worker ID or Author ID",
//       });
//     }

//     // Find Author (Manager/Admin)
//     const Auther = await Worker.findById(AutherId);
//     if (!Auther) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Author (Manager/Admin) not found",
//       });
//     }

//     // Check Author Role
//     if (Auther.role !== "Manager" && Auther.role !== "Admin") {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "You are not authorized to create attendance",
//       });
//     }

//     // Find Branch Data
//     const BranchData = await Branch.findById(BranchId);
//     if (!BranchData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Branch not found",
//       });
//     }

//     // Check Admin Authorization
//     if (
//       Auther.role === "Admin" &&
//       BranchData.BranchStaff?.toString() !== Auther._id.toString()
//     ) {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "You are not authorized to add attendance for this branch",
//       });
//     }

//     // Find Worker Data
//     const WorkerData = await Worker.findById(Workerid);
//     if (!WorkerData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Worker not found",
//       });
//     }

//     // Check if Worker belongs to the same branch as the Author
//     if (!WorkerData.BranchId || WorkerData.BranchId.toString() !== BranchId) {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "Worker does not belong to this branch",
//       });
//     }

//     // Check for existing attendance for today
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     const existingAttendance = await Attendance.findOne({
//       staffId: Workerid,
//       date: { $gte: today, $lt: tomorrow },
//     });

//     // If existing attendance is found, delete it
//     if (existingAttendance) {
//       WorkerData.Attendance = WorkerData.Attendance.filter(
//         (attId) => attId.toString() !== existingAttendance._id.toString()
//       );

//       await WorkerData.save();
//       await Attendance.findByIdAndDelete(existingAttendance._id);
//     }

//     // Create new attendance record
//     const newAttendance = new Attendance({
//       staffId: Workerid,
//       BranchId: BranchId,
//       status,
//       notes,
//       hoursWorked,
//       date: today,
//     });

//     await newAttendance.save();

//     // Update Worker's attendance records
//     WorkerData.Attendance.push(newAttendance._id);
//     await WorkerData.save();

//     // Populate attendance data for response
//     const populatedAttendance = await Attendance.findById(newAttendance._id)
//       .populate("staffId", "fullName phoneNumber email")
//       .populate("BranchId", "branchName branchPhoneNumber");

//     return res.status(201).json({
//       success: true,
//       message: "Attendance recorded successfully",
//       attendance: populatedAttendance,
//     });
//   } catch (err) {
//     console.error("Error in createNewAttendance:", err);

//     res.status(500).json({
//       success: false,
//       error: true,
//       message: "An unexpected error occurred while creating attendance",
//     });
//   }
// };

// export const GetAllOneDayAttendance = async (req, res) => {
//   try {
//     const AutherId = req.staffId;
//     const branchId = req.params.branchId;
//     if (!mongoose.Types.ObjectId.isValid(branchId) || !AutherId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid branchId or AutherId",
//       });
//     }
//   } catch (err) {
//     console.error("Error in GetAllOneDayAttendance:", err);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: `An unexpected error occurred while getting all one day attendance ${err}`,
//     });
//   }
// };
// // export const createNewAttendance = async (req, res) => {
// //   try {
// //     const AutherId = req.staffId;
// //     const Workerid = req.params.workerId;
// //     const { status, notes, hoursWorked } = req.body;
// //     const { BranchId } = req.query;

// //     // Validate required fields
// //     if (!Workerid || !status) {
// //       return res.status(400).json({
// //         success: false,
// //         error: true,
// //         message: "Worker ID and status are required",
// //       });
// //     }

// //     // Validate ObjectId
// //     if (
// //       !mongoose.Types.ObjectId.isValid(Workerid) ||
// //       !mongoose.Types.ObjectId.isValid(AutherId)
// //     ) {
// //       return res.status(400).json({
// //         success: false,
// //         error: true,
// //         message: "Invalid Worker ID or Author ID",
// //       });
// //     }

// //     // Find Author (Manager/Admin)
// //     const Auther = await Worker.findById(AutherId);
// //     if (!Auther) {
// //       return res.status(404).json({
// //         success: false,
// //         error: true,
// //         message: "Author (Manager/Admin) not found",
// //       });
// //     }

// //     // Check Author Role
// //     if (Auther.role !== "Manager" && Auther.role !== "Admin") {
// //       return res.status(403).json({
// //         success: false,
// //         error: true,
// //         message: "You are not authorized to create attendance",
// //       });
// //     }

// //     // Find Branch Data
// //     const BranchData = await Branch.findById(BranchId);
// //     if (!BranchData) {
// //       return res.status(404).json({
// //         success: false,
// //         error: true,
// //         message: "Branch not found",
// //       });
// //     }

// //     // Check Admin Authorization
// //     if (
// //       Auther.role === "Admin" &&
// //       BranchData.BranchStaff?.toString() !== Auther._id.toString()
// //     ) {
// //       return res.status(403).json({
// //         success: false,
// //         error: true,
// //         message: "You are not authorized to add attendance for this branch",
// //       });
// //     }

// //     // Find Worker Data
// //     const WorkerData = await Worker.findById(Workerid);
// //     if (!WorkerData) {
// //       return res.status(404).json({
// //         success: false,
// //         error: true,
// //         message: "Worker not found",
// //       });
// //     }

// //     // Check if Worker belongs to the same branch as the Author
// //     if (!WorkerData.BranchId || WorkerData.BranchId.toString() !== BranchId) {
// //       return res.status(403).json({
// //         success: false,
// //         error: true,
// //         message: "Worker does not belong to this branch",
// //       });
// //     }

// //     // Check for existing attendance for today
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0);
// //     const tomorrow = new Date(today);
// //     tomorrow.setDate(today.getDate() + 1);

// //     const existingAttendance = await Attendance.findOne({
// //       staffId: Workerid,
// //       date: { $gte: today, $lt: tomorrow },
// //     });

// //     // If existing attendance is found, delete it and remove it from Worker's attendance records
// //     if (existingAttendance) {
// //       WorkerData.Attendance = WorkerData.Attendance.filter(
// //         (attId) => attId.toString() !== existingAttendance._id.toString()
// //       );

// //       await WorkerData.save();
// //       await Attendance.findByIdAndDelete(existingAttendance._id);
// //     }

// //     // Create new attendance record
// //     const newAttendance = new Attendance({
// //       staffId: Workerid,
// //       BranchId: BranchId,
// //       status,
// //       notes,
// //       hoursWorked,
// //       date: today,
// //     });

// //     await newAttendance.save();

// //     // Update Worker's attendance records
// //     WorkerData.Attendance.push(newAttendance._id);
// //     await WorkerData.save();

// //     // Populate attendance data for response
// //     const populatedAttendance = await Attendance.findById(newAttendance._id)
// //       .populate("staffId", "fullName phoneNumber email")
// //       .populate("BranchId", "branchName branchPhoneNumber");

// //     return res.status(201).json({
// //       success: true,
// //       message: "Attendance recorded successfully",
// //       attendance: populatedAttendance,
// //     });
// //   } catch (err) {
// //     console.error("Error in createNewAttendance:", err);

// //     res.status(500).json({
// //       success: false,
// //       error: true,
// //       message: "An unexpected error occurred while creating attendance",
// //     });
// //   }
// // };
