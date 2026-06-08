import { useState } from "react";
import { register } from "../services/authService";
import { Link } from "react-router-dom";
import "./css/CommonStyles.css"


export default function SignupPage() {
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    class: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] =
  useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await register(form);

      setSuccess(
        "Registration successful. Please wait for administrator approval."
      );

      setForm({
        full_name: "",
        username: "",
        class: "",
        email: "",
        password: "",
      });

    } catch (err) {
      alert(err.message);
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

      <h1 className="auth-title">
        Create Account
      </h1>
      <p className="auth-subtitle">
        Create your account and wait for
        administrator approval.
      </p>

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="auth-form"
      >

        <input
          className="auth-input"
          type="text"
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) =>
            setForm({
              ...form,
              full_name: e.target.value,
            })
          }
          required
        />

        <input
          className="auth-input"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
          required
        />

        <input
          className="auth-input"
          type="number"
          placeholder="Class"
          value={form.class}
          onChange={(e) =>
            setForm({
              ...form,
              class: e.target.value,
            })
          }
          required
        />

        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          required
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          required
        />

        <button
          type="submit"
          className="primary-btn auth-btn"
        >
          Register
        </button>

      </form>

      <p className="auth-footer">
        Have an account already?

        <Link
          to="/login"
          className="auth-link"
        >
          Login
        </Link>
      </p>

    </div>

  </div>
);
}
