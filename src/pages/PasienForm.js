import { useState } from "react";
import api from "../api/axiosClient";
import { FaUserPlus } from "react-icons/fa";

export default function TambahPasien() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const showNotif = (message) => {
    setNotif(message);
    setTimeout(() => setNotif(""), 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (
    !form.nama ||
    !form.nik ||
    !form.jenis_kelamin ||
    !form.tanggal_lahir ||
    !form.golongan_darah ||
    !form.alamat ||
    !form.no_telepon ||
    !form.riwayat_penyakit ||
    !form.alergi_obat ||
    !form.telepon_kontak_darurat
  ) {
    showNotif("Semua field wajib diisi!");
    return;
  }

    try {
      const res = await api.post("/pasien", form);

      // Tampilkan notif sukses hanya sekali
      const message = res.data?.message || "Data pasien berhasil ditambahkan!";
      showNotif(message);

      setForm(initialForm); 
    } catch (err) {
      console.log(err.response?.data);
      showNotif("Gagal menambah data pasien");
    }
  };

  const fields = [
    { label: "Nama", name: "nama", type: "text" },
    { label: "NIK", name: "nik", type: "text" },
    { 
      label: "Jenis Kelamin", 
      name: "jenis_kelamin", 
      type: "select", 
      options: [
        { value: "", label: "" },
        { value: "L", label: "Laki-laki" }, 
        { value: "P", label: "Perempuan" }
      ] 
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
      {/* NOTIF TENGAH */}
      {notif && (
        <div style={{
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
        }}>
          <div style={{
            background: "#fff",
            padding: "20px 30px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            textAlign: "center",
          }}>
            {notif}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.titleBox}>
          <FaUserPlus style={styles.titleIcon} />
          <h2 style={styles.title}>Tambah Data Pasien</h2>
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
                  <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
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

        <button type="submit" style={styles.submitBtn}>Simpan</button>
      </form>
    </>
  );
}

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
    background: "linear-gradient(180deg, #078368ff, #06352d)",
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

  submitBtn: {
    marginTop: "25px",
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    background: "#083b34",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.3s",
  },
};
