import { useEffect, useState } from "react";

import {
  getUsers,
  activateUser,
  deactivateUser,
} from "../../services/userService";

import "./../css/CommonStyles.css";
import Navbar from "../../components/Navbar";

export default function ManageUsers() {
  const [users, setUsers] =
    useState([]);

  async function loadUsers() {
    const data =
      await getUsers();

    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

return (
  <div className="user-management-page">

    <Navbar />

    <div className="user-management-container">

      <h1 className="page-title">
        User Management
      </h1>

      <div className="table-wrapper">

        <table className="user-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {users
              .filter(
                (user) =>
                  user.role !== "admin"
              )
              .map((user) => (
                <tr key={user.id}>

                  <td>
                    {user.full_name}
                  </td>

                  <td>
                    {user.username}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        user.is_active
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {user.is_active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td>
                    {user.is_active ? (
                      <button
                        className="delete-btn"
                        onClick={async () => {
                          await deactivateUser(
                            user.id
                          );
                          loadUsers();
                        }}
                      >
                        Disable
                      </button>
                    ) : (
                      <button
                        className="primary-btn"
                        onClick={async () => {
                          await activateUser(
                            user.id
                          );
                          loadUsers();
                        }}
                      >
                        Activate
                      </button>
                    )}
                  </td>

                </tr>
              ))}

          </tbody>

        </table>


        </div>
        <div className="mobile-user-list">

          {users
            .filter(
              (user) =>
                user.role !== "admin"
            )
            .map((user) => (
              <div
                key={user.id}
                className="user-card"
              >

                <h3>
                  {user.full_name}
                </h3>

                <p>
                  @{user.username}
                </p>

                <div className="user-status-row">
                  <span
                  className={`status-badge ${
                    user.is_active
                      ? "active"
                      : "inactive"
                  }`}
                >
                  {user.is_active
                    ? "Active"
                    : "Inactive"}
                </span>
                {user.is_active ? (
                      <button
                        className="delete-btn"
                        onClick={async () => {
                          await deactivateUser(
                            user.id
                          );
                          loadUsers();
                        }}
                      >
                        Disable
                      </button>
                    ) : (
                      <button
                        className="user-primary-btn"
                        onClick={async () => {
                          await activateUser(
                            user.id
                          );
                          loadUsers();
                        }}
                      >
                        Activate
                      </button>
                    )}

                </div>
              </div>
            ))}

      </div>

    </div>

  </div>
);
}