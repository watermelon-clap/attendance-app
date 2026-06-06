import { Navigate }
  from "react-router-dom";

import { useAuth }
  from "../context/AuthContext";

export default function AdminRoute({
  children,
}) {
  const {
    user,
    profile,
    loading,
  } = useAuth();

  if (loading)
    return <p>Loading...</p>;

  if (!user)
    return (
      <Navigate to="/login" />
    );

  if (
    profile?.role !== "admin"
  ) {
    return (
      <Navigate
        to="/unauthorized"
      />
    );
  }

  return children;
}