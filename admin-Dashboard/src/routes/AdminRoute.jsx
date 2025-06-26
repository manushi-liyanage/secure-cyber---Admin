import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));

    if (decoded.role !== "admin") {
      return <Navigate to="/" />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/" />;
  }
}
