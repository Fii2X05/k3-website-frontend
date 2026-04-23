## 📝 Changelog

Semua perubahan penting pada proyek ini akan didokumentasikan di bagian ini.

### [v1.0.0] - 2026-04-23
#### 🎉 Initial Release (Rilis Pertama)
**By:** @Fii2X05
Proyek antarmuka (frontend) **SafetyFirst - Sistem Informasi K3** resmi dirilis dengan fitur-fitur dasar berikut:

#### 🚀 Added (Ditambahkan)
- **Tech Stack Setup:** Inisialisasi proyek menggunakan React.js, TypeScript, dan Vite.
- **Tailwind CSS Integration:** Implementasi Tailwind CSS v3 dengan konfigurasi tema warna enterprise (Slate, Blue, Emerald, dll) dan *custom fonts* (Inter).
- **Responsive Navigation:** Navbar interaktif dengan dukungan *smooth scrolling* dan menu *hamburger* khusus untuk tampilan *mobile*.
- **Hero Section:** Tampilan beranda modern dengan efek *glassmorphism* dan animasi latar belakang (*floating* & *pulsing*).
- **Fitur K3 Module:** Menambahkan tata letak *grid* interaktif untuk 6 modul utama (Manajemen APD, Medical Check Up, Insiden Reporting, dll) dengan efek *hover* kartu.
- **Kepatuhan Regulasi:** Bagian *tracking* regulasi UI (UU No. 1 Tahun 1970, Permenaker, ISO 45001) beserta *progress bar* kepatuhan.
- **Pusat Unduhan:** Halaman *mockup* untuk mengunduh dokumen standar K3 (PDF, DOCX, XLSX).
- **Video Edukasi:** Integrasi *embed* video referensi YouTube terkait keamanan Pengeboran (Oil & Gas) dan Standar OSHA.
- **Sistem Autentikasi (UI):** Popup Modal Login dinamis dengan *backdrop blur* dan simulasi proses *loading*.
- **Toast Notifications:** Komponen notifikasi pop-up global di sudut kanan bawah untuk interaksi pengguna (misal: "Login Berhasil").
- **Custom Animations:** Implementasi `IntersectionObserver` untuk memicu animasi `slide-up` secara otomatis saat elemen muncul di layar (*scroll*).

#### 🐛 Fixed (Diperbaiki)
- **Tailwind Purge Issue:** Memperbaiki *bug* warna latar belakang ikon kartu yang hilang (menjadi putih) akibat *Tree-Shaking*. Menambahkan `safelist` pada `tailwind.config.js` untuk mengamankan *class* warna dinamis (blue, emerald, amber, purple, red, cyan).
- **PostCSS Compatibility:** Melakukan *downgrade* ke Tailwind CSS v3 agar sinkron dengan struktur *file* konfigurasi bawaan.

---
