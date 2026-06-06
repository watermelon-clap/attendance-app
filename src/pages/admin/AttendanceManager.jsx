import { useEffect, useState } from "react";

import "./../css/CommonStyles.css";

import Navbar from "../../components/Navbar";

import {
  getAttendanceByDate,
  updateAttendance,
} from "../../services/attendanceService";

export default function AttendanceManager() {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [date, setDate] =
    useState(today);

  const [records, setRecords] =
    useState([]);

  const [editedRecords, setEditedRecords] =
    useState({});

  async function loadData() {
    try {
      const data =
        await getAttendanceByDate(
          date
        );

      setRecords(data || []);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    loadData();
  }, [date]);

  function updateField(
    recordId,
    field,
    value
  ) {
    setEditedRecords((prev) => ({
      ...prev,
      [recordId]: {
        ...prev[recordId],
        [field]: value,
      },
    }));
  }

  async function handleSave(
    record
  ) {
    try {
      const changes =
        editedRecords[
          record.id
        ] || {};

      if (
        Object.keys(changes)
          .length === 0
      ) {
        alert(
          "No changes to save"
        );
        return;
      }

      await updateAttendance(
        record.id,
        changes
      );

      setEditedRecords(
        (prev) => {
          const copy = {
            ...prev,
          };

          delete copy[
            record.id
          ];

          return copy;
        }
      );

      await loadData();

      alert(
        "Attendance updated successfully"
      );
    } catch (err) {
      alert(err.message);
    }
  }

return (
  <div className="attendance-manager-page">

    <Navbar />

    <div className="attendance-manager-container">

      <h1 className="page-title">
        Attendance Manager
      </h1>

      <div className="date-filter-card">

        <label>
          Select Date
        </label>

        <input
          className="date-input"
          type="date"
          value={date}
          onChange={(e) =>
            setDate(
              e.target.value
            )
          }
        />

      </div>

  <div className="table-wrapper">

    <table className="attendance-manager-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Entry Time</th>
            <th>Exit Time</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {records.length ===
          0 ? (
            <tr>
              <td
                colSpan="7"
              >
                No attendance
                records found
              </td>
            </tr>
          ) : (
            records.map(
              (record) => (
                <tr
                  key={
                    record.id
                  }
                >
                  <td>
                    {
                      record
                        .profiles
                        ?.full_name
                    }
                  </td>

                  <td>
                    {
                      record.attendance_date
                    }
                  </td>

                  <td>
                    <input
                      className="table-input"
                      type="time"
                      value={
                        editedRecords[
                          record.id
                        ]
                          ?.entry_time ??
                        record.entry_time?.slice(
                          0,
                          5
                        ) ??
                        ""
                      }
                      onChange={(
                        e
                      ) =>
                        updateField(
                          record.id,
                          "entry_time",
                          e.target
                            .value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      className="table-input"
                      type="time"
                      value={
                        editedRecords[
                          record.id
                        ]
                          ?.exit_time ??
                        record.exit_time?.slice(
                          0,
                          5
                        ) ??
                        ""
                      }
                      onChange={(
                        e
                      ) =>
                        updateField(
                          record.id,
                          "exit_time",
                          e.target
                            .value
                        )
                      }
                    />
                  </td>

                  <td>
                    <select
                      className="table-select"
                      value={
                        editedRecords[
                          record.id
                        ]
                          ?.status ??
                        record.status
                      }
                      onChange={(
                        e
                      ) =>
                        updateField(
                          record.id,
                          "status",
                          e.target
                            .value
                        )
                      }
                    >
                      <option value="Present">
                        Present
                      </option>

                      <option value="Absent">
                        Absent
                      </option>

                      <option value="Leave">
                        Leave
                      </option>

                      <option value="Half Day">
                        Half Day
                      </option>
                    </select>
                  </td>

                  <td>
                    <input
                      className="table-input"
                      type="text"
                      value={
                        editedRecords[
                          record.id
                        ]
                          ?.remarks ??
                        record.remarks ??
                        ""
                      }
                      onChange={(
                        e
                      ) =>
                        updateField(
                          record.id,
                          "remarks",
                          e.target
                            .value
                        )
                      }
                    />
                  </td>

                  <td>
                    <button
                    className="primary-btn"
                      onClick={() =>
                        handleSave(
                          record
                        )
                      }
                    >
                      Save
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
      </div>

      <div className="attendance-mobile-list">

        {records.map((record) => (

          <div
            key={record.id}
            className="attendance-card"
          >

            <h3>
              {record.profiles?.full_name}
            </h3>

            <p>
              {record.attendance_date}
            </p>

            <input
              className="table-input"
              type="time"
              value={
                editedRecords[
                  record.id
                ]
                  ?.entry_time ??
                record.entry_time?.slice(
                  0,
                  5
                ) ??
                ""
              }
              onChange={(
                e
              ) =>
                updateField(
                  record.id,
                  "entry_time",
                  e.target
                    .value
                )
              }
            />
          
            <input
              className="table-input"
              type="time"
              value={
                editedRecords[
                  record.id
                ]
                  ?.exit_time ??
                record.exit_time?.slice(
                  0,
                  5
                ) ??
                ""
              }
              onChange={(
                e
              ) =>
                updateField(
                  record.id,
                  "exit_time",
                  e.target
                    .value
                )
              }
            />
          
            <select
              className="table-select"
              value={
                editedRecords[
                  record.id
                ]
                  ?.status ??
                record.status
              }
              onChange={(
                e
              ) =>
                updateField(
                  record.id,
                  "status",
                  e.target
                    .value
                )
              }
            >
              <option value="Present">
                Present
              </option>

              <option value="Absent">
                Absent
              </option>

              <option value="Leave">
                Leave
              </option>

              <option value="Half Day">
                Half Day
              </option>
            </select>
          
            <input
              className="table-input"
              type="text"
              value={
                editedRecords[
                  record.id
                ]
                  ?.remarks ??
                record.remarks ??
                ""
              }
              onChange={(
                e
              ) =>
                updateField(
                  record.id,
                  "remarks",
                  e.target
                    .value
                )
              }
            />
            <button
              className="primary-btn"
              onClick={() =>
                handleSave(record)
              }
            >
              Save
            </button>

          </div>

        ))}

      </div>
    </div>

    </div>
  );
}