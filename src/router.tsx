import { createBrowserRouter } from "react-router";
import Root from "@src/Root";
import Login from "@src/pages/Login";
import Register from "@src/pages/Register";
import ResetPassword from "@src/pages/ResetPassword";
import ProtectedRoute from "@src/components/common/ProtectedRoute";
import Dashboard from "@src/pages/Dashboard";
import NotFound from "@src/pages/NotFound";
import Forbidden from "@src/pages/Forbidden";
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
