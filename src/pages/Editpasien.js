import { useState, useEffect } from "react";
import api from "../api/axiosClient";
import { FaUserEdit } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPasien() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialForm = {
    nama: "",
    nik: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    golongan_darah: "",
    alamat: "",
    no_telepon: "",
    riwayat_penyakit: "",
    alergi_obat: "",
    nama_kontak_darurat: "",
    telepon_kontak_darurat: "",
  };

  const [form, setForm] = useState(initialForm);
  const [focusField, setFocusField] = useState("");
  const [notif, setNotif] = useState("");

  useEffect(() => {
    api.get(`/pasien/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const showNotif = (message) => {
    setNotif(message);
    setTimeout(() => {
      setNotif("");
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.jenis_kelamin) {
      showNotif("Silakan pilih jenis kelamin ❗");
      return;
    }

    try {
      await api.put(`/pasien/${id}`, form);
      showNotif("Data pasien berhasil diperbarui");

      setTimeout(() => {
        navigate(`/app/pasien/detail/${id}`);
      }, 1500);
    } catch (err) {
      showNotif("Gagal memperbarui data pasien ");
    }
  };

  const handleCancel = () => {
    navigate(`/app/pasien/detail/${id}`);
  };

  const fields = [
    { label: "Nama", name: "nama", type: "text" },
    { label: "NIK", name: "nik", type: "text" },
    {
      label: "Jenis Kelamin",
      name: "jenis_kelamin",
      type: "select",
      options: [
        { value: "", label: "-- Pilih Jenis Kelamin --" },
        { value: "L", label: "Laki-laki" },
        { value: "P", label: "Perempuan" },
      ],
    },
    { label: "Tanggal Lahir", name: "tanggal_lahir", type: "date" },
    { label: "Golongan Darah", name: "golongan_darah", type: "text" },
    { label: "Alamat", name: "alamat", type: "textarea" },
    { label: "No Telepon", name: "no_telepon", type: "text" },
    { label: "Riwayat Penyakit", name: "riwayat_penyakit", type: "textarea" },   
    { label: "Alergi Obat", name: "alergi_obat", type: "textarea" },
    { label: "Telepon Kontak Darurat", name: "telepon_kontak_darurat", type: "text" },
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
          <FaUserEdit style={styles.titleIcon} />
          <h2 style={styles.title}>Edit Data Pasien</h2>
          <button
            type="button"
            style={styles.cancelBtnHeader}
            onClick={handleCancel}
          >
            Batal
          </button>
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
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(focusField === field.name ? styles.inputFocus : {}),
                }}
                onFocus={() => setFocusField(field.name)}
                onBlur={() => setFocusField("")}
              >
                {field.options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.value === ""}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
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

        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
          <button type="submit" style={styles.submitBtn}>
            Simpan Perubahan
          </button>
          <button type="button" style={styles.cancelBtn} onClick={handleCancel}>
            Batal
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
  },

  titleBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "linear-gradient(180deg, #078368, #06352d)",
    padding: "15px 20px",
    borderRadius: "12px",
    marginBottom: "25px",
    color: "#fff",
  },

  titleIcon: {
    fontSize: "24px",
  },

  title: {
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
  },

  cancelBtnHeader: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#7e0707",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
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
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "15px",
    background: "#f9f9f9",
  },

  inputArea: {
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "15px",
    minHeight: "90px",
    background: "#f9f9f9",
    resize: "none",
  },

  inputFocus: {
    border: "1px solid #007bff",
    boxShadow: "0 0 8px rgba(0,123,255,0.3)",
    outline: "none",
  },

  submitBtn: {
    flex: 1,
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    background: "#083b34",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },

  cancelBtn: {
    flex: 1,
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    background: "#7e0707",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },
};
