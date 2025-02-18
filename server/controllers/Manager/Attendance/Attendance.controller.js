import Attendance from "../../../models/Attendance/Attendance.models.js";
import Worker from "../../../models/user/worker/worker.models.js";
import Branch from "../../../models/Branch/Branch.model.js";

export const createNewAttendance = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const Workerid = req.params.workerId;
    const { status, notes, hoursWorked } = req.body;

    const Auther = await Worker.findById(AutherId);
    if (!Auther) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author (Manager/Admin) not found",
      });
    }

    if (Auther.role !== "Manager" && Auther.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to create attendance",
      });
    }

    const BranchId = Auther.BranchId;
    const BranchData = await Branch.findById(BranchId);
    if (!BranchData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Branch not found",
      });
    }

    if (
      Auther.role === "Admin" &&
      BranchData.BranchStaff?.toString() !== Auther._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to add attendance for this branch",
      });
    }

    if (!StaffData.BranchId || StaffData.BranchId.toString() !== BranchId) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Worker does not belong to this branch",
      });
    }

    const WorkerData = await Worker.findById(Workerid);
    if (!WorkerData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Worker not found",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const existingAttendance = await Attendance.findOne({
      staffId: Workerid,
      date: { $gte: today },
    });

    if (existingAttendance) {
      WorkerData.Attendance = WorkerData.Attendance.filter(
        (attId) => attId.toString() !== existingAttendance._id.toString()
      );

      await WorkerData.save();
      await Attendance.findByIdAndDelete(existingAttendance._id);
    }

    const newAttendance = new Attendance({
      staffId: Workerid,
      BranchId: BranchId,
      status,
      notes,
      hoursWorked,
      date: today,
    });

    await newAttendance.save();
    WorkerData.Attendance.push(newAttendance._id);
    await WorkerData.save();

    const populatedAttendance = await Attendance.findById(newAttendance._id)
      .populate("staffId", "fullName phoneNumber email ")
      .populate("BranchId", "branchName   branchPhoneNumber");

    return res.status(201).json({
      success: true,
      message: "Attendance recorded successfully",
      attendance: populatedAttendance,
    });
  } catch (err) {
    console.error("Error in createNewAttendance:", err);

    res.status(500).json({
      success: false,
      error: true,
      message: "An unexpected error occurred while creating attendance",
    });
  }
};

//                   comment code not delete
// import Attendance from "../../../models/Attendance/Attendance.models.js";
// import Worker from "../../../models/user/worker/worker.models.js";
// import Branch from "../../../models/Branch/Branch.model.js";

// export const createNewAttendance = async (req, res) => {
//   try {
//     const AutherId = req.staffId;
//     const Workerid = req.params.workerId;
//     const { status, notes, hoursWorked } = req.body;

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
//     const BranchId = Auther.BranchId;
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

//     // If existing attendance is found, delete it and remove it from Worker's attendance records
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
