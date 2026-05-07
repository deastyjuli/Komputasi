import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

export default function KunjunganList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [notif, setNotif] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchKunjungan();
  }, [id]);

  const fetchKunjungan = async () => {
    try {
      const res = await axiosClient.get(`/pasien/${id}/kunjungan`);
      const data = Array.isArray(res.data) ? res.data : [];
      const sorted = data.sort(
        (a, b) =>
          new Date(b.tanggal_kunjungan) - new Date(a.tanggal_kunjungan)
      );
      setItems(sorted);
    } catch (err) {
      // ❗ jangan tampilkan notif error di sini
      console.warn("Fetch kunjungan gagal");
    }
  };

  const showNotif = (message) => {
    setNotif(message);
    setTimeout(() => setNotif(""), 1500);
  };

  const openDeleteConfirm = (kunjunganId) => {
    setSelectedId(kunjunganId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosClient.delete(
        `/pasien/${id}/kunjungan/${selectedId}`
      );

      // ✅ HAPUS LANGSUNG DARI STATE (INI KUNCI UTAMA)
      setItems((prev) => prev.filter((k) => k.id !== selectedId));

      setShowConfirm(false);
      showNotif("Data kunjungan berhasil dihapus");
    } catch (err) {
      setShowConfirm(false);
      showNotif("Gagal menghapus data ");
    }
  };

  return (
    <>
      {/* NOTIF */}
      {notif && (
        <div style={overlayStyle}>
          <div style={notifBoxStyle}>{notif}</div>
        </div>
      )}

      {/* KONFIRMASI DELETE */}
      {showConfirm && (
        <div style={overlayStyle}>
          <div style={confirmBoxStyle}>
            <p>Yakin ingin menghapus data kunjungan ini?</p>
            <div style={{ marginTop: "15px" }}>
              <button
                style={cancelBtn}
                onClick={() => setShowConfirm(false)}
              >
                Batal
              </button>
              <button
                style={deleteBtnModal}
                onClick={confirmDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={styles.wrapper}>
        <button
          style={styles.backBtn}
          onClick={() => navigate(`/app/pasien/detail/${id}`)}
        >
          &larr; Kembali
        </button>

        <div style={styles.header}>
          <h2 style={styles.title}>Riwayat Pemeriksaan</h2>
          <p style={styles.total}>Total Kunjungan: {items.length}</p>
        </div>

        <div style={styles.tableScroll}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Tanggal</th>
                <th style={styles.th}>Keluhan</th>
                <th style={styles.th}>Diagnosa</th>
                <th style={styles.th}>Tindakan</th>
                {role === "admin" && <th style={styles.th}>Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((k, index) => (
                  <tr
                    key={k.id}
                    style={index % 2 === 0 ? styles.trEven : styles.trOdd}
                  >
                    <td style={styles.td}>{k.tanggal_kunjungan}</td>
                    <td style={styles.td}>{k.keluhan}</td>
                    <td style={styles.td}>{k.diagnosa}</td>
                    <td style={styles.td}>{k.tindakan}</td>

                    {role === "admin" && (
                      <td style={styles.td}>
                        <button
                          style={styles.editBtn}
                          onClick={() =>
                            navigate(
                              `/app/pasien/${id}/kunjungan/edit/${k.id}`
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          style={styles.deleteBtn}
                          onClick={() => openDeleteConfirm(k.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={role === "admin" ? 5 : 4}
                    style={styles.noData}
                  >
                    Belum ada data kunjungan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ================= MODAL & NOTIF STYLE ================= */

const overlayStyle = {
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
};

const notifBoxStyle = {
  background: "#fff",
  padding: "20px 30px",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "600",
  textAlign: "center",
};

const confirmBoxStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  textAlign: "center",
  maxWidth: "300px",
};

const cancelBtn = {
  padding: "6px 14px",
  marginRight: "10px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

const deleteBtnModal = {
  padding: "6px 14px",
  borderRadius: "8px",
  border: "none",
  background: "#dc3545",
  color: "#fff",
  cursor: "pointer",
};

/* ================= TABLE STYLE ================= */

const styles = {
  wrapper: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    height: "calc(100vh - 60px)",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#083b34",
  },
  total: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#083b34",
  },
  backBtn: {
    padding: "10px 20px",
    borderRadius: "12px",
    border: "none",
    background: "#42929e",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "20px",
  },
  tableScroll: {
    overflowX: "auto",
    maxHeight: "70vh",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    minWidth: "700px",
    borderCollapse: "separate",
  },
  th: {
    background: "linear-gradient(90deg, #078368, #06352d)",
    color: "#fff",
    padding: "14px",
  },
  trEven: { background: "#f2f7f7" },
  trOdd: { background: "#fff" },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e0e0e0",
  },
  editBtn: {
    marginRight: "10px",
    padding: "6px 12px",
    borderRadius: "8px",
    background: "#17a2b8",
    color: "#fff",
    border: "none",
  },
  deleteBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    fontStyle: "italic",
  },
};
