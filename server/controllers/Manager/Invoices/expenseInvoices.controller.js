import ExpenseInvoice from "../../../models/invoice/expense_Invoice/expense.model.js";
import Worker from "../../../models/user/worker/worker.models.js";
import Branch from "../../../models/Branch/Branch.model.js";

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
