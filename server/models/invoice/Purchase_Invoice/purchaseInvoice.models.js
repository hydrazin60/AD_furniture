import mongoose from "mongoose";
const PurchaseInvoiceSchema = new mongoose.Schema(
  {
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    purchaseInvoiceCreatedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
      },
    ],
    ownInvoiceNumber: {
      type:  String,
      required: [true, "Branch invoice number is required"],
      unique: true,
    },
    BranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
    },

    finalPrice: {
      type: Number,
      required: true,
    },
    invoiceDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    products: [
      {
        productName: {
          type: String,
          required: [true, "Product name is required"],
        },
        quantity: {
          type: Number,
          default: 1,
        },
        unitPrice: {
          type: Number,
          required: [true, "Unit price is required"],
        },
        totalAmount: {
          type: Number,
          required: [true, "Total amount is required"],
        },
        tax: {
          type: Number,
          default: 0,
        },
        discount: {
          type: Number,
          default: 0,
        },
      },
    ],
    Notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const PurchaseInvoice = mongoose.model(
  "PurchaseInvoice",
  PurchaseInvoiceSchema
);
export default PurchaseInvoice;

// import mongoose from "mongoose";
// const PurchaseInvoiceSchema = new mongoose.Schema(
//   {
//     supplierId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Supplier",
//       required: true,
//     },
//     BranchId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Branch",
//       required: true,
//     },
//     invoiceNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     invoiceDate: {
//       type: Date.now(),
//       required: true,
//     },
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       default: 1,
//     },
//     unitPrice: {
//       type: Number,
//       required: [true, "Unit price is required"],
//     },
//     totalAmount: {
//       type: Number,
//       required: [true, "Total amount is required"],
//     },
//     Notes: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const PurchaseInvoice = mongoose.model(
//   "PurchaseInvoice",
//   PurchaseInvoiceSchema
// );
// export default PurchaseInvoice;
