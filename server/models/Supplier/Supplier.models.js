import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    SupplierName: {
      type: String,
      minlength: [2, "Company name must be more than 2 characters"],
      maxlength: [50, "Company name must be less than 50 characters"],
      required: true,
    },
    BranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    companyName: {
      type: String,
      default: "",
    },
    supplierCreateBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
      },
    ],
    SupplierCategory: [
      {
        type: String,
        enum: ["RawMaterial", "FinalProduct"],
        default: "RawMaterial",
      },
    ],
    description: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
      match: [/^\d{7,15}$/, "Please enter a valid phone number"],
    },
    mobileNumbers: [
      {
        type: String,
        match: [/^\d{7,15}$/, "Please enter a valid mobile number"],
      },
    ],
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: [5, "Email must be more than 5 characters"],
      maxlength: [50, "Email must be less than 50 characters"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
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
      city: {
        type: String,
        default: "",
      },
      postCode: {
        type: String,
        default: "",
      },
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Bank Transfer", "e-sewa", "Cheque", "Credit Card"],
      default: "Cash",
    },
    note: {
      type: String,
      default: "",
    },
    totalPurchaseInvoice: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PurchaseInvoice",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;

// import mongoose from "mongoose";
// const SupplierSchema = new mongoose.Schema(
//   {
//     CompanyName: {
//       type: String,
//       min: [2, "Company name must be more than 2 characters"],
//       max: [50, "Company name must be less than 50 characters"],
//     },
//     Description: {
//       type: String,
//       default: "",
//     },
//     phoneNumber: {
//       type: String,
//       unique: true,
//     },
//     mobileNumber: [
//       {
//         type: String,
//         unique: true,
//       },
//     ],
//     email: {
//       type: String,
//       unique: true,
//       trim: true,
//       minlength: [5, "Email must be more than 5 characters"],
//       maxlength: [50, "Email must be less than 50 characters"],
//       match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//     },
//     address: {
//       country: {
//         type: String,
//         default: "Nepal",
//       },
//       province: {
//         type: String,
//         default: "",
//       },
//       district: {
//         type: String,
//         default: "",
//       },
//       municipality: {
//         type: String,
//         default: "",
//       },
//       city: {
//         type: String,
//         default: "",
//       },
//       postCode: {
//         type: String,
//         default: "",
//       },
//     },
//     Tax: {
//       type: String,
//       default: 0,
//     },
//     paymentMethod: {
//       type: String,
//       enum: ["Cash", "Bank Transfer", "e-sewa"],
//       default: "Cash",
//     },
//     Note: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
