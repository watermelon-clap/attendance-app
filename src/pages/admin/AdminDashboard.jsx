import {
  useEffect,
  useState,
} from "react";

import {
  getAdminStats,
} from "../../services/dashboardService";

import Navbar from "../../components/Navbar";
import "./../css/CommonStyles.css";

export default function AdminDashboard() {

  const [stats,
    setStats] =
    useState(null);

  useEffect(() => {

    async function loadData() {

      const result =
        await getAdminStats();

      setStats(result);
    }

    loadData();

  }, []);

  if (!stats) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">

        <h1 className="dashboard-title">
          Admin Dashboard
        </h1>

        <div className="stats-grid">

          <div className="stat-card stat-card-1">
            <h3>Users</h3>
            <p>{stats.users}</p>
          </div>

          <div className="stat-card stat-card-2">
            <h3>Attendance Records</h3>
            <p>{stats.attendance}</p>
          </div>

          <div className="stat-card stat-card-3">
            <h3>Broadcast Messages</h3>
            <p>{stats.broadcasts}</p>
          </div>

        </div>

      </div>
    </div>
  );
}