import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../store/Context";

export function PrivateRouteLogin() {
  const [state] = useContext(UserContext);
  if (!state.isLogin) return <Navigate to="/" />
  
  return <Outlet />
}
