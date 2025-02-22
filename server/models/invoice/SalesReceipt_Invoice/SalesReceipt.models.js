 
 import mongoose from "mongoose";
const SalesReceiptSchema = new mongoose.Schema(
  {
    BranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    salesReceiptCreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    CustomerName: {
      type: String,
      required: [true, "Customer name is required"],
      minlength: [2, "Customer name must be more than 2 characters"],
      maxlength: [50, "Customer name must be less than 50 characters"],
    },
    Description: {
      type: String,
      default: "",
    },
    CustomerphoneNumber: {
      type: String,
      default: "",
    },
    tax: {
      type: Number,
      default: 0,
    },
    mobileNumber: [
      {
        type: String,
        sparse: true, // Allow multiple null values
      },
    ],
    Customeremail: {
      type: String,
      trim: true,
      minlength: [5, "Email must be more than 5 characters"],
      maxlength: [50, "Email must be less than 50 characters"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      default: null, // Allow null values
    },
    CustomerAddress: {
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
    SRNumber: {
      type: String,
      required: [true, "SR number is required"],
      unique: true, // Only SRNumber is unique
    },
    date: {
      type: Date,
      default: () => Date.now(),
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Bank Transfer", "e-sewa"],
      default: "Cash",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        discount: {
          type: Number,
          default: 0,
        },
        totalPrice: {
          type: Number,
          default: 0,
        },
      },
    ],
    Note: {
      type: String,
      default: "",
    },
    MessageToCustomer: {
      type: String,
      default: "",
    },
    MessageToStatement: {
      type: String,
      default: "",
    },
    grandTotal: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const SalesReceipt = mongoose.model("SalesReceipt", SalesReceiptSchema);
export default SalesReceipt;

// import mongoose from "mongoose";

// const SalesReceiptSchema = new mongoose.Schema(
//   {
//     BranchId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Branch",
//       required: true,
//     },
//     salesReceiptCreatedBy: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Worker",
//       },
//     ],
//     CustomerName: {
//       type: String,
//       required: [true, "Customer name is required"],
//       minlength: [2, "Customer name must be more than 2 characters"],
//       maxlength: [50, "Customer name must be less than 50 characters"],
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
//     Customeremail: {
//       /////////////////
//       type: String,
//       unique: true,
//       trim: true,
//       minlength: [5, "Email must be more than 5 characters"],
//       maxlength: [50, "Email must be less than 50 characters"],
//       match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//     },
//     CustomerAddress: {
//       ////////////////
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
//     SRNumber: {
//       type: String,
//       required: [true, "SR number is required"],
//       unique: true,
//     },
//     date: {
//       type: Date,
//       default: () => Date.now(),
//     },
//     paymentMethod: {
//       type: String,
//       enum: ["Cash", "Bank Transfer", "e-sewa"],
//       default: "Cash",
//     },
//     ProductId: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//       },
//     ],
//     Note: {
//       type: String,
//       default: "",
//     },
//     quantity: {
//       type: Number,
//       default: 1,
//     },
//     discount: {
//       type: Number,
//       default: 0,
//     },
//     unitPrice: {
//       type: Number,
//       required: [true, "Unit price is required"],
//     },
//     totalAmount: {
//       type: Number,
//       default: 0,
//     },
//     MessageToCustomer: {
//       type: String,
//       default: "",
//     },
//     MessageToStatement: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const SalesReceipt = mongoose.model("SalesReceipt", SalesReceiptSchema);
// export default SalesReceipt;
