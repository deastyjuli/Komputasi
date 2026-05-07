import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useParams, useNavigate } from "react-router-dom";

export default function PasienDetail() {
  const { id } = useParams();
  const [pasien, setPasien] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    axiosClient.get(`/pasien/${id}`).then((res) => {
      setPasien(res.data);
    });
  }, [id]);

  if (!pasien) return <p>Loading...</p>;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Detail Pasien</h1>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.patientName}>{pasien.nama}</h2>
          {role === "admin" && (
            <button
              style={styles.editBtn}
              onClick={() => navigate(`/app/pasien/edit/${id}`)}
            >
              Edit
            </button>
          )}
        </div>

        <div style={styles.infoGrid}>
          {[
            { label: "NIK", value: pasien.nik },
            { label: "Jenis Kelamin", value: pasien.jenis_kelamin },
            { label: "Tanggal Lahir", value: pasien.tanggal_lahir },
            { label: "Golongan Darah", value: pasien.golongan_darah },
            { label: "Alamat", value: pasien.alamat },
            { label: "No Telepon", value: pasien.no_telepon },
            { label: "Riwayat Penyakit", value: pasien.riwayat_penyakit },
            { label: "Alergi Obat", value: pasien.alergi_obat },
            { label: "Telepon Kontak Darurat", value: pasien.telepon_kontak_darurat },
          ].map((item, index) => (
            <div style={styles.row} key={index}>
              <span style={styles.label}>{item.label}</span>
              <span style={styles.labelTitik}>:</span>
              <span style={styles.value}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.backBtn} onClick={() => navigate("/app/pasien")}>
          &larr; Kembali
        </button>
        <div style={styles.buttonGroup}>
          <button
            style={styles.actionBtn}
            onClick={() => navigate(`/app/pasien/${id}/kunjungan`)}
          >
            Lihat Kunjungan
          </button>
          <button
            style={styles.actionBtnPrimary}
            onClick={() => navigate(`/app/pasien/${id}/kunjungan/tambah`)}
          >
            Tambah Kunjungan
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
    minHeight: "90vh",
    overflowY: "auto",
    background: "#f4f8f8",
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "30px",
    background: "linear-gradient(90deg, #007bff, #00c6ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  },
  card: {
    background: "linear-gradient(135deg, #ffffff, #d7f0ee)",
    padding: "50px 40px",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "950px",
    margin: "0 auto 50px auto",
    boxSizing: "border-box",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #007bff",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  patientName: {
    color: "#007bff",
    fontSize: "24px",
    margin: 0,
    fontWeight: "700",
  },
  editBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s",
  },
  infoGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  row: {
    display: "flex",
    gap: "10px",
  },
  label: {
    fontWeight: "600",
    color: "#083b34",
    width: "180px",
    textAlign: "left",
  },
  labelTitik: {
    width: "10px",
    textAlign: "center",
    fontWeight: "600",
    color: "#083b34",
  },
  value: {
    flex: 1,
    color: "#333",
    wordBreak: "break-word",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
  },
  backBtn: {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#078368ff",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
  actionBtn: {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "1px solid #007bff",
    background: "#fff",
    color: "#007bff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
  actionBtnPrimary: {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#078368ff",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
};
