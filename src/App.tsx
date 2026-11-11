import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminSignUp from "./pages/AdminSignUp";
import SetUpPassword from "./pages/SetUpPassword";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layout/dashboardLayout";
import CreateProduct from "./pages/CreateProduct";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import CreateSupplier from "./pages/CreateSupplier";
import ProtectedRoute from "./ProtectedRoute";
import NonProtectedRoute from "./NonProtectedRoute";
import SalesRecord from "./pages/SalesRecord";
import MakeSale from "./pages/MakeSale";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import CreateCustomer from "./pages/CreateCustomer";
import Reports from "./pages/Reports";
import SettingsPage from "./pages/Settings";
import LandingPage from "./landing/LandingPage";

function App() {
  return (
    <Routes>
      
      <Route element={<ProtectedRoute/>}>
        <Route element={<DashboardLayout/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/create-supplier" element={<CreateSupplier />} />
          <Route path="/sales" element={<SalesRecord />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/create-customer" element={<CreateCustomer />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        
        <Route path="/make-sale" element={<MakeSale />} />
      </Route>

      <Route element={<NonProtectedRoute/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      <Route path="/" element={<LandingPage />} />
      <Route path="/set-up-admin-account/:token" element={<AdminSignUp />} />
      <Route path="/set-password/:token" element={<SetUpPassword />} />
    </Routes>
  );
}

export default App;
