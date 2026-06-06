import {
  useNavigate,
} from "react-router-dom";

import {
  logout,
} from "../services/authService";

export default function LogoutButton() {
  const navigate =
    useNavigate();

  async function handleLogout() {
    await logout();

    navigate("/login");
  }

  return (
    <button
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}