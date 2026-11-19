import { GTK, Siswa } from '../types';
import { storage, MADRASAH_LOGO } from './storage';

interface GtkPdfFilter {
  status?: string;
  search?: string;
}

interface SiswaPdfFilter {
  kelas?: string;
  gender?: string;
  status?: string;
  search?: string;
}

/**
 * Format date to Indonesian standard: "27 Oktober 2026"
 */
function formatTanggalIndo(dateStr?: string | Date): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const day = d.getDate();
  const month = bulan[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

function getBasePrintStyles(orientation: 'portrait' | 'landscape' = 'landscape'): string {
  return `
    @page {
      size: A4 ${orientation};
      margin: 10mm 12mm 12mm 12mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      font-family: 'Times New Roman', Times, serif, system-ui, -apple-system, sans-serif;
      color: #111827;
      background: #fff;
      margin: 0;
      padding: 0;
      font-size: 11pt;
      line-height: 1.35;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .kop-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 3px double #111827;
      padding-bottom: 8px;
      margin-bottom: 14px;
    }
    .kop-logo {
      width: 72px;
      height: 72px;
      object-fit: contain;
      flex-shrink: 0;
    }
    .kop-text {
      flex: 1;
      text-align: center;
      padding: 0 12px;
    }
    .kop-line-1 {
      font-size: 12pt;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin: 0;
      text-transform: uppercase;
    }
    .kop-line-2 {
      font-size: 11pt;
      font-weight: 700;
      margin: 2px 0 0 0;
      text-transform: uppercase;
    }
    .kop-line-madrasah {
      font-size: 14pt;
      font-weight: 900;
      color: #065f46;
      margin: 3px 0 0 0;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .kop-meta {
      font-size: 8.5pt;
      margin: 3px 0 0 0;
      color: #374151;
      font-family: Arial, sans-serif;
    }
    .kop-address {
      font-size: 8pt;
      font-style: italic;
      margin: 2px 0 0 0;
      color: #4b5563;
      font-family: Arial, sans-serif;
    }
    .doc-title {
      text-align: center;
      margin: 12px 0 6px 0;
    }
    .doc-title h2 {
      font-size: 13pt;
      font-weight: 800;
      text-decoration: underline;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .doc-title p {
      font-size: 9.5pt;
      color: #4b5563;
      margin: 3px 0 0 0;
      font-family: Arial, sans-serif;
    }
    .meta-bar {
      display: flex;
      justify-content: space-between;
      font-size: 8.5pt;
      font-family: Arial, sans-serif;
      margin-bottom: 10px;
      padding: 4px 0;
      border-bottom: 1px solid #e5e7eb;
      color: #374151;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.5pt;
      font-family: Arial, sans-serif;
      margin-bottom: 18px;
    }
    table.data-table th, table.data-table td {
      border: 1px solid #374151;
      padding: 5px 6px;
      vertical-align: middle;
    }
    table.data-table th {
      background-color: #f3f4f6 !important;
      font-weight: 700;
      text-align: center;
      color: #111827;
      text-transform: uppercase;
      font-size: 8pt;
    }
    table.data-table tr:nth-child(even) td {
      background-color: #fafafa !important;
    }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .text-left { text-align: left; }
    .font-semibold { font-weight: 600; }
    .badge-status {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 7.5pt;
      font-weight: bold;
      border: 1px solid #9ca3af;
      background: #f9fafb;
    }
    .signatures {
      width: 100%;
      margin-top: 24px;
      page-break-inside: avoid;
      font-family: Arial, sans-serif;
      font-size: 9.5pt;
    }
    .signatures td {
      vertical-align: top;
      width: 50%;
    }
    .sig-block {
      text-align: center;
      display: inline-block;
      min-width: 220px;
    }
    .sig-space {
      height: 60px;
    }
    .sig-name {
      font-weight: bold;
      text-decoration: underline;
    }
    .sig-nip {
      font-size: 8.5pt;
      color: #374151;
    }
    .watermark-footer {
      margin-top: 16px;
      padding-top: 6px;
      border-top: 1px dashed #d1d5db;
      font-size: 7.5pt;
      color: #9ca3af;
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: space-between;
    }
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  `;
}

function buildKopSuratHtml(profil: ReturnType<typeof storage.getProfilMadrasah>): string {
  const logoUrl = window.location.origin + MADRASAH_LOGO;
  return `
    <div class="kop-container">
      <img src="${logoUrl}" alt="Logo Madrasah" class="kop-logo" onerror="this.style.display='none'" />
      <div class="kop-text">
        <div class="kop-line-1">Kementerian Agama Republik Indonesia</div>
        <div class="kop-line-2">Kantor Kementerian Agama Kabupaten Subang</div>
        <div class="kop-line-madrasah">${profil.nama || 'MI Darussalam Pinangsari'}</div>
        <div class="kop-meta">
          <strong>NSM:</strong> ${profil.nsm || '111232130142'} &nbsp;|&nbsp;
          <strong>NPSN:</strong> ${profil.npsn || '60728914'} &nbsp;|&nbsp;
          <strong>Akreditasi:</strong> ${profil.akreditasi || 'B (BAN-S/M)'} &nbsp;|&nbsp;
          <strong>Status:</strong> ${profil.status || 'Swasta'}
        </div>
        <div class="kop-address">
          Alamat: ${profil.alamat || 'Dusun Sukamaju RT 02/RW 01'}, ${profil.desa || 'Desa Pinangsari'}, ${profil.kecamatan || 'Kec. Ciasem'}, ${profil.kabupaten || 'Kab. Subang'} ${profil.kodePos || '41256'} &bull; Telp: ${profil.telepon || '0812-2345-6789'}
        </div>
      </div>
      <div style="width: 72px; height: 72px;" class="kop-logo">
        <!-- Placeholder right for balance / stamp area -->
      </div>
    </div>
  `;
}

function printDocument(htmlContent: string): void {
  // Try hidden iframe approach first for seamless instant print dialog
  try {
    const existingIframe = document.getElementById('mi-print-iframe') as HTMLIFrameElement | null;
    if (existingIframe) {
      existingIframe.remove();
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'mi-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = 'none';
    iframe.style.zIndex = '-9999';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch {
          // If iframe printing is blocked, fallback to window.open
          openPrintWindow(htmlContent);
        }
      }, 350);
      return;
    }
  } catch (err) {
    console.warn('Iframe print failed, falling back to window.open', err);
  }

  // Fallback
  openPrintWindow(htmlContent);
}

function openPrintWindow(htmlContent: string) {
  const win = window.open('', '_blank');
  if (win) {
    win.document.open();
    win.document.write(htmlContent);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
    }, 500);
  }
}

/**
 * Export GTK List to printable official PDF
 */
export function exportGtkToPdf(gtkList: GTK[], filters?: GtkPdfFilter): void {
  const profil = storage.getProfilMadrasah();
  const tglCetak = formatTanggalIndo();
  const filterInfo = filters?.status && filters.status !== 'SEMUA' 
    ? `Status: ${filters.status}` 
    : 'Semua Status Kepegawaian';

  const rowsHtml = gtkList.map((g, idx) => `
    <tr>
      <td class="text-center">${idx + 1}</td>
      <td class="font-semibold">${g.nama}</td>
      <td class="text-center">${g.nuptk || '-'}</td>
      <td>${g.jabatan}</td>
      <td class="text-center"><span class="badge-status">${g.status}</span></td>
      <td>${g.mapel || '-'}</td>
      <td>${g.pendidikan || '-'}</td>
      <td class="text-center">${g.hp || '-'}</td>
      <td>${g.email || '-'}</td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Data GTK - MI Darussalam Pinangsari</title>
      <style>${getBasePrintStyles('landscape')}</style>
    </head>
    <body>
      ${buildKopSuratHtml(profil)}

      <div class="doc-title">
        <h2>Laporan Data Guru dan Tenaga Kependidikan (GTK)</h2>
        <p>Tahun Pelajaran 2024/2025 &bull; MI Darussalam Pinangsari Subang</p>
      </div>

      <div class="meta-bar">
        <div><strong>Kriteria:</strong> ${filterInfo} ${filters?.search ? `| Pencarian: "${filters.search}"` : ''}</div>
        <div><strong>Total GTK:</strong> ${gtkList.length} Orang &nbsp;|&nbsp; <strong>Dicetak Pada:</strong> ${tglCetak}</div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 30px;">No</th>
            <th>Nama Lengkap & Gelar</th>
            <th style="width: 130px;">NUPTK / PegID</th>
            <th style="width: 140px;">Jabatan</th>
            <th style="width: 60px;">Status</th>
            <th>Tugas / Mapel</th>
            <th>Pendidikan</th>
            <th style="width: 100px;">No. WhatsApp</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml || `<tr><td colspan="9" class="text-center" style="padding: 20px;">Tidak ada data GTK ditemukan</td></tr>`}
        </tbody>
      </table>

      <table class="signatures">
        <tr>
          <td style="text-align: left; padding-left: 20px;">
            <div class="sig-block">
              <div>Mengetahui,</div>
              <div>Kepala MI Darussalam Pinangsari</div>
              <div class="sig-space"></div>
              <div class="sig-name">${profil.kepalaMadrasah || 'Drs. H. Ahmad Sanusi, M.Pd.I'}</div>
              <div class="sig-nip">NIP. 197405121998031002</div>
            </div>
          </td>
          <td style="text-align: right; padding-right: 20px;">
            <div class="sig-block">
              <div>Subang, ${tglCetak}</div>
              <div>Pengelola Data & Administrasi</div>
              <div class="sig-space"></div>
              <div class="sig-name">( Operator Madrasah )</div>
              <div class="sig-nip">SIMPATIKA / EMIS Kemenag Subang</div>
            </div>
          </td>
        </tr>
      </table>

      <div class="watermark-footer">
        <span>Dokumen Resmi Sistem Informasi Manajemen MI Darussalam Pinangsari (SIM-MADRASAH)</span>
        <span>Halaman 1 dari 1 &bull; Dicetak secara otomatis melalui portal madrasah</span>
      </div>
    </body>
    </html>
  `;

  printDocument(html);
}

/**
 * Export Siswa List to printable official PDF
 */
export function exportSiswaToPdf(siswaList: Siswa[], filters?: SiswaPdfFilter): void {
  const profil = storage.getProfilMadrasah();
  const tglCetak = formatTanggalIndo();

  const totalL = siswaList.filter(s => s.jenisKelamin === 'L').length;
  const totalP = siswaList.filter(s => s.jenisKelamin === 'P').length;

  const kelasInfo = filters?.kelas && filters.kelas !== 'SEMUA' ? filters.kelas : 'Semua Rombongan Belajar (Kelas 1-6)';
  const genderInfo = filters?.gender && filters.gender !== 'SEMUA' 
    ? (filters.gender === 'L' ? 'Laki-laki (Ikhwan)' : 'Perempuan (Akhwat)') 
    : 'Semua Gender';

  const rowsHtml = siswaList.map((s, idx) => `
    <tr>
      <td class="text-center">${idx + 1}</td>
      <td class="text-center">${s.nis || '-'}</td>
      <td class="text-center font-semibold">${s.nisn || '-'}</td>
      <td class="font-semibold">${s.nama}</td>
      <td class="text-center"><span class="badge-status">${s.jenisKelamin === 'L' ? 'L (Laki)' : 'P (Peremp)'}</span></td>
      <td class="text-center font-semibold">${s.kelas}</td>
      <td>${s.tempatLahir ? `${s.tempatLahir}, ${s.tanggalLahir || ''}` : '-'}</td>
      <td>${s.namaWali}</td>
      <td class="text-center">${s.hpWali || '-'}</td>
      <td style="font-size: 8pt;">${s.alamat}</td>
      <td class="text-center"><span class="badge-status">${s.status}</span></td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Data Siswa - MI Darussalam Pinangsari</title>
      <style>${getBasePrintStyles('landscape')}</style>
    </head>
    <body>
      ${buildKopSuratHtml(profil)}

      <div class="doc-title">
        <h2>Buku Induk & Laporan Data Santri / Peserta Didik</h2>
        <p>Tahun Pelajaran 2024/2025 &bull; Terdaftar di EMIS 4.0 Kementerian Agama RI</p>
      </div>

      <div class="meta-bar">
        <div>
          <strong>Rombel / Kelas:</strong> ${kelasInfo} &nbsp;|&nbsp;
          <strong>Filter Gender:</strong> ${genderInfo} ${filters?.search ? `&nbsp;|&nbsp; <strong>Cari:</strong> "${filters.search}"` : ''}
        </div>
        <div>
          <strong>Total:</strong> ${siswaList.length} Santri (L: ${totalL}, P: ${totalP}) &nbsp;|&nbsp;
          <strong>Dicetak Pada:</strong> ${tglCetak}
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 25px;">No</th>
            <th style="width: 70px;">NIS</th>
            <th style="width: 85px;">NISN</th>
            <th>Nama Lengkap Santri</th>
            <th style="width: 55px;">L / P</th>
            <th style="width: 65px;">Kelas</th>
            <th>Tempat, Tanggal Lahir</th>
            <th>Orang Tua / Wali</th>
            <th style="width: 90px;">No. HP Wali</th>
            <th>Alamat Domisili</th>
            <th style="width: 55px;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml || `<tr><td colspan="11" class="text-center" style="padding: 20px;">Tidak ada data murid ditemukan</td></tr>`}
        </tbody>
      </table>

      <table class="signatures">
        <tr>
          <td style="text-align: left; padding-left: 20px;">
            <div class="sig-block">
              <div>Mengetahui,</div>
              <div>Kepala MI Darussalam Pinangsari</div>
              <div class="sig-space"></div>
              <div class="sig-name">${profil.kepalaMadrasah || 'Drs. H. Ahmad Sanusi, M.Pd.I'}</div>
              <div class="sig-nip">NIP. 197405121998031002</div>
            </div>
          </td>
          <td style="text-align: right; padding-right: 20px;">
            <div class="sig-block">
              <div>Subang, ${tglCetak}</div>
              <div>Wali Kelas / Pengelola Data Kesiswaan</div>
              <div class="sig-space"></div>
              <div class="sig-name">( Operator EMIS Madrasah )</div>
              <div class="sig-nip">Database Kesiswaan Terpadu</div>
            </div>
          </td>
        </tr>
      </table>

      <div class="watermark-footer">
        <span>Buku Induk Kesiswaan Digital &bull; MI Darussalam Pinangsari Ciasem Subang Jawa Barat</span>
        <span>Dicetak secara otomatis &bull; Status Akreditasi: B BAN-S/M</span>
      </div>
    </body>
    </html>
  `;

  printDocument(html);
}
