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
    // Create the new supplier
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
      supplierCreateBy: authorId,
      BranchId: branchId,
    });
    await newSupplier.save();
    // Populate the response with branch and author details
    const populateData = await Supplier.findById(newSupplier._id)
      .populate("BranchId", "branchName address branchPhoneNumber")
      .populate("supplierCreateBy", "fullName phoneNumber email address");
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
};
// import Branch from "../../../models/Branch/Branch.model.js";
// import Supplier from "../../../models/Supplier/Supplier.models.js";
// import Worker from "../../../models/user/worker/worker.models.js";
// export const createNewSupplier = async (req, res) => {
//   try {
//     const authorId = req.staffId;
//     const branchId = req.params.branchId;
//     const {
//       companyName,
//       description,
//       phoneNumber,
//       mobileNumbers,
//       email,
//       address,
//       paymentMethod,
//       note,
//     } = req.body;
//     if (!companyName || !phoneNumber || !email) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Company name, phone number, and email are required",
//       });
//     }
//     const author = await Worker.findById(authorId);
//     const branch = await Branch.findById(branchId);
//     if (author.role === "Manager") {
//       if (!branch) {
//         return res.status(404).json({
//           success: false,
//           error: true,
//           message: "Branch ID not found",
//         });
//       }
//     }
//     if (author.role !== "Manager" && author.role !== "Admin") {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "You are not authorized to create a new customer",
//       });
//     }
//     if (
//       author.role === "Admin" &&
//       author._id.toString() !== branch.BranchStaff.toString()
//     ) {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "You are not authorized to create a new customer",
//       });
//     }
//     const newSupplier = new Supplier({
//       companyName,
//       description,
//       phoneNumber,
//       mobileNumbers,
//       email,
//       address,
//       paymentMethod,
//       note,
//       supplierCreateBy: authorId,
//       BranchId: branchId,
//     });
//     await newSupplier.save();
//     const populateData = await Supplier.findById(newSupplier._id)
//       .populate("BranchId", "branchName address , branchPhoneNumber")
//       .populate("supplierCreateBy", "fullName phoneNumber email address");
//     return res.status(201).json({
//       success: true,
//       message: "Supplier created successfully",
//       supplier: populateData,
//     });
//   } catch (err) {
//     console.error(`Error in createNewCustomer: ${err}`);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: `Error in createNewCustomer: ${err.message}`,
//     });
//   }
// };
