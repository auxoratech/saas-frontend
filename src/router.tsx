import { createBrowserRouter, Navigate, Outlet } from "react-router";
import Root from "./Root";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("access_token"); // dummy check
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const Dashboard = () => {
  return <div>Dashboard</div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "reset-password", Component: ResetPassword },
      {
        element: <ProtectedRoute />,
        children: [{ path: "dashboard", Component: Dashboard }],
      },
    ],
  },
]);

export default router;
