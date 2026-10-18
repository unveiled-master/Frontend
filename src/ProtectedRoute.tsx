import type { ReactNode } from "react"
import { Navigate } from "react-router-dom";

type props = {
  isAuthenticated: boolean;
  children: ReactNode;
}

export default function ProtectedRoute ({isAuthenticated, children}: props) {

  if(!isAuthenticated) return <Navigate to = "/login"/>
  return <>{children}</>
}