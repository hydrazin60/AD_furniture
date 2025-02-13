const WorkerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      min: [2, "Full name must be more than 2 characters"],
      max: [50, "Full name must be less than 50 characters"],
    },
    email: {
      type: String,
      unique: true,
      min: [2, "Email must be more than 2 characters"],
      max: [50, "Email must be less than 50 characters"],
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    address: {
      country: {
        type: String,
        default: "Nepal",
      },
      province: {
        type: String,
        default: "",
      },
      district: {
        type: String,
        default: "",
      },
      municipality: {
        type: String,
        default: "",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [8, "Password must be at least 8 characters"],
      max: [30, "Password must be less than 30 characters"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: [
        "Admin",
        "Manager",
        "MonthlySalaryWorkers",
        "DailyWageWorkers",
        "ProjectBasedWorkers",
        "DeliveryBoy",
        "commonUser",
      ],
      default: "commonUser",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    BranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    workerAttendance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkerAttendance",
    },
    workerSalary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkerSalary",
    },
    workerTodoListProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkerProject",
    },
    workerComplideProjectHistory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkerComplideProjectHistory",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Worker = mongoose.model("Worker", WorkerSchema);
export default Worker;

// import mongoose from "mongoose";
// const WorkerSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: [true, "Full name is required"],
//       min: [2, "Full name must be more than 2 characters"],
//       max: [50, "Full name must be less than 50 characters"],
//     },
//     email: {
//       type: String,
//       unique: true,
//       min: [2, "Email must be more than 2 characters"],
//       max: [50, "Email must be less than 50 characters"],
//     },
//     PhoneNumber: {
//       type: String,
//       unique: true,
//     },
//     address: [
//       {
//         country: {
//           type: String,
//           default: "Nepal",
//         },
//         provence: {
//           type: String,
//           default: "",
//         },
//         district: {
//           type: String,
//           default: "",
//         },
//         municipality: {
//           type: String,
//           default: "",
//         },
//       },
//     ],
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       min: [8, "Password must be more than 6 characters"],
//       max: [30, "Password must be less than 50 characters"],
//     },
//     profilePic: {
//       type: String,
//       default: "",
//     },
//     role: {
//       type: String,
//       enum: [
//         "Admin",
//         "Manager",
//         "MonthlySalaryWOrkers",
//         "DailyWageWorkers",
//         "ProjectByWorkers",
//         "DeliveryBoy",
//         "commonUser",
//       ],
//       default: "commonUser",
//     },
//     status: {
//       type: String,
//       enum: ["Active", "Inactive"],
//       default: "Active",
//     },
//     BranchId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Branch",
//     },
//     workerAttendance: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "WorkerAttendance",
//     },

//     workerSalary: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "WorkerSalary",
//     },

//     workerTodoListProject: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "WorkerProject",
//     },

//     workerComplideProjectHistory: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "WorkerComplideProjectHistory",
//     },

//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     verifactionToken: null,
//     resetPasswordToken: null,
//   },
//   {
//     timestamps: true,
//   }
// );

// const Worker = mongoose.model("Worker", WorkerSchema);
// export default Worker;
