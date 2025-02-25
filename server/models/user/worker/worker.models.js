import mongoose from "mongoose";
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
      trim: true,
      minlength: [5, "Email must be more than 5 characters"],
      maxlength: [50, "Email must be less than 50 characters"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    address: [
      {
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
    ],
    TemparoryAddress: [
      {
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
    ],
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
        "Pending",
      ],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    totalBranch: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: function () {
          return this.role === "Admin";
        },
      },
    ],
    BranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    StaffRegistery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
    },
    workerAttendance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkerAttendance",
    },
    workerSalary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkerSalary",
    },
    workerTodoListProject: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkerProject",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
    },
    resetPasswordToken: {
      type: String,
    },

    Attendance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
        required: function () {
          return this.role !== "Admin";
        },
      },
    ],
    salaryDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salary",
      },
    ],
    vechalId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bechal",
        required: function () {
          return this.role === "DeliveryBoy";
        },
      },
    ],
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
//     // email: {
//     //   type: String,
//     //   unique: true,
//     //   min: [2, "Email must be more than 2 characters"],
//     //   max: [50, "Email must be less than 50 characters"],
//     // },
//     // phoneNumber: {
//     //   type: String,
//     //   unique: true,
//     // },
//     email: {
//       type: String,
//       unique: true,
//       trim: true,
//       minlength: [5, "Email must be more than 5 characters"],
//       maxlength: [50, "Email must be less than 50 characters"],
//       match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//     },
//     phoneNumber: {
//       type: String,
//       unique: true,
//       required: [true, "Phone number is required"],
//       match: [/^\d{10}$/, "Phone number must be 10 digits"],
//     },
//     address: [
//       {
//         country: {
//           type: String,
//           default: "Nepal",
//         },
//         province: {
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
//       min: [8, "Password must be at least 8 characters"],
//       max: [30, "Password must be less than 30 characters"],
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
//         "MonthlySalaryWorkers",
//         "DailyWageWorkers",
//         "ProjectBasedWorkers",
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
//     totalBranch: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Branch",
//       },
//     ],
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
//     workerTodoListProject: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "WorkerProject",
//       },
//     ],
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     verificationToken: {
//       type: String,
//     },
//     resetPasswordToken: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Worker = mongoose.model("Worker", WorkerSchema);
// export default Worker;
