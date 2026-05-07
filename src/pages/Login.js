import React, { useState, useEffect } from "react"; // Import hook React
import axios from "axios"; // Digunakan untuk request API ke backend
import "./Login.css"; // File CSS untuk tampilan login
import { useNavigate } from "react-router-dom"; // Digunakan untuk redirect halaman

function Login() {
  const navigate = useNavigate(); // Hook untuk berpindah halaman

  // State untuk menampung input form login
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // State untuk menampilkan notifikasi login
  const [notif, setNotif] = useState(""); // NOTIF STATE

  const handleChange = (e) => {
    // Mengupdate nilai input sesuai field yang diubah user
    setForm({ ...form, [e.target.name]: e.target.value });

    // Menghapus notif otomatis saat user mulai mengetik ulang
    if (notif) setNotif("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    try {
      // Mengirim data email & password ke API backend Laravel
      const res = await axios.post("http://localhost:8000/api/login", form);

      // Menyimpan data user dan role ke localStorage agar tetap login
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      // Menampilkan notifikasi login berhasil
      setNotif("Login berhasil");

      // Redirect ke halaman /app setelah delay 500ms
      setTimeout(() => {
        navigate("/app");
      }, 500);
    } catch (err) {
      // Jika login gagal tampilkan notifikasi error
      setNotif("Email atau password salah");

      // Menghilangkan notif otomatis setelah 500ms
      setTimeout(() => {
        setNotif("");
      }, 500);
    }
  };

  // Mengecek apakah user sudah login sebelumnya
  // Jika ada data user di localStorage maka langsung redirect ke /app
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      navigate("/app");
    }
  }, [navigate]);

  return (
    <div className="login-page">
      {/* Menampilkan notifikasi jika notif tidak kosong */}
      {notif && (
        <div className="notif-overlay">
          <div className="notif-box">{notif}</div>
        </div>
      )}

      <div className="login-card">
        <h2>Login</h2>

        {/* Form login */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required // Wajib diisi
              onChange={handleChange} // Menjalankan handleChange saat input berubah
              value={form.email} // Mengambil nilai dari state
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" required onChange={handleChange} value={form.password} />
          </div>

          {/* Tombol submit login */}
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>

        {/* Link menuju halaman register */}
        <p className="register-text">
          Tidak punya akun? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login; // Mengekspor component Login agar bisa digunakan di file lain
