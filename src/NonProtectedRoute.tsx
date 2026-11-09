import { Navigate, Outlet } from "react-router-dom";

// type props = {
//   isAuthenticated: boolean;
// }

export default function NonProtectedRoute () {
  const accessToken = localStorage.getItem("accessToken");
  const isAuthenticated = accessToken? true : false; 
  if(isAuthenticated) return <Navigate to = "/dashboard"/>
  return <Outlet/>
}
