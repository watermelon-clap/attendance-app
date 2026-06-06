import {
  useEffect,
  useState
} from "react";

import {
  getBroadcasts
} from "../services/broadcastService";

import Navbar from "../components/Navbar";

export default function Broadcasts() {

  const [messages,
    setMessages] =
    useState([]);

  async function loadData() {

    const data =
      await getBroadcasts();

    setMessages(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="dashboard-page">

      <Navbar />

      <div className="dashboard-container">

        <h1 className="dashboard-title">
          Announcements
        </h1>

        {messages.length === 0 ? (
          <div className="empty-card">
            No announcements available.
          </div>
        ) : (

          <div className="announcements-grid">

            {messages.map((item) => (

              <div
                key={item.id}
                className="announcement-card"
              >

                <div className="announcement-header">

                  <h3>
                    {item.title}
                  </h3>

                  <span className="announcement-date">
                    {new Date(
                      item.created_at
                    ).toLocaleDateString()}
                  </span>

                </div>

                <p className="announcement-message">
                  {item.message}
                </p>

                <small className="announcement-time">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </small>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}