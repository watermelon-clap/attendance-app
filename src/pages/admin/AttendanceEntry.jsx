import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import { getUsers } from "../../services/userService";

import { createAttendance } from "../../services/attendanceService";
import "./../css/CommonStyles.css";
import Navbar from "../../components/Navbar";


export default function AttendanceEntry() {
  const [users, setUsers] = useState([]);

  const [form, setForm] =
  useState({
    user_id: "",
    attendance_date: "",
    entry_time: "",
    exit_time: null,
    status: "Present",
    remarks: "",
  });

  const { profile } = useAuth();

  useEffect(() => {
    async function loadUsers() {
      const data = await getUsers();

      setUsers(
        data.filter(
          (u) => u.role !== "admin"
        )
      );
    }

    loadUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.user_id) {
      alert("Please select a user");
      return;
    }
    
    try {
      await createAttendance({
        ...form,
        created_by: profile.id,
      });

      alert("Attendance saved");

      setForm({
        user_id: "",
        attendance_date: "",
        entry_time: null,
        exit_time: null,
        status: "Present",
        remarks: "",
      });

    } catch (err) {
      alert(err.message);
    }
  }

  return (
  <div className="attendance-entry-page">

    <Navbar />

    <div className="attendance-entry-container">

      <div className="attendance-entry-card">

        <h1 className="page-title">
          Attendance Entry
        </h1>

      <form className="attendance-form" onSubmit={handleSubmit}>
        <label>User</label>
        <select
          required
          className="form-control"
          value={form.user_id}
          onChange={(e) =>
            setForm({
              ...form,
              user_id: e.target.value,
            })
          }
        >
          <option disabled value="">
            Select User
          </option>

          {users.map((u) => (
            <option
              key={u.id}
              value={u.id}
            >
              {u.full_name}
            </option>
          ))}
        </select>

        <label>Date</label>

        <input
          className="form-control"
          type="date"
          value={form.attendance_date}
          onChange={(e) =>
            setForm({
              ...form,
              attendance_date:
                e.target.value,
            })
          }
        />

        <label>Entry Time</label>

        <input
          className="form-control"
          type="time"
          required
          value={form.entry_time}
          onChange={(e) =>
            setForm({
              ...form,
              entry_time:
                e.target.value,
            })
          }
        />

        <label>Exit Time</label>

        <input
          className="form-control"
          type="time"
          value={form.exit_time || ""}
          onChange={(e) =>
            setForm({
              ...form,
              exit_time: e.target.value || null,
            })
          }
        />

        <br /><br />

        <select
          className="form-control"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status:
                e.target.value,
            })
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

        <br /><br />

        <textarea
          className="form-control remarks-box"
          placeholder="Remarks"
          value={form.remarks}
          onChange={(e) =>
            setForm({
              ...form,
              remarks:
                e.target.value,
            })
          }
        />

        <br /><br />

        <button className="user-primary-btn save-btn" type="submit">
          Save Attendance
        </button>

      </form>
    </div>

    </div>

  </div>
  );
}