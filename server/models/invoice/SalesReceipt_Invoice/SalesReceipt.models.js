import mongoose from "mongoose";

const SalesReceiptSchema = new mongoose.Schema(
  {
    BranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    salesReceiptCreatedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
      },
    ],
    CustomerName: {
      type: String,
      required: [true, "Customer name is required"],
      minlength: [2, "Customer name must be more than 2 characters"],
      maxlength: [50, "Customer name must be less than 50 characters"],
    },
    SRNumber: {
      type: String,
      required: [true, "SR number is required"],
      unique: true,
    },
    date: {
      type: Date,
      default: () => Date.now(),
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Bank Transfer", "e-sewa", "Cheque"],
      default: "Cash",
    },
    ProductId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    quantity: {
      type: Number,
      default: 1,
    },
    discount: {
      type: Number,
      default: 0,
    },
    unitPrice: {
      type: Number,
      required: [true, "Unit price is required"],
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    MessageToCustomer: {
      type: String,
      default: "",
    },
    MessageToStatement: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const SalesReceipt = mongoose.model("SalesReceipt", SalesReceiptSchema);
export default SalesReceipt;
