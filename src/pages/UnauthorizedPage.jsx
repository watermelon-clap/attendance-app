import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
  <div className="unauthorized-page">

    <div className="unauthorized-card">
      <div className="lock-icon">
        🔒
      </div>
      <h1 className="error-code">
        403
      </h1>

      <h2 className="error-title">
        Access Denied
      </h2>

      <p className="error-message">
        You do not have permission to access
        this page.
      </p>

      <Link
        to="/"
        className="primary-btn"
      >
        Return to Dashboard
      </Link>

    </div>

  </div>
);
}