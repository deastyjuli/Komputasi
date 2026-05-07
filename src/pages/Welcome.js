import React from "react";

export default function Welcome() {
  return (
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      {/* Judul */}
      <h1
        style={{
          fontSize: "36px",
          color: "#0a463fff",
          marginBottom: "15px",
          fontWeight: "bold",
          textShadow:
            "0 0 3px #fff, 0 0 10px #0e5d5fff, 0 0 20px #167c63ff",
        }}
      >
        Selamat Datang di Klinik App 🏥
      </h1>

      {/* Paragraf */}
      <p
        style={{
          fontSize: "18px",
          color: "#444",
          maxWidth: "700px",
          margin: "0 auto 40px",
          lineHeight: "1.6",
        }}
      >
        Aplikasi ini digunakan untuk mengelola data pasien, mencatat riwayat
        kunjungan, serta mempermudah proses administrasi klinik secara digital.
        Silakan pilih menu di sebelah kiri untuk mulai mengelola data.
      </p>

      {/* Posters */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          alignItems: "center",
        }}
      >
        {/* Row Poster Portrait 1 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <img
            src="https://i.pinimg.com/736x/7b/52/26/7b522686fb3b7984ec0fe44322323548.jpg"
            alt="Poster 1"
            style={{
              width: "350px",
              height: "435px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
          <img
            src="https://i.pinimg.com/originals/31/7e/0f/317e0f03b87157701c13d9158c533c99.jpg"
            alt="Poster 2"
            style={{
              width: "350px",
              height: "435px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
          <img
            src="https://i.pinimg.com/originals/6a/43/7c/6a437c30c36ad6dcb812b2189581ff42.jpg"
            alt="Poster 3"
            style={{
              width: "350px",
              height: "435px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
        </div>

        {/* Poster Landscape */}
        <img
          src="https://media.istockphoto.com/id/1452521608/id/vektor/gusi-manusia-dengan-gigi-sehat-dan-gigi-palsu-pada-spanduk-kedokteran-gigi-poster-klinik.jpg?s=1024x1024&w=is&k=20&c=b6qK6Uwyl5j-hzKtKsdMXrf4jV6oM1cWTtNKNMuV92c="
          alt="Poster Landscape"
          style={{
            width: "100%",
            maxWidth: "1000px",
            height: "auto",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />

        {/* Row Poster Portrait 2 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <img
            src="https://down-id.img.susercontent.com/file/id-11134207-7r98o-lqlqjecy39biea"
            alt="Poster 1"
            style={{
              width: "350px",
              height: "435px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
          <img
            src="https://www.walisongo.co.id/wp-content/uploads/2020/05/poster-kesehatan-sabun-wm.png"
            alt="Poster 2"
            style={{
              width: "350px",
              height: "435px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
          <img
            src="https://kotagede1pusk.jogjakota.go.id/assets/instansi/kotagede1pusk/article/20200322114107.jpeg"
            alt="Poster 3"
            style={{
              width: "350px",
              height: "435px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
