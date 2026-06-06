import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomeRedirect() {
  const { profile, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  return profile.role === "admin"
    ? <Navigate to="/admin" replace />
    : <Navigate to="/dashboard" replace />;
}