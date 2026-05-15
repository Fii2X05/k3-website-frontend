## 📝 Changelog

Semua perubahan penting pada proyek ini akan didokumentasikan di bagian ini.

### [v2.0.0] - 2026-05-14
#### 🚀 Added (Ditambahkan)
- **Tema Desain Baru (Industrial Theme):** Implementasi warna `ocean-blue`, `safety-orange`, dan `metallic-gray` pada `tailwind.config.js`.
- **Hero Section:** Desain sinematik untuk pendaratan utama dengan gambar latar belakang rig deepwater dan slogan perusahaan.
- **Profil Perusahaan (About Us):** Informasi detail mengenai peran strategis PT Beira Deep dalam eksplorasi energi dan komitmen terhadap ekosistem.
- **Health, Safety, and Environment (HSE) Hub:**
  - Infografis *Hierarchy of Risk Control* (Elimination, Substitution, Engineering, Administrative, PPE).
  - *Accordion menu* untuk *Emergency Response Plan* (ERP) dan prosedur evakuasi.
  - Sub-seksi khusus untuk *OSHA Legal Foundations* (HazCom, Fall Protection, PSM).
- **Interactive Facility Mapping (Rig Layout):** Fitur peta interaktif berbasis *tabs* untuk Weather Deck, Engineering L1-L3, Under Rig, dan Accommodations, lengkap dengan *hover tooltips* (CSS-based) untuk identifikasi bahaya dan kebutuhan APD.
- **Video Edukasi (Multimedia Gallery):** Integrasi *embed* video referensi YouTube tentang "Oil & Gas Drilling rig safety" dan "OSHA Oil and Gas Safety Standards" dengan penjelasan spesifik.
- **Footer Korporat:** Desain gelap dan profesional dengan info kontak di Malang, Jawa Timur serta tautan sertifikasi internasional.
- **Optimasi CSS:** *Smooth scrolling*, kustomisasi *scrollbar*, animasi *slide-up/fade-in*, dan utilitas *tooltip* yang dibuat menggunakan CSS murni di `index.css`.

#### 🔧 Modified (Dimodifikasi)
- Menghapus komponen-komponen SafetyFirst yang sudah tidak relevan.
- Memperbarui `App.tsx` menjadi format presentasi perusahaan terpadu (single-page).
- Memperbarui dependensi melalui `npm install` dan memvalidasi `npm run build` dengan hasil yang sukses tanpa peringatan TypeScript.

---


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
