import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";
import { FaHospitalUser } from "react-icons/fa";
import { VscSearch } from "react-icons/vsc";

export default function PasienList() {
  const [pasiens, setPasiens] = useState([]);
  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [notif, setNotif] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const role = localStorage.getItem("role");
  const fetchPasien = async () => {
    const res = await axiosClient.get(`/pasien?page=${page}&search=${search}`);

    setPasiens(res.data.data);
    setLastPage(res.data.last_page);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchPasien();
  }, [page, search]);

  const openDeleteConfirm = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosClient.delete("/pasien/" + selectedId);
      setPasiens(pasiens.filter((p) => p.id !== selectedId));
      setShowConfirm(false);
      setNotif("Data pasien berhasil dihapus");
      setTimeout(() => setNotif(""), 1500);
    } catch (err) {
      setShowConfirm(false);
      setNotif("Gagal menghapus data");
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* NOTIF */}
      {notif && (
        <div style={overlayStyle}>
          <div style={notifBoxStyle}>{notif}</div>
        </div>
      )}
      {/* MODAL KONFIRMASI DELETE */}
      {showConfirm && (
        <div style={overlayStyle}>
          <div style={confirmBoxStyle}>
            <p>Yakin ingin menghapus data pasien ini?</p>
            <div style={{ marginTop: "15px" }}>
              <button style={cancelBtn} onClick={() => setShowConfirm(false)}>
                Batal
              </button>
              <button style={deleteBtnModal} onClick={confirmDelete}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      {/* HEADER TITLE + SEARCH */}
      <div style={styles.headerRow}>
        <h1 style={styles.title}>
          <FaHospitalUser style={styles.titleIcon} /> Data Pasien
        </h1>

        <div style={styles.searchWrapper}>
          <div style={styles.searchBox}>
            <div style={styles.iconCircle}>
              <VscSearch style={styles.searchIcon} />
            </div>
            <input
              type="text"
              placeholder="Cari pasien berdasarkan nama atau NIK..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              style={styles.searchInput}
            />
          </div>
        </div>
      </div>
      {/* TABLE */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nama</th>
              <th style={styles.th}>NIK</th>
              <th style={styles.th}>Jenis Kelamin</th>
              <th style={styles.th}>Tanggal Lahir</th>
              <th style={styles.th}>Golongan Darah</th>
              <th style={styles.th}>Alamat</th>
              <th style={styles.th}>No Telepon</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pasiens.map((p, index) => (
              <tr
                key={p.id}
                style={{
                  background: index % 2 === 0 ? "#f9f9f9" : "#fff",
                }}
              >
                <td style={styles.td}>{p.nama}</td>
                <td style={styles.td}>{p.nik}</td>
                <td style={styles.td}>{p.jenis_kelamin}</td>
                <td style={styles.td}>{p.tanggal_lahir}</td>
                <td style={styles.td}>{p.golongan_darah}</td>
                <td style={styles.td}>{p.alamat}</td>
                <td style={styles.td}>{p.no_telepon}</td>
                <td style={styles.td}>
                  <Link style={styles.detailBtn} to={`/app/pasien/detail/${p.id}`}>
                    Detail
                  </Link>

                  {role === "admin" && (
                    <button style={styles.deleteBtn} onClick={() => openDeleteConfirm(p.id)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {pasiens.length === 0 && (
              <tr>
                <td colSpan={8} style={styles.noData}>
                  Tidak ada pasien ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span>
          Halaman {page} dari {lastPage}
        </span>

        <button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

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
  fontWeight: "600",
  fontSize: "16px",
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

const styles = {
  wrapper: {
    padding: "15px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    width: "100%",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "linear-gradient(90deg, #078368, #17a2b8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  titleIcon: {
    fontSize: "36px",
    color: "#078368",
  },
  searchWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: "20px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    maxWidth: "900px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    padding: "5px 10px",
  },
  iconCircle: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#729fae",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10px",
  },
  searchIcon: {
    fontSize: "15px",
    color: "#fff",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "10px 0",
    fontSize: "14px",
  },
  tableWrapper: {
    overflowX: "auto",
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  },
  th: {
    padding: "12px 10px",
    fontSize: "14px",
    borderBottom: "2px solid #007bff",
    borderRight: "1px solid #ddd",
    background: "linear-gradient(90deg, #078368, #06352d)",
    color: "#fff",
    textAlign: "left",
  },
  td: {
    padding: "12px 10px",
    borderBottom: "1px solid #ddd",
    borderRight: "1px solid #ddd",
    fontSize: "14px",
    color: "#333",
  },
  detailBtn: {
    marginRight: "10px",
    padding: "6px 12px",
    borderRadius: "8px",
    background: "#17a2b8",
    color: "#fff",
    cursor: "pointer",
    border: "none",
    fontWeight: "600",
    textDecoration: "none",
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
  noData: {
    textAlign: "center",
    padding: "20px",
    fontStyle: "italic",
    color: "#555",
  },
};
