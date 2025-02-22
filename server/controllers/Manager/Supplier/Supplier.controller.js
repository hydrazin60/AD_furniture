import mongoose from "mongoose";
import Branch from "../../../models/Branch/Branch.model.js";
import Supplier from "../../../models/Supplier/Supplier.models.js";
import Worker from "../../../models/user/worker/worker.models.js";
export const createNewSupplier = async (req, res) => {
  try {
    const authorId = req.staffId;
    const branchId = req.params.branchId;
    const {
      SupplierName,
      description,
      phoneNumber,
      mobileNumbers,
      companyName,
      email,
      address,
      paymentMethod,
      note,
      SupplierCategory,
    } = req.body;
    // Validate required fields
    if (!SupplierName || !phoneNumber || !email) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Supplier name, phone number, and email are required",
      });
    }
    // Check if the author exists
    const author = await Worker.findById(authorId);
    if (!author) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }
    // Check if the branch exists (only for Managers)
    const branch = await Branch.findById(branchId);
    if (author.role === "Manager") {
      if (!branch) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Branch ID not found",
        });
      }
    }
    // Authorization check
    if (author.role !== "Manager" && author.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to create a new supplier",
      });
    }

    const newSupplier = new Supplier({
      SupplierName,
      companyName,
      description,
      phoneNumber,
      mobileNumbers,
      email,
      address,
      paymentMethod,
      note,
      SupplierCategory,
      supplierCreateBy: authorId,
      BranchId: branchId,
    });
    await newSupplier.save();
    // Populate the response with branch and author details
    const populateData = await Supplier.findById(newSupplier._id)
      .populate("BranchId", "branchName address branchPhoneNumber")
      .populate("supplierCreateBy", "fullName phoneNumber email address");

   branch.SupplierId.push(newSupplier._id);
    await branch.save();

    return res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      supplier: populateData,
    });
  } catch (err) {
    console.error(`Error in createNewSupplier: ${err}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error in createNewSupplier: ${err.message}`,
    });
  }
}; // ok

export const getAllSuppliers = async (req, res) => {
  try {
    const AutherId = req.staffId;

    if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
    const AutherData = await Worker.findById(AutherId);
    if (!AutherData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }
    if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to get all suppliers",
      });
    }

    const AllSuppliers = await Supplier.find()
      .populate("BranchId", "branchName address branchPhoneNumber")
      .populate("supplierCreateBy", "fullName ");

    return res.status(200).json({
      success: true,
      error: false,
      message: "Suppliers fetched successfully",
      Suppliers: AllSuppliers,
    });
  } catch (error) {
    console.log(`error show in get all supplier: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `error show in get all supplier ${error.message}`,
    });
  }
};

export const getOneSupplierData = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const supplierId = req.params.supplierId;
    if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(supplierId) || !supplierId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid supplierId",
      });
    }

    const AutherData = await Worker.findById(AutherId);
    if (!AutherData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }
    if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to get one supplier",
      });
    }
    const OneSupplier = await Supplier.findById(supplierId)
      .populate("BranchId", "branchName address branchPhoneNumber")
      .populate("supplierCreateBy", "fullName ")
      .populate("totalPurchaseInvoice");
    return res.status(200).json({
      success: true,
      error: false,
      message: "Supplier fetched successfully",
      Supplier: OneSupplier,
    });
  } catch (error) {
    console.log(`error show in get one supplier: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `error show in get one supplier ${error.message}`,
    });
  }
};

export const DeleteSupplier = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const supplierId = req.params.supplierId;

    if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(supplierId) || !supplierId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid supplierId",
      });
    }
    const AutherData = await Worker.findById(AutherId);
    if (!AutherData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }
    const SupplierData = await Supplier.findById(supplierId);
    if (!SupplierData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Supplier not found",
      });
    }

    if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to delete supplier",
      });
    }
    if (AutherData.role !== "Admin") {
      const BranchId = AutherData.BranchId;
      if (BranchId.toString() !== SupplierData.BranchId.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to delete supplier",
        });
      }
    }

    const DeleteSupplier = await Supplier.findByIdAndDelete(supplierId);
    return res.status(200).json({
      success: true,
      error: false,
      message: "Supplier deleted successfully",
      Supplier: DeleteSupplier,
    });
  } catch (error) {
    console.log(`error show in delete supplier: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `error show in delete supplier ${error.message}`,
    });
  }
};

// export const UpdateSupplier = async (req, res) => {
//   try {
//     const AutherId = req.staffId;
//     const supplierId = req.params.supplierId;
//     const {
//       SupplierName,
//       description,
//       phoneNumber,
//       mobileNumbers,
//       companyName,
//       email,
//       address,
//       paymentMethod,
//       note,
//     } = req.body;
//     if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid AutherId",
//       });
//     }
//     if (!mongoose.Types.ObjectId.isValid(supplierId) || !supplierId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid supplierId",
//       });
//     }
//     const AutherData = await Worker.findById(AutherId);
//     if (!AutherData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Author not found",
//       });
//     }
//     if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "You are not authorized to update supplier",
//       });
//     }

//     const SupplierData = await Supplier.findById(supplierId);
//     if (!SupplierData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Supplier not found",
//       });
//     }

//     if (AutherData.role !== "Admin") {
//       const BranchId = AutherData.BranchId;
//       if (BranchId.toString() !== SupplierData.BranchId.toString()) {
//         return res.status(403).json({
//           success: false,
//           error: true,
//           message: "You are not authorized to update supplier",
//         });
//       }
//     }

//     const UpdateSupplier = await Supplier.findByIdAndUpdate(
//       supplierId,
//       {
//         SupplierName,
//         description,
//         phoneNumber,
//         mobileNumbers,
//         companyName,
//         email,
//         address,
//         paymentMethod,
//         note,
//       },
//       { new: true }
//     );

//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: "Supplier updated successfully",
//       Supplier: UpdateSupplier,
//     });
//   } catch (error) {
//     console.log(`error show in update supplier: ${error}`);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: `error show in update supplier ${error.message}`,
//     });
//   }
// };

export const UpdateSupplier = async (req, res) => {
  try {
    const AuthorId = req.staffId;
    const supplierId = req.params.supplierId;
    const {
      SupplierName,
      description,
      phoneNumber,
      mobileNumbers,
      companyName,
      email,
      address,
      paymentMethod,
      note,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(AuthorId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid Author ID",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(supplierId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid Supplier ID",
      });
    }

    const AuthorData = await Worker.findById(AuthorId);
    if (!AuthorData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }

    if (AuthorData.role !== "Admin" && AuthorData.role !== "Manager") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to update this supplier",
      });
    }

    const SupplierData = await Supplier.findById(supplierId);
    if (!SupplierData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Supplier not found",
      });
    }

    if (AuthorData.role !== "Admin") {
      const BranchId = AuthorData.BranchId;
      if (BranchId.toString() !== SupplierData.BranchId.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to update this supplier",
        });
      }
    }

    // Updating supplier
    const UpdatedSupplier = await Supplier.findByIdAndUpdate(
      supplierId,
      {
        SupplierName,
        description,
        phoneNumber,
        mobileNumbers,
        companyName,
        email,
        address,
        paymentMethod,
        note,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "Supplier updated successfully",
      supplier: UpdatedSupplier,
    });
  } catch (error) {
    console.error(`Error in UpdateSupplier: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `An unexpected error occurred while updating the supplier: ${error.message}`,
    });
  }
};
