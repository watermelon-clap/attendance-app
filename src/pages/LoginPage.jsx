import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link }
  from "react-router-dom";

import "./css/CommonStyles.css"


export default function LoginPage() {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

const navigate = useNavigate();
  

  async function handleSubmit(e) {
    e.preventDefault();


    try {
      const result =
        await login(
          username,
          password
        );

 

      if (
        result.profile.role ===
        "admin"
      ) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  }

return (
  <div className="auth-page">

    <div className="auth-card">

      <img
        src="/images/alogo.jpeg"
        alt="Logo"
        className="auth-logo"
      />

      <h2 className="auth-title">
        Login
      </h2>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="auth-form"
      >

        <input
          className="auth-input"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          className="primary-btn auth-btn"
          type="submit"
        >
          Login
        </button>

      </form>

      <p className="auth-footer">
        Don't have an account?

        <Link
          to="/signup"
          className="auth-link"
        >
          Register Here
        </Link>
      </p>

    </div>

  </div>
);
}