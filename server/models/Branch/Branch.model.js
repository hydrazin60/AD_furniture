import mongoose from "mongoose";
const BranchSchema = new mongoose.Schema(
  {
    branchName: {
      type: String,
      required: [true, "Branch name is required"],
      unique: true,
    },
    branchPhoneNumber: {
      type: String,
      unique: true,
    },
    branchPassword: {
      type: String,
      required: [true, "Branch password is required"],
    },
    branchCreateBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
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
        street: {
          type: String,
          default: "",
        },
      },
    ],
    BranchStaff: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
      },
    ],
    numberOfWorkers: {
      type: Number,
      default: 0,
    },
    branchImage: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    finalProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    rawMaterials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RawMaterial",
      },
    ],
    vehicles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicles",
      },
    ],
    PurchaseInvoices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PurchaseInvoice",
      },
    ],
    SalesReceiptInvoices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SalesReceiptInvoice",
      },
    ],
    expenseInvoices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExpenseInvoice",
      },
    ],
    resetPasswordToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Branch = mongoose.model("Branch", BranchSchema);
export default Branch;
// import mongoose from "mongoose";
// const BranchSchema = new mongoose.Schema(
//   {
//     branchName: {
//       type: String,
//       required: [true, "Branch name is required"],
//       unique: true,
//     },
//     branchPassword: {
//       type: String,
//       required: [true, "Branch password is required"],
//     },
//     branchCreateBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Worker",
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
//         street: {
//           type: String,
//           default: "",
//         },
//       },
//     ],

//     BranchStaff: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Worker",
//       },
//     ],
//     numberOfWorkers: {
//       type: Number,
//       default: 0,
//     },
//     branchImage: [
//       {
//         public_id: {
//           type: String,
//           required: true,
//         },
//         url: {
//           type: String,
//           required: true,
//         },
//       },
//     ],

//     finalProducts: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//       },
//     ],
//     rawMaterials: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "RawMaterial",
//       },
//     ],
//     vehicles: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Vehicles",
//       },
//     ],
//     PurchaseInvoices: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "PurchaseInvoice",
//       },
//     ],
//     SalesReceiptInvoices: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "SalesReceiptInvoice",
//       },
//     ],
//     expenseInvoices: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "ExpenseInvoice",
//       },
//     ],
//     resetPasswordToken: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// const Branch = mongoose.model("Branch", BranchSchema);
// export default Branch;
