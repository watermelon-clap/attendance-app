import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  getUserAttendance,
} from "../services/attendanceService";

import {
  calculateHours,
} from "../utils/timeUtils";

import Navbar from "../components/Navbar";

export default function AttendanceHistory() {
  const { profile } = useAuth();

  const [records, setRecords] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getUserAttendance(
            profile.id
          );

        setRecords(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (profile) {
      load();
    }
  }, [profile]);

  if (loading) {
    return <p>Loading attendance...</p>;
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">

        <h1 className="dashboard-title">
          Attendance History
        </h1>

        {records.length === 0 ? (
          <div className="empty-card">
            No attendance records found.
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="table-wrapper desktop-only">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Entry Time</th>
                    <th>Exit Time</th>
                    <th>Status</th>
                    <th>Total Hours</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td>{record.attendance_date}</td>
                      <td>{record.entry_time}</td>
                      <td>{record.exit_time}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            record.status
                              ?.toLowerCase()
                              .replace(/\s+/g, "-")
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td>
                        {calculateHours(
                          record.entry_time,
                          record.exit_time
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="mobile-attendance-list">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="attendance-card"
                >
                  <div className="attendance-card-header">
                    <strong>
                      {record.attendance_date}
                    </strong>

                    <span
                      className={`status-badge ${
                        record.status
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>

                  <div className="attendance-detail">
                    <span>Entry</span>
                    <strong>
                      {record.entry_time || "-"}
                    </strong>
                  </div>

                  <div className="attendance-detail">
                    <span>Exit</span>
                    <strong>
                      {record.exit_time || "-"}
                    </strong>
                  </div>

                  <div className="attendance-detail">
                    <span>Total Hours</span>
                    <strong>
                      {calculateHours(
                        record.entry_time,
                        record.exit_time
                      )}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}