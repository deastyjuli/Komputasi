import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { FaNotesMedical } from "react-icons/fa";

export default function KunjunganForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialForm = {
    tanggal_kunjungan: "",
    keluhan: "",
    diagnosa: "",
    tindakan: "",
  };

  const [form, setForm] = useState(initialForm);
  const [focusField, setFocusField] = useState("");
  const [notif, setNotif] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const showNotif = (message) => {
    setNotif(message);
    setTimeout(() => setNotif(""), 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post(`/pasien/${id}/kunjungan`, form);
      showNotif("Kunjungan berhasil ditambahkan ");

      setTimeout(() => {
        navigate(`/app/pasien/detail/${id}`);
      }, 1500);
    } catch (err) {
      console.log(err);
      showNotif("Gagal menambah kunjungan");
    }
  };

  const handleCancel = () => {
    navigate(`/app/pasien/detail/${id}`);
  };

  const fields = [
    { label: "Tanggal Kunjungan", name: "tanggal_kunjungan", type: "date" },
    { label: "Keluhan", name: "keluhan", type: "textarea" },
    { label: "Diagnosa", name: "diagnosa", type: "textarea" },
    { label: "Tindakan", name: "tindakan", type: "textarea" },
  ];

  return (
    <>
      {/* NOTIF */}
      {notif && (
        <div style={overlayStyle}>
          <div style={notifBoxStyle}>{notif}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.titleBox}>
          <FaNotesMedical style={styles.titleIcon} />
          <h2 style={styles.title}>Tambah Kunjungan</h2>
        </div>

        {fields.map((field) => (
          <div key={field.name} style={styles.fieldWrapper}>
            <label style={styles.label}>{field.label}</label>

            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                style={{
                  ...styles.inputArea,
                  ...(focusField === field.name ? styles.inputFocus : {}),
                }}
                onFocus={() => setFocusField(field.name)}
                onBlur={() => setFocusField("")}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(focusField === field.name ? styles.inputFocus : {}),
                }}
                onFocus={() => setFocusField(field.name)}
                onBlur={() => setFocusField("")}
              />
            )}
          </div>
        ))}

        <div style={styles.buttonGroup}>
          <button
            type="button"
            style={styles.cancelBtn}
            onClick={handleCancel}
          >
            Batal
          </button>
          <button type="submit" style={styles.submitBtn}>
            Simpan
          </button>
        </div>
      </form>
    </>
  );
}

/* ================= NOTIF STYLE ================= */

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

/* ================= FORM STYLES ================= */

const styles = {
  form: {
    width: "100%",
    height: "100%",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    overflowY: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  titleBox: {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(180deg, #078368, #06352d)",
    padding: "15px 20px",
    borderRadius: "12px",
    marginBottom: "25px",
    color: "#fff",
  },
  titleIcon: {
    marginRight: "12px",
    fontSize: "24px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
  },
  fieldWrapper: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "18px",
  },
  label: {
    fontWeight: "600",
    marginBottom: "8px",
    color: "#083b34",
  },
  input: {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "15px",
    boxSizing: "border-box",
    background: "#f9f9f9",
    transition: "all 0.2s",
  },
  inputArea: {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "15px",
    minHeight: "90px",
    boxSizing: "border-box",
    background: "#f9f9f9",
    resize: "none",
    transition: "all 0.2s",
  },
  inputFocus: {
    border: "1px solid #007bff",
    boxShadow: "0 0 8px rgba(0,123,255,0.3)",
    outline: "none",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    marginTop: "20px",
  },
  cancelBtn: {
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    background: "#7e0707",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
  submitBtn: {
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    background: "#083b34",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },
};
