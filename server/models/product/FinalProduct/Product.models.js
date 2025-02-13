const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
    },
    productImage: {
      type: [String],
      default: [],
    },
    productDescription: {
      type: String,
      default: "",
    },
    productPrice: {
      type: Number,
      required: [true, "Product price is required"],
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    productCategory: {
      type: String,
      enum: [
        "Table",
        "Study Table",
        "Chair",
        "Sofa",
        "Bed",
        "Daraz",
        "Furniture",
        "Kitchen Rack",
        "Other",
      ],
      default: "Furniture",
    },
    productQuantity: {
      type: Number,
      default: 0,
    },
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;

// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema(
//   {
//     productName: {
//       type: String,
//       required: [true, "Product name is required"],
//     },
//     productImage: {
//       type: [String],
//       default: [],
//     },
//     productDescription: {
//       type: String,
//       default: "",
//     },
//     productPrice: {
//       type: Number,
//       required: [true, "Product price is required"],
//     },
//     branchId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Branch",
//     },
//     productCategory: {
//       type: String,
//       enum: [
//         "Table",
//         "study table",
//         "Chair",
//         "Sofa",
//         "Bad",
//         "Daraz",
//         "Furniture",
//         "kitchen rack",
//         "other",
//       ],
//       default: "Furniture",
//     },
//     productQuantity: {
//       type: Number,
//       default: 0,
//     },
//     productPrice: {
//       type: Number,
//       required: [true, "Product price is required"],
//     },
//     workerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Worker",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Product = mongoose.model("Product", ProductSchema);
// export default Product;
