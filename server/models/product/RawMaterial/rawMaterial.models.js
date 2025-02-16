import mongoose from "mongoose";

const RawMaterialSchema = new mongoose.Schema(
  {
    BranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    rewMaterialUploadBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    productName: {
      type: String,
      required: [true, "Product name is required"],
    },
    productImage: [
      {
        public_id: String,
        url: String,
      },
    ],
    UnitPicsProductPrice: {
      type: Number,
      required: [true, "Per unit product price is required"],
    },
    productBrands: {
      type: String,
    },
    productDescription: {
      type: String,
      default: "",
    },
    productQuantity: {
      type: Number,
      default: 1,
    },
    productCategory: {
      type: String,
      enum: ["ply", "color", "farming", "other"],
      required: true,
    },
    productUnit: {
      type: String,
      enum: ["m", "kg", "l", "pcs", "Pieces", "set"],
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    vat: {
      type: Number,
      default: 0,
    },
    totalPrice: {
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

// import mongoose from "mongoose";
// const RawMaterialSchema = new mongoose.Schema(
//   {
//     BranchId: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Branch",
//       },
//     ],
//     rewMaterialUploadBy: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Worker",
//       },
//     ],
//     productName: {
//       type: String,
//       required: [true, "Product name is required"],
//     },
//     productImage: [
//       {
//         public_id: String,
//         url: String,
//       },
//     ],
//     UnitPicsProductPrice: {
//       type: Number,
//       required: [true, "Perpics product price is required"],
//     },
//     productBrands: {
//       type: String,
//     },
//     productDescription: {
//       type: String,
//       default: "",
//     },
//     productQuantity: {
//       type: Number,
//       default: 1,
//     },
//     productCategory: {
//       type: String,
//       enum: ["ply", "color", "farming", "other"],
//     },
//     productUnit: {
//       type: String,
//       enum: ["m", "kg", "l", "pcs" , "Pieces", "set"],
//     },
//     discount: {
//       type: Number,
//       default: 0,
//     },
//     vat: {
//       type: Number,
//       default: 0,
//     },
//     totalPrice: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// const RawMaterial = mongoose.model("RawMaterial", RawMaterialSchema);
// export default RawMaterial;
