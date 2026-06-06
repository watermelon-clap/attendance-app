import {
  useEffect,
  useState,
} from "react";

import {
  getAttendanceReport,
} from "../../services/attendanceService";

import "./../css/CommonStyles.css";

import Navbar from "../../components/Navbar";

export default function AttendanceReports() {

  const [report,
    setReport] =
    useState([]);

  useEffect(() => {

    async function loadData() {

      const data =
        await getAttendanceReport();

      setReport(data);
    }

    loadData();

  }, []);

  return (
    <div>
    <Navbar />
      <h1>
        Attendance Report
      </h1>

      <table border="1">

        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
            <th>Entry</th>
            <th>Exit</th>
          </tr>
        </thead>

        <tbody>

          {report.map(
            (item) => (
              <tr key={item.id}>
                <td>
                  {
                    item.profiles
                      ?.full_name
                  }
                </td>

                <td>
                  {
                    item.attendance_date
                  }
                </td>

                <td>
                  {item.status}
                </td>

                <td>
                  {
                    item.entry_time
                  }
                </td>

                <td>
                  {
                    item.exit_time
                  }
                </td>
              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}