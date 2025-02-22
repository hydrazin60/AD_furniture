import mongoose from "mongoose";
import Branch from "../../../models/Branch/Branch.model.js";
import PurchaseInvoice from "../../../models/invoice/Purchase_Invoice/purchaseInvoice.models.js";
import Worker from "../../../models/user/worker/worker.models.js";
import Supplier from "../../../models/Supplier/Supplier.models.js";

export const CreatePurchaseInvoice = async (req, res) => {
  try {
    // ownInvoiceNumber is the invoice number of the invoice that is being created(Ad_funiture company creates this invoice)
    const {
      invoiceNumber,
      invoiceDate,
      products,
      Notes,
      ownInvoiceNumber,
      supplierId,
    } = req.body;
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
          "Invoice Number and products are required, and products must be a non-empty array",
      });
    }

    if (!ownInvoiceNumber) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "ownInvoiceNumber is required",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(supplierId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Supplier ID is required",
      });
    }

    const existingInovice = await PurchaseInvoice.findOne({
      ownInvoiceNumber: ownInvoiceNumber,
    });
    if (existingInovice) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invoice Number already exists",
      });
    }

    const Auther = await Worker.findById(AutherId);
    if (!Auther) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author ID not found",
      });
    }

    if (Auther.role !== "Manager" && Auther.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Only Managers and Admins can create an invoice",
      });
    }
    const BranchData = await Branch.findById(branchId);
    if (!BranchData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Branch not found",
      });
    }
    if (Auther.role !== "Admin") {
      if (Auther._id.toString() !== BranchData.BranchStaff.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message:
            "You are not authorized to create an invoice for this branch",
        });
      }
    }

    let subtotal = 0;
    const validatedProducts = products.map((product) => {
      const totalAmount = product.quantity * product.unitPrice;
      const discountedAmount = totalAmount - (product.discount || 0);
      const taxAmount = (discountedAmount * (product.tax || 0)) / 100;
      const finalProductPrice = discountedAmount + taxAmount;
      subtotal += finalProductPrice;

      return {
        productName: product.productName,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
        totalAmount: totalAmount,
        tax: product.tax || 0,
        discount: product.discount || 0,
        finalProductPrice: finalProductPrice,
      };
    });

    const finalPrice = subtotal;
    const newInvoice = new PurchaseInvoice({
      ownInvoiceNumber,
      BranchId: branchId,
      purchaseInvoiceCreatedBy: AutherId,
      invoiceNumber,
      finalPrice,
      invoiceDate,
      products: validatedProducts,
      Notes,
      supplierId,
    });

    const savedInvoice = await newInvoice.save();
    const populatedInvoice = await PurchaseInvoice.findById(savedInvoice._id)
      .populate("BranchId", " branchName branchPhoneNumber address")
      .populate(
        "purchaseInvoiceCreatedBy",
        " fullName phoneNumber email address"
      );

    BranchData.PurchaseInvoices.push(savedInvoice._id);
    await BranchData.save();

    if (supplierId) {
      const SupplierData = await Supplier.findById(supplierId);
      if (!SupplierData) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Supplier not found",
        });
      }
      SupplierData.totalPurchaseInvoice.push(savedInvoice._id);
      await SupplierData.save();
    }

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
export const UpdatePurchaseInvoice = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const purchaseInvoiceId = req.params.purchaseInvoiceId;
    const { invoiceNumber, invoiceDate, products, Notes } = req.body;
    if (!mongoose.Types.ObjectId.isValid(purchaseInvoiceId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid purchaseInvoiceId",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(AutherId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
    const AutherData = await Worker.findById(AutherId);
    if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to update this purchase invoice",
      });
    }
    if (AutherData.role !== "Admin") {
      if (AutherData._id.toString() !== AutherData.BranchStaff.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to update this purchase invoice",
        });
      }
    }

    const purchaseInvoice = await PurchaseInvoice.findById(purchaseInvoiceId);
    if (!purchaseInvoice) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Purchase invoice not found",
      });
    }
    if (invoiceNumber !== undefined) {
      purchaseInvoice.invoiceNumber = invoiceNumber;
    }
    if (invoiceDate !== undefined) {
      purchaseInvoice.invoiceDate = invoiceDate;
    }

    if (products !== undefined) {
      purchaseInvoice.products = products.map((product) => {
        if (
          product.totalAmount === undefined &&
          product.quantity &&
          product.unitPrice
        ) {
          product.totalAmount = product.quantity * product.unitPrice;
        }
        return product;
      });
    }

    if (Notes !== undefined) {
      purchaseInvoice.Notes = Notes;
    }
    const updatedInvoice = await purchaseInvoice.save();
    const populatedInvoice = await PurchaseInvoice.findById(updatedInvoice._id)
      .populate("BranchId")
      .populate("purchaseInvoiceCreatedBy");

    return res.status(200).json({
      success: true,
      error: false,
      message: "Purchase invoice updated successfully",
      data: populatedInvoice,
    });
  } catch (error) {
    console.error(`Error in UpdatePurchaseInvoice controller: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error in Update PurchaseInvoice controller: ${error}`,
    });
  }
};

// Admin
export const getAllPurchaseInvoices = async (req, res) => {
  try {
    const AutherId = req.staffId;
    if (!mongoose.Types.ObjectId.isValid(AutherId)) {
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
    if (AutherData.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to get all purchase invoices",
      });
    }

    const AllPurchaseInvoices = await PurchaseInvoice.find()
      .populate("BranchId")
      .populate("purchaseInvoiceCreatedBy");
    return res.status(200).json({
      success: true,
      error: false,
      message: "All purchase invoices fetched successfully",
      data: AllPurchaseInvoices,
    });
  } catch (error) {
    console.error(`Error in getAllPurchaseInvoices controller: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error in getAllPurchaseInvoices controller: ${error}`,
    });
  }
};

export const getAllPurchaseInvoicesOnBranch = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const branchId = req.params.branchId;
    if (!mongoose.Types.ObjectId.isValid(AutherId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(branchId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid branchId",
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
    if (AutherData.role !== "Admin") {
      if (AutherData._id.toString() !== AutherData.BranchStaff.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message:
            "You are not authorized to get all purchase invoices on this branch",
        });
      }
    }

    const AllPurchaseInvoices = await PurchaseInvoice.find({
      BranchId: branchId,
    })
      .populate("BranchId")
      .populate("purchaseInvoiceCreatedBy");

    return res.status(200).json({
      success: false,
      error: false,
      message: "All purchase invoices fetched successfully",
      data: AllPurchaseInvoices,
    });
  } catch (error) {
    console.error(
      `Error in getAllPurchaseInvoicesOnBranch controller: ${error}`
    );
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error in getAllPurchaseInvoicesOnBranch controller: ${error}`,
    });
  }
};

export const getOnePurchaseInvoice = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const purchaseInvoiceId = req.params.purchaseInvoiceId;
    if (!mongoose.Types.ObjectId.isValid(AutherId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(purchaseInvoiceId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid purchaseInvoiceId",
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

    if (AutherData.role !== "Admin") {
      const BranchData = await Branch.findById(AutherData.BranchStaff);
      if (BranchData._id.toString() !== AutherData.BranchStaff.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to get this purchase invoice",
        });
      }
    }
    const purchaseInvoice = await PurchaseInvoice.findById(purchaseInvoiceId)
      .populate("BranchId")
      .populate("purchaseInvoiceCreatedBy");

    if (!purchaseInvoice) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Purchase invoice not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Purchase invoice fetched successfully",
      data: purchaseInvoice,
    });
  } catch (error) {
    console.error(`Error in getOnePurchaseInvoice controller: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error in getOnePurchaseInvoice controller: ${error}`,
    });
  }
};

export const deletePurchaseInvoice = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const purchaseInvoiceId = req.params.purchaseInvoiceId;
    if (!mongoose.Types.ObjectId.isValid(AutherId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(purchaseInvoiceId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid purchaseInvoiceId",
      });
    }
    const Auther = await Worker.findById(AutherId);
    if (!Auther) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }

    if (Auther.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to delete this purchase invoice",
      });
    }
    const purchaseInvoice = await PurchaseInvoice.findById(purchaseInvoiceId);
    if (!purchaseInvoice) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Purchase invoice not found",
      });
    }
    await purchaseInvoice.deleteOne();
    return res.status(200).json({
      success: true,
      error: false,
      message: "Purchase invoice deleted successfully",
    });
  } catch (error) {
    console.error(`Error in deletePurchaseInvoice controller: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error in deletePurchaseInvoice controller: ${error}`,
    });
  }
};
