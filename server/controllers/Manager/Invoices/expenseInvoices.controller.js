import ExpenseInvoice from "../../../models/invoice/expense_Invoice/expense.model.js";
import Worker from "../../../models/user/worker/worker.models.js";
import Branch from "../../../models/Branch/Branch.model.js";
import mongoose from "mongoose";

export const CreateExpenseInvoice = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const branchId = req.params.branchId;
    const {
      Price,
      PaymentMethod,
      PaidName,
      typeOfExpense,
      tax,
      description,
      RefNumber,
      messageOnStatement,
    } = req.body;

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
        message: "You are not authorized to create an expense invoice",
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

    if (!Price || !PaidName || !typeOfExpense) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Price, Paid name and type of expense are required",
      });
    }

    const expenseInvoices = await ExpenseInvoice.create({
      BranchId: branchId,
      expenseInvoiceCreatedBy: AutherId,
      Price,
      PaymentMethod,
      PaidName,
      typeOfExpense,
      tax,
      description,
      RefNumber,
      messageOnStatement,
    });

    const populateData = await ExpenseInvoice.findById(expenseInvoices._id)
      .populate("BranchId")
      .populate("expenseInvoiceCreatedBy");

    res.status(201).json({
      success: true,
      error: false,
      message: "Expense invoice created successfully",
      data: populateData,
    });
  } catch (error) {
    console.log(`error in isAuthenticated middleware: ${error}`);
    res.status(500).json({
      success: false,
      error: true,
      message: `Error in isAuthenticated middleware: ${error}`,
    });
  }
};

export const UpdateExpenseInvoice = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const ExpenseInvoiceId = req.params.expenseInvoiceId;
    const {
      Price,
      PaymentMethod,
      PaidName,
      typeOfExpense,
      tax,
      description,
      RefNumber,
      messageOnStatement,
    } = req.body;

    console.log(req.body);
    console.log(AutherId);
    if (!mongoose.Types.ObjectId.isValid(ExpenseInvoiceId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid ExpenseInvoiceId",
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
    if (!AutherData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }
    if (AutherData.role !== "Manager" && AutherData.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to update this expense invoice",
      });
    }
    const BranchData = await AutherData.BranchId;

    if (AutherData.role !== "Admin") {
      if (AutherData._id.toString() !== BranchData.BranchStaff.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to update this expense invoice",
        });
      }
    }

    const ExpenseInvoiceData = await ExpenseInvoice.findById(ExpenseInvoiceId);
    if (!ExpenseInvoiceData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Expense invoice not found",
      });
    }

    if (Price !== undefined) ExpenseInvoiceData.Price = Price;
    if (PaymentMethod !== undefined)
      ExpenseInvoiceData.PaymentMethod = PaymentMethod;
    if (PaidName !== undefined) ExpenseInvoiceData.PaidName = PaidName;
    if (typeOfExpense !== undefined)
      ExpenseInvoiceData.typeOfExpense = typeOfExpense;
    if (tax !== undefined) ExpenseInvoiceData.tax = tax;
    if (description !== undefined) ExpenseInvoiceData.description = description;
    if (RefNumber !== undefined) ExpenseInvoiceData.RefNumber = RefNumber;
    if (messageOnStatement !== undefined)
      ExpenseInvoiceData.messageOnStatement = messageOnStatement;

    await ExpenseInvoiceData.save();
    const populateData = await ExpenseInvoice.findById(ExpenseInvoiceId)
      .populate("BranchId")
      .populate("expenseInvoiceCreatedBy");

    return res.status(200).json({
      success: true,
      error: false,
      message: "Expense invoice updated successfully",
      data: populateData,
    });
  } catch (error) {
    console.log(` error in updating expense invoice: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error in updating expense invoice: ${error}`,
    });
  }
};
//  only Admin
export const getAllExpenseInvoices = async (req, res) => {
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
        message: "You are not authorized to get this expense invoice",
      });
    }
    const AllExpenseInvoices = await ExpenseInvoice.find()
      .populate("BranchId")
      .populate("expenseInvoiceCreatedBy");

    return res.status(200).json({
      success: true,
      error: false,
      message: `All expense invoice fetched successfully`,
      data: AllExpenseInvoices,
    });
  } catch (error) {
    console.log(` error in getting all expense invoice: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error in getting all expense invoice: ${error}`,
    });
  }
};

export const getAllExpenseInvoicesOnBranch = async (req, res) => {
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

    if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to get this expense invoice",
      });
    }

    if (AutherData.role !== "Admin") {
      if (AutherData._id.toString() !== AutherData.BranchId.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to get this expense invoice",
        });
      }
    }
    const AllExpenseInvoices = await ExpenseInvoice.find({ BranchId: branchId })
      .populate("BranchId")
      .populate("expenseInvoiceCreatedBy");

    return res.status(200).json({
      success: true,
      error: false,
      message: `All expense invoice fetched successfully`,
      data: AllExpenseInvoices,
    });
  } catch (error) {
    console.log(` error in getting all expense invoice: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error in getting all expense invoice: ${error}`,
    });
  }
};

export const getOneExpenseInvoice = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const expenseInvoiceId = req.params.expenseInvoiceId;
    if (!mongoose.Types.ObjectId.isValid(AutherId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(expenseInvoiceId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid expenseInvoiceId",
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
        message: "You are not authorized to get this expense invoice",
      });
    }
    const ExpenseInvoiceData = await ExpenseInvoice.findById(expenseInvoiceId)
      .populate("BranchId")
      .populate("expenseInvoiceCreatedBy");

    return res.status(200).json({
      success: true,
      error: false,
      message: `Expense invoice fetched successfully`,
      data: ExpenseInvoiceData,
    });
  } catch (error) {
    console.log(` error in getting one expense invoice: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error in getting one expense invoice: ${error}`,
    });
  }
};
// only Admin
export const deleteExpenseInvoice = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const expenseInvoiceId = req.params.expenseInvoiceId;
    if (!mongoose.Types.ObjectId.isValid(AutherId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid AutherId",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(expenseInvoiceId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid expenseInvoiceId",
      });
    }
    if (!expenseInvoiceId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid expenseInvoiceId",
      });
    }
    if (!AutherId) {
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
        message: "You are not authorized to delete this expense invoice",
      });
    }

    const deletedExpenseInvoice = await ExpenseInvoice.findById(
      expenseInvoiceId
    );
    if (!deletedExpenseInvoice) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Expense invoice not found",
      });
    }

    await ExpenseInvoice.findByIdAndDelete(expenseInvoiceId);
    return res.status(200).json({
      success: true,
      error: false,
      message: `Expense invoice deleted successfully`,
      data: deletedExpenseInvoice,
    });
  } catch (error) {
    console.log(` error in deleting expense invoice: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error in deleting expense invoice: ${error}`,
    });
  }
};

