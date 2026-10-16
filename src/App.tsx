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

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout/>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/set-up-admin-account/:token" element={<AdminSignUp />} />
      <Route path="/set-password/:token" element={<SetUpPassword />} />
    </Routes>
  );
}

export default App;