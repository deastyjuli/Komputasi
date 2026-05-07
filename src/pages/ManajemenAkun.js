import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { FaUser, FaUserShield, FaUsers } from "react-icons/fa"; // icon untuk user/admin dan title
import { MdEdit } from "react-icons/md"; // icon untuk edit role

export default function ManajemenAkun() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [notif, setNotif] = useState("");

  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data akun");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await axios.patch(`${API_URL}/users/${id}/role`, { role });
      fetchUsers();
    } catch {
      alert("Gagal mengubah role");
    }
  };

  const openDeleteConfirm = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/users/${selectedId}`);
      setUsers(users.filter((u) => u.id !== selectedId));
      setShowConfirm(false);
      setNotif("Akun berhasil dihapus");
      setTimeout(() => setNotif(""), 1500);
    } catch {
      setShowConfirm(false);
      setNotif("Gagal menghapus akun");
      setTimeout(() => setNotif(""), 1500);
    }
  };

  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  if (!savedUser?.id) return <Navigate to="/login" />;

  if (loading) return <p>Loading data...</p>;

  return (
    <div style={styles.container}>
      {/* NOTIF */}
      {notif && (
        <div style={styles.overlay}>
          <div style={styles.notifBox}>{notif}</div>
        </div>
      )}

      {/* MODAL KONFIRMASI DELETE */}
      {showConfirm && (
        <div style={styles.overlay}>
          <div style={styles.confirmBox}>
            <p>Yakin ingin menghapus akun ini?</p>
            <div style={{ marginTop: "15px" }}>
              <button style={styles.cancelBtn} onClick={() => setShowConfirm(false)}>
                Batal
              </button>
              <button style={styles.deleteBtnModal} onClick={confirmDelete}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 style={styles.title}>
        <FaUsers style={styles.titleIcon} />
        Manajemen Akun
      </h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Nama</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Ubah Role</th>
              {savedUser.role === "admin" && <th style={styles.th}>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d0f0eb")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "#f6fafa" : "#e0f4f1")
                }
              >
                <td style={styles.td}>
                  <FaUser style={{ marginRight: "6px", color: "#078368" }} />
                  {user.name}
                </td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.roleBadge,
                      backgroundColor: user.role === "admin" ? "#078368" : "#17a2b8",
                    }}
                  >
                    {user.role === "admin" ? (
                      <FaUserShield style={{ marginRight: "5px" }} />
                    ) : (
                      <FaUser style={{ marginRight: "5px" }} />
                    )}
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td style={styles.td}>
                  <MdEdit style={{ marginRight: "5px", verticalAlign: "middle" }} />
                  <select
                    style={styles.select}
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                {savedUser.role === "admin" && (
                  <td style={styles.td}>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => openDeleteConfirm(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Styles ---
const styles = {
  container: {
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  notifBox: {
    background: "#fff",
    padding: "20px 30px",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "16px",
    textAlign: "center",
  },
  confirmBox: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
    maxWidth: "300px",
  },
  cancelBtn: {
    padding: "6px 14px",
    marginRight: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  deleteBtnModal: {
    padding: "6px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#dc3545",
    color: "#fff",
    cursor: "pointer",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "20px",
    marginTop: "10px",
    alignItems: "center",
    gap: "8px",
    display: "inline-flex",
    background: "linear-gradient(90deg, #078368, #17a2b8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  titleIcon: {
    fontSize: "36px",
    color: "#078368",
    marginRight: "6px",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    border: "1px solid #e0f2f1",
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px",
  },
  thead: {
    backgroundColor: "#078368",
    color: "#fff",
  },
  th: {
    padding: "14px 12px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "15px",
  },
  td: {
    padding: "12px 10px",
    fontSize: "14px",
    color: "#333",
    verticalAlign: "middle",
  },
  rowEven: {
    backgroundColor: "#f6fafa",
    transition: "all 0.2s ease",
  },
  rowOdd: {
    backgroundColor: "#e0f4f1",
    transition: "all 0.2s ease",
  },
  select: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
  roleBadge: {
    padding: "4px 10px",
    borderRadius: "12px",
    color: "#fff",
    fontWeight: "600",
    fontSize: "13px",
    textAlign: "center",
    display: "inline-flex",
    alignItems: "center",
  },
  deleteBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    background: "#dc3545",
    color: "#fff",
    cursor: "pointer",
    border: "none",
    fontWeight: "600",
  },
};
