import {
  useEffect,
  useState,
} from "react";

import { useAuth }
  from "../context/AuthContext";

import { getDashboardSummary }
  from "../services/dashboardService";

import { getBroadcasts }
  from "../services/broadcastService";

import Navbar from "../components/Navbar";

export default function UserDashboard() {

  const { profile } =
    useAuth();

  const [summary,
    setSummary] =
    useState(null);

  const [broadcasts,
    setBroadcasts] =
    useState([]);

  useEffect(() => {

    async function loadData() {

      const dashboard =
        await getDashboardSummary(
          profile.id
        );

      const messages =
        await getBroadcasts();

      setSummary(
        dashboard
      );

      setBroadcasts(
        messages.slice(0, 5)
      );
    }

    if (profile) {
      loadData();
    }

  }, [profile]);

  return (
  <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">

        <h1 className="dashboard-title">
          Welcome, {profile?.full_name}
        </h1>

        {summary && (
          <>
            <h2 className="section-title">
              Attendance Summary
            </h2>

            <div className="stats-grid">

              <div className="stat-card stat-card-1">
                <h3>Total Days</h3>
                <p>{summary.totalDays}</p>
              </div>

              <div className="stat-card stat-card-2">
                <h3>Present</h3>
                <p>{summary.presentDays}</p>
              </div>

              <div className="stat-card stat-card-3">
                <h3>Attendance %</h3>
                <p>{summary.percentage}%</p>
              </div>

            </div>
          </>
        )}

        <h2 className="section-title">
          Recent Announcements
        </h2>

        <div className="announcements-grid">

          {broadcasts.length === 0 ? (
            <div className="announcement-card">
              No announcements available.
            </div>
          ) : (
            broadcasts.map((item) => (
              <div
                key={item.id}
                className="announcement-card"
              >
                <h4>{item.title}</h4>

                <p className="broadcast-message">{item.message}</p>

                <span className="announcement-date">
                  {new Date(
                    item.created_at
                  ).toLocaleDateString()}
                </span>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}