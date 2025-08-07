import { createBrowserRouter } from "react-router";
import Root from "@/Root";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Forbidden from "@/pages/Forbidden";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "reset-password", Component: ResetPassword },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      { path: "forbidden", Component: Forbidden },
      { path: "*", Component: NotFound },
    ],
  },
]);

export default router;
