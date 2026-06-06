import { useState, useEffect } from "react";

import { useAuth }
  from "../../context/AuthContext";

import "./../css/BroadcastManager.css";
import "./../css/CommonStyles.css";

import {
  createBroadcast,
  getBroadcasts,
  deleteBroadcast
} from "../../services/broadcastService";

import Navbar from "../../components/Navbar";

export default function BroadcastManager() {

  const { profile } =
    useAuth();

    const [broadcasts, setBroadcasts] = useState([]);

const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
      title: "",
      message: "",
    });


  async function loadBroadcasts() {
    const data =
      await getBroadcasts();

    setBroadcasts(data);
  }

  useEffect(() => {
    loadBroadcasts();
  }, []);

    async function handleSubmit( e ) {
    e.preventDefault();

    try {
      await createBroadcast({
        title: form.title,
        message: form.message,
      });

      setForm({
        title: "",
        message: "",
      });

      setShowModal(false);

      loadBroadcasts();

    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    const confirmed =
      window.confirm(
        "Delete this broadcast?"
      );

    if (!confirmed) return;

    try {
      await deleteBroadcast(id);

      loadBroadcasts();

    } catch (err) {
      alert(err.message);
    }
  }



  return (
    <div className="broadcast-page">
      <Navbar />

      <div className="broadcast-header">
        <h2 className="page-title">
          Broadcast Management
        </h2>

        <button
          className="primary-btn"
          onClick={() =>
            setShowModal(true)
          }
        >
          New Broadcast
        </button>
      </div>

      {broadcasts.length === 0 ? (
  <div className="empty-card">
    No broadcasts found
  </div>
) : (
  <>
    {/* Desktop Table */}
      <div className="table-wrapper desktop-only">
        <table className="broadcast-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {broadcasts.map((broadcast) => (
              <tr key={broadcast.id}>
                <td>{broadcast.title}</td>

                <td className="broadcast-message">
                  {broadcast.message}
                </td>

                <td>
                  {new Date(
                    broadcast.created_at
                  ).toLocaleDateString()}
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        broadcast.id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="mobile-broadcast-list">
        {broadcasts.map((broadcast) => (
          <div
            key={broadcast.id}
            className="broadcast-card"
          >
            <div className="broadcast-card-header">
              <h3>
                {broadcast.title}
              </h3>

              <span className="broadcast-date">
                {new Date(
                  broadcast.created_at
                ).toLocaleDateString()}
              </span>
            </div>

            <p className="broadcast-message">
              {broadcast.message}
            </p>

            <button
              className="delete-btn"
              onClick={() =>
                handleDelete(
                  broadcast.id
                )
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  )}

      {showModal && (
        <div
          className="modal-overlay"
        >
          <div
            className="modal-content"
          >
            <h3>
              Create Broadcast
            </h3>

            <form
              onSubmit={
                handleSubmit
              }
            >
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <br />
              <br />

              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <br />
              <br />

              <div className="modal-actions">
                <button
                  type="submit"
                  className="primary-btn"
                >
                  Save
                </button>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}