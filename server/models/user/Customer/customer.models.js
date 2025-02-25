import mongoose from "mongoose";
const CustomerSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Full name is required"],
      min: [2, "Full name must be more than 2 characters"],
      max: [50, "Full name must be less than 50 characters"],
    },

    companyImage: [
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
    companyName: {
      type: String,
      default: "",
    },
    companyWebsite: {
      type: String,
      default: "",
    },
    companySocialMediaLink: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    customerCategory: {
      type: String,
      enum: ["Sales", "Service"],
      default: "Sales",
    },
    description: {
      type: String,
      default: "",
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
    paymentType: {
      type: String,
      enum: ["Cash", "Bank Transfer", "e-sewa"],
      default: "Cash",
    },
    note: {
      type: String,
      default: "",
    },
    status: {    //
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    profilePic: {
      type: String,
      default: "",
    },
    customerCreateBy :{ //
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
    },
    BranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    totalInvoice: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SalesReceipt",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;

// import mongoose from "mongoose";
// const CustomerSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: [true, "Full name is required"],
//       min: [2, "Full name must be more than 2 characters"],
//       max: [50, "Full name must be less than 50 characters"],
//     },
//     CompanyName: {
//       type: String,
//       default: "",
//     },
//     companYwebsite: {
//       type: String,
//       default: "",
//     },
//     companySocialMediaLink: {
//       type: String,
//       default: "",
//     },
//     PhoneNumber: {
//       type: String,
//       unique: true,
//     },
//     email: {
//       type: String,
//       unique: true,
//     },
//     CustomerCategory: {
//       type: String,
//       enum: ["Sales", "Service"],
//       default: "Sales",
//     },
//     description: {
//       type: String,
//       default: "",
//     },
//     Address: [
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
//         municipality: {
//           type: String,
//           default: "",
//         },
//         city: {
//           type: String,
//           default: "",
//         },
//         postCode: {
//           type: String,
//           default: "",
//         },
//       },
//     ],
//     PaymentType: {
//       type: String,
//       enum: ["Cash", "Bank Transfer", "e-sewa"],
//       default: "Cash",
//     },
//     node: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Customer = mongoose.model("Customer", CustomerSchema);
// export default Customer;
