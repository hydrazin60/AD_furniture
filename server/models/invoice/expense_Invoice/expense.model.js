import mongoose from "mongoose";

const ExpenseInvoiceSchema = new mongoose.Schema(
  {
    BranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    expenseInvoiceCreatedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
      },
    ],
    Price: {
      type: Number,
      required: [true, "Price is required"],
    },
    PaymentMethod: {
      type: String,
      enum: ["Cash", "Bank Transfer", "e-sewa"],
      default: "Cash",
    },
    PaidName: {
      type: String,
      required: [true, "Paid name is required"],
    },
    typeOfExpense: {
      type: String,
      enum: ["Marketing", "Maintenance", "SCO", "Transport", "Other"],
      required: [true, "Type of expense is required"],
    },
    tax: {
      type: Number,
      default: 13,
    },
    description: {
      type: String,
      default: "",
    },
    RefNumber: {
      type: String,
      required: [true, "Ref number is required"],
    },
    messageOnStatement: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const ExpenseInvoice = mongoose.model("ExpenseInvoice", ExpenseInvoiceSchema);
export default ExpenseInvoice;

// import mongoose from "mongoose";
// const ExpenseInvoiceSchema = new mongoose.Schema(
//   {
//     Price: {
//       type: Number,
//       required: [true, "Price is required"],
//     },
//     PamnetMethod: {
//       type: String,
//       enum: ["Cash", "Bank Transfer", "e-sewa"],
//       default: "Cash",
//     },
//     PaidName: {
//       type: String,
//       required: [true, "Paid name is required"],
//     },
//     typeOfExpense: {
//       type: String,
//       enum: [" Marketing ", " Maintenance ", "SCO", "Transport", "Other"],
//       required: [true, "Type of expense is required"],
//     },
//     tax: {
//       type: Number,
//       default: 13,
//     },
//     descriptinon: {
//       type: String,
//       default: "",
//     },
//     RefNumber: {
//       type: String,
//       min: [21, "Ref number must be 21 characters"],
//       max: [21, "Ref number must be 21 characters"],
//     },
//     messageOnStatement: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const ExpenseInvoice = mongoose.model("ExpenseInvoice", ExpenseInvoiceSchema);
// export default ExpenseInvoice;
