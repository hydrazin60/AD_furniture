// import Branch from "../../../models/Branch/Branch.model.js";
// import SalesReceipt from "../../../models/invoice/SalesReceipt_Invoice/SalesReceipt.models.js";
// import Product from "../../../models/product/FinalProduct/Product.models.js";
// import Worker from "../../../models/user/worker/worker.models.js";

// export const CreateSalesReceiptInvoice = async (req, res) => {
//   try {
//     const { staffId: AutherId } = req;
//     const { branchId: BranchId } = req.params;
//     const {
//       CustomerName,
//       SRNumber,
//       date,
//       paymentMethod,
//       ProductId,
//       MessageToCustomer,
//       MessageToStatement,
//       quantity,
//       discount = 0,
//     } = req.body;

//     // Validate required fields
//     if (!AutherId || !BranchId || !CustomerName || !SRNumber) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Missing required fields",
//       });
//     }

//     // Fetch author details
//     const AutherData = await Worker.findById(AutherId);
//     if (!AutherData)
//       return res
//         .status(404)
//         .json({ success: false, error: true, message: "Author not found" });

//     // Authorization check
//     if (!["Manager", "Admin"].includes(AutherData.role)) {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "Unauthorized access",
//       });
//     }

//     // Fetch branch details
//     const BranchData = await Branch.findById(BranchId);
//     if (!BranchData)
//       return res
//         .status(404)
//         .json({ success: false, error: true, message: "Branch not found" });

//     // Admin should not create invoices for unrelated branches
//     if (
//       AutherData.role === "Admin" &&
//       AutherData._id.toString() !== BranchData.BranchStaff.toString()
//     ) {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "Unauthorized to create invoice for this branch",
//       });
//     }

//     // Check if SRNumber already exists
//     const existingInvoice = await SalesReceipt.findOne({ SRNumber });
//     if (existingInvoice) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "SR Number already exists",
//       });
//     }
//     const product = await Product.findById(ProductId);
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Product not found",
//       });
//     }

//     const finalPrice = quantity * product.productPrice - discount;

//     // Create and save the invoice
//     const SalesReceiptInvoice = new SalesReceipt({
//       BranchId,
//       salesReceiptCreatedBy: AutherId,
//       CustomerName,
//       SRNumber,
//       date,
//       paymentMethod,
//       ProductId,
//       totalAmount: finalPrice,
//       MessageToCustomer,
//       MessageToStatement,
//       quantity,
//       unitPrice,
//     });

//     const result = await SalesReceiptInvoice.save();

//     // Populate response data
//     const populateData = await SalesReceipt.findById(result._id)
//       .populate(
//         "salesReceiptCreatedBy",
//         "  fullName  email  phoneNumber role  "
//       )
//       .populate(
//         "ProductId",
//         "productName productPrice productCategory  productQuantity "
//       )
//       .populate("BranchId", "branchName address");

//     return res.status(201).json({
//       success: true,
//       message: "Sales receipt invoice created successfully",
//       data: populateData,
//     });
//   } catch (error) {
//     console.error(`Error in CreateSalesReceiptInvoice: ${error.message}`);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: "Internal server error",
//     });
//   }
// };

import Branch from "../../../models/Branch/Branch.model.js";
import SalesReceipt from "../../../models/invoice/SalesReceipt_Invoice/SalesReceipt.models.js";
import Product from "../../../models/product/FinalProduct/Product.models.js";
import Worker from "../../../models/user/worker/worker.models.js";

export const CreateSalesReceiptInvoice = async (req, res) => {
  try {
    const { staffId: AutherId } = req;
    const { branchId: BranchId } = req.params;
    const {
      CustomerName,
      SRNumber,
      date,
      paymentMethod,
      ProductId,
      MessageToCustomer,
      MessageToStatement,
      quantity,
      discount = 0,
    } = req.body;

    // Validate required fields
    if (!AutherId || !BranchId || !CustomerName || !SRNumber) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Missing required fields",
      });
    }

    // Fetch author details
    const AutherData = await Worker.findById(AutherId);
    if (!AutherData)
      return res
        .status(404)
        .json({ success: false, error: true, message: "Author not found" });

    // Authorization check
    if (!["Manager", "Admin"].includes(AutherData.role)) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Unauthorized access",
      });
    }

    // Fetch branch details
    const BranchData = await Branch.findById(BranchId);
    if (!BranchData)
      return res
        .status(404)
        .json({ success: false, error: true, message: "Branch not found" });

    // Admin should not create invoices for unrelated branches
    if (
      AutherData.role === "Admin" &&
      AutherData._id.toString() !== BranchData.BranchStaff.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Unauthorized to create invoice for this branch",
      });
    }

    // Check if SRNumber already exists
    const existingInvoice = await SalesReceipt.findOne({ SRNumber });
    if (existingInvoice) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "SR Number already exists",
      });
    }
    const product = await Product.findById(ProductId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product not found",
      });
    }

    const finalPrice = quantity * product.productPrice - discount;

    // Create and save the invoice
    const SalesReceiptInvoice = new SalesReceipt({
      BranchId,
      salesReceiptCreatedBy: AutherId,
      CustomerName,
      SRNumber,
      date,
      paymentMethod,
      ProductId,
      totalAmount: finalPrice,
      unitPrice: product.productPrice,
      MessageToCustomer,
      MessageToStatement,
      quantity,
    });

    const result = await SalesReceiptInvoice.save();

    // Populate response data
    const populateData = await SalesReceipt.findById(result._id)
      .populate(
        "salesReceiptCreatedBy",
        "  fullName  email  phoneNumber role  "
      )
      .populate(
        "ProductId",
        "productName productPrice productCategory  productQuantity "
      )
      .populate("BranchId", "branchName address");

    return res.status(201).json({
      success: true,
      message: "Sales receipt invoice created successfully",
      data: populateData,
    });
  } catch (error) {
    console.error(`Error in CreateSalesReceiptInvoice: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};
