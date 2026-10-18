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

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout/>}>
        <ProtectedRoute isAuthenticated={false}>
          <Route element={<DashboardLayout/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/create-supplier" element={<CreateSupplier />} />
        </Route>
        </ProtectedRoute>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/set-up-admin-account/:token" element={<AdminSignUp />} />
      <Route path="/set-password/:token" element={<SetUpPassword />} />
    </Routes>
  );
}

export default App;