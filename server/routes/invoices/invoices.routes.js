import express from "express";
import {
  CreatePurchaseInvoice,
  deletePurchaseInvoice,
  getAllPurchaseInvoices,
  getAllPurchaseInvoicesOnBranch,
  getOnePurchaseInvoice,
  UpdatePurchaseInvoice,
} from "../../controllers/Manager/Invoices/PurchaseInvoices.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import {
  CreateExpenseInvoice,
  deleteExpenseInvoice,
  getAllExpenseInvoices,
  getAllExpenseInvoicesOnBranch,
  getOneExpenseInvoice,
  UpdateExpenseInvoice,
} from "../../controllers/Manager/Invoices/expenseInvoices.controller.js";
import {
  CreateSalesReceiptInvoice,
  deleteSalesReceiptInvoice,
  getAllSalesReceiptInvoice,
  GetAllSalesReceiptInvoiceOnBranch,
  getOneSalesReceiptInvoice,
  UpdateSalesReceiptInvoice,
} from "../../controllers/Manager/Invoices/SalesReceiptInvoices.controller.js";
const invoiceRouter = express.Router();
invoiceRouter.post(
  "/create/purchaseinvoice/:branchId",
  isAuthenticated,
  CreatePurchaseInvoice
);
invoiceRouter.put(
  "/update/purchaseinvoice/:purchaseInvoiceId",
  isAuthenticated,
  UpdatePurchaseInvoice
);
invoiceRouter.get(
  "/view/purchaseinvoice",
  isAuthenticated,
  getAllPurchaseInvoices
);
invoiceRouter.get(
  "/view/specificbranch/:branchId",
  isAuthenticated,
  getAllPurchaseInvoicesOnBranch
);
invoiceRouter.get(
  "/view/single_purchaseinvoice/:purchaseInvoiceId",
  isAuthenticated,
  getOnePurchaseInvoice
);
//  only dmin
invoiceRouter.delete(
  "/delete/purchaseinvoice/:purchaseInvoiceId",
  isAuthenticated,
  deletePurchaseInvoice
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
invoiceRouter.get(
  "/get/all_expenseinvoices",
  isAuthenticated,
  getAllExpenseInvoices
);
invoiceRouter.get(
  "/get/expenseinvoice_specific_branch/:branchId",
  isAuthenticated,
  getAllExpenseInvoicesOnBranch
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

invoiceRouter.post(
  "/create/salesreceiptinvoice/:branchId",
  isAuthenticated,
  CreateSalesReceiptInvoice
);

invoiceRouter.put(
  "/update/salesreceiptinvoice/:salesReceiptInvoiceId",
  isAuthenticated,
  UpdateSalesReceiptInvoice
);
invoiceRouter.get(
  "/view/all_salesreceiptinvoice",
  isAuthenticated,
  getAllSalesReceiptInvoice
);
invoiceRouter.get(
  "/view/one_salesreceiptinvoice/:expenseInvoiceId",
  isAuthenticated,
  getOneSalesReceiptInvoice
);

invoiceRouter.get(
  "/view/branch/all_salesreceiptinvoice/:salesReceiptInvoiceId",
  isAuthenticated,
  GetAllSalesReceiptInvoiceOnBranch
);
invoiceRouter.delete(
  "/delete/salesreceiptinvoice/:salesReceiptInvoiceId",
  isAuthenticated,
  deleteSalesReceiptInvoice
);

export default invoiceRouter;
