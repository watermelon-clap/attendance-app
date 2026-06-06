import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authService";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const { profile } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();

    navigate("/login");
  }

  return (
    <nav className="navbar">

      <div className="navbar-top">

      <div className="navbar-logo">
        <img
          src="/images/alogo.jpeg"
          alt="logo"
        />
      </div>
        <button
          className="hamburger"
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
        >
          ☰
        </button>

      </div>
      <div
        className={`navbar-menu ${
          menuOpen
            ? "active"
            : ""
        }`}
      >

        {profile?.role ===
        "admin" ? (
          <>
            <Link
              className="nav-link"
              to="/admin"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Dashboard
            </Link>

            <Link
              className="nav-link"
              to="/admin/users"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Users
            </Link>

            <Link
              className="nav-link"
              to="/admin/attendance"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Attendance Entry
            </Link>

            <Link
              className="nav-link"
              to="/admin/attendance-manager"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Attendance Manager
            </Link>

            <Link
              className="nav-link"
              to="/admin/broadcasts"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Broadcasts
            </Link>
          </>
        ) : (
          <>
            <Link
              className="nav-link"
              to="/profile"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Profile
            </Link>

            <Link
              className="nav-link"
              to="/dashboard"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Dashboard
            </Link>

            <Link
              className="nav-link"
              to="/attendance-history"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Attendance
            </Link>

            <Link
              className="nav-link"
              to="/broadcasts"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Messages
            </Link>
          </>
        )}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

        </div>


    </nav>
  );
}