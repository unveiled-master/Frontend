// import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

// type props = {
//   isAuthenticated: boolean;
//   children: ReactNode
// }

export default function ProtectedRoute () {
  const accessToken = localStorage.getItem("accessToken");
  const isAuthenticated = accessToken? true : false; 
  if(!isAuthenticated) return <Navigate to = "/login"/>
  return <Outlet/>
}