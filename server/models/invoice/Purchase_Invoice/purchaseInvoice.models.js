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
    BranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
    },
    invoiceDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          required: [true, "Product id is required"],
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
