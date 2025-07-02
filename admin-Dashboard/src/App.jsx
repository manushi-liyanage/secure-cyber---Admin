import { ThemeProvider } from "./contexts/theme-context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./routes/layout";
import Login from "./routes/Login/Login";
import DashboardPage from "./routes/dashboard/DashboardPage";
import PostManagement from "./routes/postManagement/PostManagement";
import AdminRoute from "./routes/AdminRoute";
import AdminUserManagement from "./routes/UserManagement/UserManagement";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },

    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <AdminRoute>
              <DashboardPage />
            </AdminRoute>
          ),
        },

        {
          path: "analytics",
          element: <h1 className="title">Analytics</h1>,
        },
        {
          path: "reports",
          element: <h1 className="title">Reports</h1>,
        },
        {
          path: "PostManagement",
          element: (
            <AdminRoute>
              <PostManagement />
            </AdminRoute>
          ),
        },
        {
          path: "new-customer",
          element: <h1 className="title">New Customer</h1>,
        },
        {
          path: "verified-customers",
          element: <h1 className="title">Verified Customers</h1>,
        },
        {
          path: "user-management",
          element: (
            <AdminRoute>
              <AdminUserManagement />
            </AdminRoute>
          ),
        },
        {
          path: "addUser",
          element: <h1 className="title">Add New User</h1>,
        },
        {
          path: "logout",
          element: <h1 className="title">Logout</h1>,
        },
        {
          path: "settings",
          element: <h1 className="title">Settings</h1>,
        },
      ],
    },
  ]);
  return (
    <ThemeProvider storageKey="theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
