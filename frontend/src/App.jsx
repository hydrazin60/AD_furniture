import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contract from "./pages/Contract";
import Services from "./pages/Services";
import Login from "./pages/Login";
import NavBar from "./pages/NavBar";
import AdminRegister from "./pages/Admin/AUth/AdminRegister";
import NewStaffRegister from "./pages/Manager/Auth/NewStaffRegister";
import StaffManagment from "./pages/Manager/staff/StaffManagment";
import FinalProductManagement from "./pages/Manager/Final_product/FinalProductManagement";
import RawMaterialManagment from "./pages/Manager/Raw_Material/RawMaterialManagment";
import ExpenseInvoicesManagement from "./pages/Manager/Invoice/ExpenseInvoices/ExpenseInvoicesManagement";
import PurchaseInvoicesManagment from "./pages/Manager/Invoice/PurchaseInvoices/PurchaseInvoicesManagment";
import SalesReceiptManagment from "./pages/Manager/Invoice/SalesReceipt/SalesReceiptManagment";
import StaffDashboard from "./pages/StaffDashboard";
import CustomerManagementPage from "./pages/Manager/Customer/CustomerManagementPage";
import BranchManagement from "./pages/Manager/Branch/BranchManagement";
import SalaryManagment from "./pages/Manager/salary/SalaryManagment";
import VehiclesManagment from "./pages/Manager/Vehicles/VehiclesManagment";
import TodoListManagment from "./pages/Manager/Todo_list_project/TodoListManagment";
import SupplierManagment from "./pages/Manager/Supplier/SupplierManagment";
import NewBranchRegister from "./pages/Admin/Branch/NewBranchRegister";
import RegisterNewCustommer from "./pages/Manager/Customer/RegisterNewCustomer";
import UploadFinalProduct from "./pages/Manager/Final_product/UploadFinalProduct";
import CreateExpenseInvoices from "./pages/Manager/Invoice/ExpenseInvoices/CreateExpenseInvoices";
import CreatePurchaseInvoices from "./pages/Manager/Invoice/PurchaseInvoices/CreatePurchaseInvoices";
import CreateSalesReceipt from "./pages/Manager/Invoice/SalesReceipt/CreateSalesReceipt";
import UpdateRawMaterial from "./pages/Manager/Raw_Material/UpdateRawMaterial";
import CreateSalary from "./pages/Manager/salary/CreateSalary";
import RegisterNewSuppliers from "./pages/Manager/Supplier/RegisterNewSuppliers";
import NewVehiclesRegister from "./pages/Manager/Vehicles/NewVehiclesRegister";
import Staffcontrollers from "./pages/Controllers/Staffcontrollers";
import BranchControllers from "./pages/Controllers/BranchControllers";
import InvoiceControllers from "./pages/Controllers/InvoiceControllers";
import ProductControllers from "./pages/Controllers/ProductControllers";
import SalaryControllers from "./pages/Controllers/SalaryControllers";
import SupplierAndCustomerControllers from "./pages/Controllers/SupplierAndCustomerControllers";
import TodoListControllers from "./pages/Controllers/TodoListControllers";
import VehiclesControl from "./pages/Controllers/VehiclesControl";
import RawMaterialControl from "./pages/Controllers/RawMaterialControl";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div className=" min-h-screen">
        <NavBar />
        <div className=" pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/staff/dashboard/:staffIds"
              element={<StaffDashboard />}
            />
            {/* ontroller Routes */}
            <Route path="/staff/controllers" element={<Staffcontrollers />} />
            <Route path="/branch/controllers" element={<BranchControllers />} />
            <Route
              path="/invoice/controllers"
              element={<InvoiceControllers />}
            />
            <Route
              path="/product/controllers"
              element={<ProductControllers />}
            />
            <Route path="/salary/controllers" element={<SalaryControllers />} />
            <Route
              path="/supplier/customers/controllers"
              element={<SupplierAndCustomerControllers />}
            />
            <Route
              path="/todolist/controllers"
              element={<TodoListControllers />}
            />
            <Route path="/vehicles/controllers" element={<VehiclesControl />} />
            <Route
              path="/raw_material/controllers"
              element={<RawMaterialControl />}
            />
            {/*  Admin register */}
            <Route path="/admin/register" element={<AdminRegister />} />
            {/* staff */}
            <Route path="/staff/register" element={<NewStaffRegister />} />
            <Route path="/branch/register" element={<NewBranchRegister />} />
            {/* Customer Routes */}
            <Route
              path="/customer/register"
              element={<RegisterNewCustommer />}
            />
            {/* Final Product Routes */}
            <Route
              path="/upload/final_product"
              element={<UploadFinalProduct />}
            />
            {/* invoices Routes */}
            <Route
              path="/create/expenseinvoice"
              element={<CreateExpenseInvoices />}
            />
            <Route
              path="/create/purchaseinvoice"
              element={<CreatePurchaseInvoices />}
            />
            <Route
              path="/create/salesreceipt"
              element={<CreateSalesReceipt />}
            />
            {/* Raw Material Routes */}
            <Route path="/upload/rawmaterial" element={<UpdateRawMaterial />} />
            {/* Salary Routes */}
            <Route path="/create/salary" element={<CreateSalary />} />
            {/* Supplier Routes */}
            <Route
              path="/supplier/register"
              element={<RegisterNewSuppliers />}
            />
            <Route path="/vehicle/register" element={<NewVehiclesRegister />} />

            {/* Managment Routes */}
            <Route path="/staffmanagment" element={<StaffManagment />} />
            <Route
              path="/final_Product/management"
              element={<FinalProductManagement />}
            />
            <Route
              path="/raw_material/management"
              element={<RawMaterialManagment />}
            />
            <Route
              path="/expenseInvoices/management"
              element={<ExpenseInvoicesManagement />}
            />
            <Route
              path="/purchaseInvoices/management"
              element={<PurchaseInvoicesManagment />}
            />
            <Route
              path="/salesInvoices/management"
              element={<SalesReceiptManagment />}
            />
            <Route
              path="/customer/management"
              element={<CustomerManagementPage />}
            />
            <Route path="/branch/management" element={<BranchManagement />} />
            <Route path="/salary/management" element={<SalaryManagment />} />
            <Route path="/vehicle/management" element={<VehiclesManagment />} />
            <Route
              path="/todo_list/management"
              element={<TodoListManagment />}
            />
            <Route
              path="/supplier/management"
              element={<SupplierManagment />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
