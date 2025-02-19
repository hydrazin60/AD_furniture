import express from "express";
import { CreatePurchaseInvoice } from "../../controllers/Manager/Invoices/PurchaseInvoices.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import {
  CreateExpenseInvoice,
  deleteExpenseInvoice,
  getAllExpenseInvoices,
  getAllExpenseInvoicesOnBranch,
  getOneExpenseInvoice,
  UpdateExpenseInvoice,
} from "../../controllers/Manager/Invoices/expenseInvoices.controller.js";
import { CreateSalesReceiptInvoice } from "../../controllers/Manager/Invoices/SalesReceiptInvoices.controller.js";
const invoiceRouter = express.Router();
invoiceRouter.post(
  "/create/purchaseinvoice/:branchId",
  isAuthenticated,
  CreatePurchaseInvoice
);
invoiceRouter.post(
  "/create/expenseinvoice/:branchId",
  isAuthenticated,
  CreateExpenseInvoice
);
invoiceRouter.put(
  "/update/expenseinvoice/:expenseInvoiceId",
  isAuthenticated,
  UpdateExpenseInvoice
);
// only Admin
invoiceRouter.get("/get/all_invoices", isAuthenticated, getAllExpenseInvoices);
invoiceRouter.get(
  "/get/expenseinvoice_specific_branch/:branchId",
  isAuthenticated,
  getAllExpenseInvoicesOnBranch
);

invoiceRouter.post(
  "/create/salesreceiptinvoice/:branchId",
  isAuthenticated,
  CreateSalesReceiptInvoice
);

invoiceRouter.get(
  "/view/expenseinvoice/:expenseInvoiceId",
  isAuthenticated,
  getOneExpenseInvoice
);
// Admin
invoiceRouter.delete(
  "/delete/expenseinvoice/:expenseInvoiceId",
  isAuthenticated,
  deleteExpenseInvoice
);
export default invoiceRouter;
