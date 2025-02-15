import mongoose from "mongoose";
const RawMaterialSchema = new mongoose.Schema(
  {
    BranchId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
      },
    ],
    productName: {
      type: String,
      required: [true, "Product name is required"],
    },
    productImage: {
      type: [String],
      default: [],
    },
    numberOfProducts: {
      type: Number,
      required: [true, "Number of products is required"],
    },
    productPrice: {
      type: Number,
      required: [true, "Perpics product price is required"],
    },
    productBrands: {
      type: String,
      required: [true, "Product brands is required"],
    },
    productDescription: {
      type: String,
      default: "",
    },
    productQuantity: {
      type: Number,
      default: 0,
    },
    productCategory: {
      type: String,
      enum: ["ply", "color", "farmi", ""],
    },
    productUnit: {
      type: String,
      enum: ["m", "kg", "l", "pcs"],
    },
    totalProduct: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const RawMaterial = mongoose.model("RawMaterial", RawMaterialSchema);
export default RawMaterial;
