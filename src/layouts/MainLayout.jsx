import { Link }
  from "react-router-dom";

import LogoutButton
  from "../components/LogoutButton";

export default function MainLayout({
  children,
}) {
  return (
    <>
      <nav>
        <Link to="/dashboard">
          Dashboard
        </Link>

        {" | "}

        <Link to="/attendance">
          Attendance
        </Link>

        {" | "}

        <Link to="/broadcasts">
          Messages
        </Link>

        {" | "}

        <LogoutButton />
      </nav>

      <hr />

      {children}
    </>
  );
}