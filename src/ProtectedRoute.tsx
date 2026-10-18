import { Navigate, Outlet } from "react-router-dom";

type props = {
  isAuthenticated: boolean;
}

export default function ProtectedRoute ({isAuthenticated}: props) {

  if(!isAuthenticated) return <Navigate to = "/login"/>
  return <Outlet/>
}