import mongoose from "mongoose";

const SalarySchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    baseSalary: {
      type: Number,
      required: true,
    },
    bonus: {
      type: Number,
      default: 0,
    },
    deductions: {
      type: Number,
      default: 0,
    },
    overTime: {
      type: Number,
      default: 0,
    },
    totalSalary: {
      type: Number,
      required: true,
    },
    // paymentStatus: {
    //   type: String,
    //   enum: ["Pending", "Paid"],
    //   default: "Pending",
    // },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Bank Transfer", "e-sewa"],
      default: "Cash",
    },
    paymentDate: {
      type: Date,
      default: null, // Only set when salary is paid
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker", // Manager or Admin who processed salary
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Salary = mongoose.model("Salary", SalarySchema);
export default Salary;
