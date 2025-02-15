import express from "express";
import { CreatePurchaseInvoice } from "../../controllers/Manager/Invoices/PurchaseInvoices.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { CreateExpenseInvoice } from "../../controllers/Manager/Invoices/expenseInvoices.controller.js";
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

export default invoiceRouter;
