# Portal MI Darussalam Pinangsari

Sistem Informasi Terpadu Madrasah Ibtidaiyah (MI) Darussalam Pinangsari, Kec. Ciasem, Kab. Subang, Jawa Barat.

---

## 🌟 Fitur Utama

1. **Portal Login Terpisah (Admin vs Guru)**:
   - **Portal Administrator**: Tata Usaha, manajemen GTK & murid, kalender akademik, pengumuman madrasah, dan laporan resmi.
   - **Portal Guru & Pendidik**: Jadwal KBM guru per hari, agenda mengajar kelas binaan, rekapitulasi data siswa kelas, serta akses materi ajar.
   - Dilengkapi tombol cepat 1-klik akun preset dan deteksi otomatis peran akun.

2. **Profil Madrasah Lengkap**:
   - Visi & Misi, Sejarah Madrasah, Sarana & Prasarana, Sambutan Kepala Madrasah, Identitas Lembaga (NSM: `111232130095`, NPSN: `60708573`, Akreditasi: `B`).

3. **Kalender Akademik Terintegrasi (Kaldik)**:
   - Kalender akademik otomatis berbasis pengumuman dan agenda madrasah dengan badge semester, hitung mundur kegiatan terdekat, dan filter bulan.

4. **Manajemen GTK & Siswa (dengan Fitur Cetak PDF)**:
   - Data lengkap Pendidik & Tenaga Kependidikan serta Santri/Murid per kelas (Kelas 1 s/d 6).
   - Tombol **"Cetak / Unduh PDF"** langsung dengan kop surat resmi madrasah, kolom tanda tangan Kepala Madrasah & Waka Kurikulum, format siap cetak A4.

5. **Mode Tampilan Siang & Malam (Dark & Light Mode)**:
   - Toggle instan dengan penyimpanan preferensi otomatis di LocalStorage.

---

## 💻 Panduan Menjalankan di Visual Studio Code

### 1. Prasyarat
- **Node.js** (versi 18 ke atas) & **npm** terpasang di komputer.
- **Visual Studio Code** ([Download VS Code](https://code.visualstudio.com/)).

### 2. Langkah Instalasi & Menjalankan
Buka Terminal di folder proyek pada VS Code:

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan server pengembang (Localhost)
npm run dev
```

Buka browser dan akses alamat:
```
http://localhost:3000
```

### 3. Build untuk Produksi
```bash
npm run build
```

---

## 🔑 Akun Login Bawaan (Default Credentials)

| Peran | Username | Kata Sandi | Jabatan / Keterangan |
|---|---|---|---|
| **Administrator Utama** | `misdarussalam22` | `misdarussalam#26` | Pengelola & Tata Usaha Madrasah |
| **Admin Akses IP LAN** | `192.168.93.113` | `misdarussalam#26` / `192.168.93.113` | Akses Jaringan Lokal (IPv4) |
| **Admin Akses IPv6** | `fe80::3cdf:aff:fea7:6e35` | `misdarussalam#26` | Akses Jaringan Lokal (IPv6) |
| **Guru Pendidik** | `siti.rahmah` | `guru12345` | Ustadzah Siti Rahmah, S.Pd.I (Wali Kelas 6) |
| **Guru Pendidik** | `ahmad.fauzi` | `guru12345` | Ustadz Ahmad Fauzi, S.Pd (Wali Kelas 4) |
| **Guru Pendidik** | `nurhayati` | `guru12345` | Ustadzah Nurhayati, S.Pd (Guru Kelas 3) |

---

## 📂 Struktur Berkas (Components Architecture)

```
├── index.html                 # Entry point HTML & Google Fonts
├── metadata.json              # Metadata konfigurasi applet
├── package.json               # Dependensi & script Vite/React
├── src/
│   ├── main.tsx               # Entry script React
│   ├── App.tsx                # State manajemen utama & routing tampilan
│   ├── index.css              # Styling Tailwind CSS
│   ├── types.ts               # Tipe data TypeScript (GTK, Siswa, Event, Pengumuman, Role)
│   ├── components/
│   │   ├── Navbar.tsx         # Navigasi atas, Dark Mode toggle, Status Akun
│   │   ├── Footer.tsx         # Informasi kontak, medsos, dan alamat Ciasem Subang
│   │   ├── LandingPage.tsx    # Halaman beranda interaktif, showcase fitur Admin & Guru
│   │   ├── LoginPage.tsx      # Portal login tab Admin vs Guru + Preset 1-Klik
│   │   ├── DashboardView.tsx  # Beranda portal internal + Ringkasan Kaldik interaktif
│   │   ├── ProfilMadrasahView.tsx # Profil komprehensif, visi-misi, sarpras, kepsek
│   │   ├── DataGtkView.tsx    # Tabel & kartu data GTK + Cetak PDF
│   │   ├── DataSiswaView.tsx  # Tabel santri/murid per kelas + Cetak PDF
│   │   ├── JadwalKbmView.tsx  # Jadwal KBM mingguan per kelas & per guru
│   │   ├── KaldikView.tsx     # Kalender Akademik lengkap & pengumuman
│   │   └── GuruPortalView.tsx # Portal kerja harian guru & catatan KBM
│   └── services/
│       └── storage.ts         # Mock database LocalStorage dengan data inisial lengkap
└── vite.config.ts             # Konfigurasi Vite & Tailwind plugin
```

---

## 🌐 Tautan Akses Aplikasi
- **Akses Jaringan Lokal (LAN / Wi-Fi)**: `http://192.168.93.113:3000`
- **Akses IPv6 Link-Local**: `http://[fe80::3cdf:aff:fea7:6e35]:3000`
- **Tautan Devtunnel**: `https://0zpbz71k-3000.asse.devtunnels.ms/`
- **Aplikasi Live AI Studio**: `https://ais-pre-ko7pbjq2qb3jgy4helvnru-790197967303.asia-northeast1.run.app`
