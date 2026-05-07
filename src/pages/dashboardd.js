import React, { useState, useEffect } from "react";
import api from "../api/axiosClient";
import { VscDashboard } from "react-icons/vsc";

// --- Card Component ---
function Card({ title, value, color, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
        borderLeft: `6px solid ${color}`,
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <p style={{ fontSize: "14px", color: "#6b7280" }}>{title}</p>
      <h1 style={{ marginTop: "12px", fontSize: "34px", fontWeight: "700", color }}>{value}</h1>
    </div>
  );
}

// --- Dashboard Component ---
export default function Dashboard() {
  const [pasien, setPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    api.get("/pasien")
      .then((res) => {
        setPasien(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const totalPasien = pasien.length;
  const totalPerempuan = pasien.filter(
    (p) => p.jenis_kelamin === "Perempuan" || p.jenis_kelamin === "P"
  ).length;
  const totalLakiLaki = pasien.filter(
    (p) => p.jenis_kelamin === "Laki-laki" || p.jenis_kelamin === "L"
  ).length;
  const totalKunjunganHariIni = pasien.reduce((total, p) => {
    if (!p.kunjungan) return total;
    return total + p.kunjungan.filter((k) => k.tanggal === today).length;
  }, 0);

  if (loading) return <p>Loading...</p>;

  const getFilteredPasien = () => {
    if (!selectedCategory) return [];
    if (selectedCategory === "total") return pasien;
    if (selectedCategory === "perempuan")
      return pasien.filter((p) => p.jenis_kelamin === "Perempuan" || p.jenis_kelamin === "P");
    if (selectedCategory === "laki")
      return pasien.filter((p) => p.jenis_kelamin === "Laki-laki" || p.jenis_kelamin === "L");
    if (selectedCategory === "kunjungan")
      return pasien.filter((p) =>
        p.kunjungan?.some((k) => k.tanggal === today)
      );
    return [];
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Tulisan Dashboard dengan gradient + icon */}
      <h2 style={styles.title}>
        <VscDashboard style={styles.titleIcon} />
        Dashboard
      </h2>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "40px" }}>
        <Card title="Total Pasien" value={totalPasien} color="#4f46e5" onClick={() => setSelectedCategory("total")} />
        <Card title="Pasien Perempuan" value={totalPerempuan} color="#ec4899" onClick={() => setSelectedCategory("perempuan")} />
        <Card title="Pasien Laki-laki" value={totalLakiLaki} color="#0ea5e9" onClick={() => setSelectedCategory("laki")} />
        <Card title="Kunjungan Hari Ini" value={totalKunjunganHariIni} color="#22c55e" onClick={() => setSelectedCategory("kunjungan")} />
      </div>

      {/* Tabel Pasien */}
      {selectedCategory && (
        <div>
          <h3 style={{ marginBottom: "12px" }}>
            Daftar Pasien ({selectedCategory})
          </h3>
          <table style={tableStyle}>
            <thead style={theadStyle}>
              <tr>
                <th style={thStyle}>No</th>
                <th style={thStyle}>Nama</th>
                <th style={thStyle}>Jenis Kelamin</th>
                <th style={thStyle}>Tanggal Kunjungan Terakhir</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredPasien().map((p, idx) => (
                <tr
                  key={p.id}
                  style={idx % 2 === 0 ? rowEvenStyle : rowOddStyle}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#a7f3d0"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#d1fae5" : "#f0fdf4"}
                >
                  <td style={tdStyle}>{idx + 1}</td>
                  <td style={tdStyle}>{p.nama || "–"}</td>
                  <td style={tdStyle}>{p.jenis_kelamin}</td>
                  <td style={tdStyle}>
                    {p.kunjungan?.length
                      ? p.kunjungan[p.kunjungan.length - 1].tanggal
                      : "–"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// --- Styles ---
const styles = {
  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "50px",
    background: "linear-gradient(90deg, #078368, #17a2b8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
  },
  titleIcon: {
    fontSize: "36px",
    color: "#078368",
  },
};

// Tabel styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  borderRadius: "12px",
  overflow: "hidden",
};
const theadStyle = {
  background: "linear-gradient(90deg, #078368, #17a2b8)", // header gradient
  color: "#fff",
};

const thStyle = { padding: "12px 10px", textAlign: "left" };
const tdStyle = { padding: "10px" };
const rowEvenStyle = { backgroundColor: "#d1fae5" };
const rowOddStyle = { backgroundColor: "#f0fdf4" };
