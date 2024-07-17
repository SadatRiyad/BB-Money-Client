import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Login from "../Auth/Login";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import FontPage from "../FontPage/FontPage";
import Register from "../Auth/Register";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
            path: "/",
            element: <FontPage/>,
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/register",
            element: <Register/>,
        },
      ]
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute><DashboardLayout></DashboardLayout></ProtectedRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          // Add dashboard routes here for user
          {
            path:"/dashboard",
            // element: <h1>Dashboard</h1>,
            element: <ProtectedRoute><h1>gg</h1></ProtectedRoute>,
          },
        ]
    },
  ]);
  