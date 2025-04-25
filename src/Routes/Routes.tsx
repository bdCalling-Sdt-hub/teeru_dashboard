import {
  createBrowserRouter,
  RouteObject,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

import Loading from "../ui/Loading";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.route";
import ProtectedRoute from "./ProtectedRoute";

//* Auth
import SignIn from "../pages/Auth/SignIn";
import ForgotPassword from "../pages/Auth/ForgetPassword";
import OtpPage from "../pages/Auth/OtpPage";
import UpdatePassword from "../pages/Auth/UpdatePassword";

import NotFound from "../ui/NotFound/NotFound";
import DashboardLayout from "../Components/Layout/DashboardLayout";
import { adminCommonPaths } from "./admin.common.route";

interface User {
  email: string;
  password: string;
  role: string;
}

// eslint-disable-next-line react-refresh/only-export-components
function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user_into") || "null"
    ) as User | null;
    if (user && user.role) {
      navigate(`/${user.role}/dashboard`, { replace: true });
    } else {
      navigate("/sign-in", { replace: true });
    }
  }, [navigate]);

  // Optionally display a loading indicator
  return <Loading />;
}

// Define routes with TypeScript types
const router: RouteObject[] = [
  {
    path: "/",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/dashboard",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/admin",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths), // Generating child routes dynamically
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminCommonPaths), // Generating child routes dynamically
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "forgot-password/otp-verify",
    element: <OtpPage />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
  {
    path: "*", // Catch-all for undefined routes
    element: <NotFound />,
  },
];

// Create the router using createBrowserRouter
const routes = createBrowserRouter(router);

export default routes;
