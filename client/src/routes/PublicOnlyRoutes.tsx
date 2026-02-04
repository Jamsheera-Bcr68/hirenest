import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

export default function PublicRoutes() {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
