import express from "express";
import { CreatePurchaseInvoice } from "../../controllers/Manager/Invoices/PurchaseInvoices.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { CreateExpenseInvoice } from "../../controllers/Manager/Invoices/expenseInvoices.controller.js";
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

invoiceRouter.post(
  "/create/salesreceiptinvoice/:branchId",
  isAuthenticated,
  CreateSalesReceiptInvoice
);
export default invoiceRouter;
