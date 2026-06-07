import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { profile } = useAuth();

  if (!profile) {
    return <p>Loading...</p>;
  }

 return (
  <div className="dashboard-page">

    <Navbar />

    <div className="dashboard-container">

      <h1 className="dashboard-title">
        My Profile
      </h1>

      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-avatar">
            {profile.full_name
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div>
            <h2>
              {profile.full_name}
            </h2>

            <p>
              @{profile.username}
            </p>
          </div>

        </div>

        <div className="profile-details">

          <div className="profile-row">
            <span>
              Name
            </span>

            <strong>
              {profile.full_name}
            </strong>
          </div>

          <div className="profile-row">
            <span>
              Username
            </span>

            <strong>
              {profile.username}
            </strong>
          </div>

          <div className="profile-row">
            <span>
              Class
            </span>

            <strong>
              {profile.class}
            </strong>
          </div>

          <div className="profile-row">
            <span>
              Email
            </span>

            <strong>
              {profile.email}
            </strong>
          </div>

          <div className="profile-row">
            <span>
              Status
            </span>

            <span
              className={`status-pill ${
                profile.is_active
                  ? "active"
                  : "inactive"
              }`}
            >
              {profile.is_active
                ? "Active"
                : "Inactive"}
            </span>
          </div>

        </div>

      </div>

    </div>

  </div>
);
}
