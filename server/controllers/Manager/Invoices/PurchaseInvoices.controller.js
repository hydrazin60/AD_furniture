import Branch from "../../../models/Branch/Branch.model.js";
import PurchaseInvoice from "../../../models/invoice/Purchase_Invoice/purchaseInvoice.models.js";
import Worker from "../../../models/user/worker/worker.models.js";

export const CreatePurchaseInvoice = async (req, res) => {
  try {
    const { invoiceNumber, invoiceDate, products, Notes } = req.body;
    const AutherId = req.staffId;
    const branchId = req.params.branchId;
    if (
      !invoiceNumber ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return res.status(400).json({
        success: false,
        error: true,
        message:
          "Invoice Number and products are required and products must be a non-empty array",
      });
    }

    // Fetch authenticated user
    const Auther = await Worker.findById(AutherId);
    if (!Auther) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author ID not found",
      });
    }

    // Check user role (Only Manager & Admin can proceed)
    if (Auther.role !== "Manager" && Auther.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Only Managers and Admins can create an invoice",
      });
    }

    // Fetch Branch details
    const BranchData = await Branch.findById(branchId);
    if (!BranchData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Branch not found",
      });
    }

    // Authorization check: Managers can only access their own branch
    if (
      Auther.role !== "Admin" &&
      Auther._id.toString() !== BranchData.BranchStaff.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to create an invoice for this branch",
      });
    }

    // Create and save invoice
    const newInvoice = new PurchaseInvoice({
      BranchId: branchId,
      purchaseInvoiceCreatedBy: AutherId,
      invoiceNumber,
      invoiceDate,
      products,
      Notes,
    });

    const savedInvoice = await newInvoice.save();

    const populatedInvoice = await PurchaseInvoice.findById(savedInvoice._id)
      .populate("BranchId")
      .populate("purchaseInvoiceCreatedBy");

    return res.status(201).json({
      success: true,
      error: false,
      message: "Invoice created successfully",
      data: populatedInvoice,
    });
  } catch (error) {
    console.error(`Error in CreatePurchaseInvoice controller: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal Server Error",
    });
  }
};
