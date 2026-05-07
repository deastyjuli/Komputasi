import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import layoutLogo from "../Image/Layout.jpg";
import { FaHome, FaUserInjured, FaPlus, FaUsers } from "react-icons/fa";

export default function Layout() {
  const location = useLocation();
  const [role, setRole] = useState(null); // ubah menjadi state

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole); // ambil role dari localStorage saat render
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div>
          {/* Logo */}
          <div style={styles.logoBox}>
            <img src={layoutLogo} alt="Logo Klinik" style={styles.logoImage} />
          </div>
          <hr style={styles.divider} />

          <p style={styles.navTitle}>Navigation</p>

          {/* Menu */}
          <ul style={styles.menu}>
            <li style={styles.menuItem}>
              <Link
                to="dashboard"
                style={isActive("/dashboard", true) ? { ...styles.menuLink, ...styles.activeMenu } : styles.menuLink}
              >
                <span style={styles.iconCircle}><FaHome /></span>
                Dashboard
              </Link>
            </li>

            <li style={styles.menuItem}>
              <Link
                to="pasien"
                style={isActive("/pasien", true) ? { ...styles.menuLink, ...styles.activeMenu } : styles.menuLink}
              >
                <span style={styles.iconCircle}><FaUserInjured /></span>
                Data Pasien
              </Link>
            </li>

            {role === "admin" && (
              <li style={styles.menuItem}>
                <Link
                  to="pasien/tambah"
                  style={isActive("/pasien/tambah", true) ? { ...styles.menuLink, ...styles.activeMenu } : styles.menuLink}
                >
                  <span style={styles.iconCircle}><FaPlus /></span>
                  Tambah Pasien
                </Link>
              </li>
            )}

            {role === "admin" && (
              <li style={styles.menuItem}>
                <Link
                  to="manajemen-akun"
                  style={isActive("/manajemen-akun", true) ? { ...styles.menuLink, ...styles.activeMenu } : styles.menuLink}
                >
                  <span style={styles.iconCircle}><FaUsers /></span>
                  Manajemen Akun
                </Link>
              </li>
            )}

          </ul>
        </div>

        {/* Logout */}
        <button onClick={handleLogout} style={styles.logoutBtn}>⏻ Logout</button>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        <div style={styles.contentBox}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// --- Table Styles ---
export const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  borderRadius: "12px",
  overflow: "hidden",
  background: "#fff",
};

export const theadStyle = {
  backgroundImage: "linear-gradient(90deg, #078368, #17a2b8)",
  color: "#fff",
};

export const thStyle = { padding: "12px 10px", textAlign: "left" };
export const tdStyle = { padding: "10px" };
export const rowEvenStyle = { backgroundColor: "#d1fae5" };
export const rowOddStyle = { backgroundColor: "#f0fdf4" };

// --- Layout Styles ---
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#083d35",
  },
  sidebar: {
    width: "220px",
    background: "linear-gradient(180deg, #078368ff, #06352d)",
    padding: "20px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logoBox: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px auto",
    overflow: "hidden",
  },
  logoImage: { width: "100%", height: "100%", objectFit: "cover" },
  divider: {
    border: "none",
    borderTop: "1px solid rgba(255, 255, 255, 0.4)",
    margin: "16px 0",
  },
  navTitle: {
    fontSize: "17px",
    fontWeight: "600",
    opacity: 0.85,
    marginBottom: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  menu: { listStyle: "none", padding: 0, margin: 0 },
  menuItem: { marginBottom: "16px" },
  menuLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "8px 10px",
    borderRadius: "6px",
    transition: "all 0.2s ease",
  },
  activeMenu: {
    background: "#299472ff",
    color: "#fffbf0ff",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "10px 12px",
    margin: "2px 0",
  },
  logoutBtn: {
    background: "#b32110ff",
    border: "none",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  iconCircle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    fontSize: "18px",
  },
  content: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    minHeight: 0,
  },
  contentBox: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    minHeight: "100%",
  },
};
