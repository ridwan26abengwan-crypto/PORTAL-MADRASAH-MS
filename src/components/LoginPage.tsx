import React, { useState } from 'react';
import { 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  LogIn, 
  ArrowLeft, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Building, 
  Users, 
  Calendar, 
  Bell, 
  Key, 
  FileText, 
  ChevronRight, 
  HelpCircle, 
  X,
  UserCheck,
  Award,
  Layers,
  BookOpen,
  Wifi,
  Globe,
  Network
} from 'lucide-react';
import { MADRASAH_LOGO, storage } from '../services/storage';

const LOGIN_BG = '/assets/aistudio/WhatsApp_Image_2026-10-24_at_23.47.39_d86b9d68.jpeg';

interface LoginPageProps {
  onLogin: (username: string, password: string) => Promise<void> | void;
  onBackToHome: () => void;
  errorMessage?: string;
  isLoading?: boolean;
}

type RoleTab = 'admin' | 'guru';

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  tag: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onBackToHome,
  errorMessage,
  isLoading = false,
}) => {
  const [activeTab, setActiveTab] = useState<RoleTab>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [roleMismatchNotice, setRoleMismatchNotice] = useState<{
    detectedRole: RoleTab;
    detectedName: string;
  } | null>(null);

  // Admin Features List
  const adminFeatures: FeatureItem[] = [
    {
      icon: Users,
      title: 'Manajemen Data GTK & Operator',
      desc: 'Kelola data guru, staf, NUPTK, status kepegawaian (PNS/GTY/GTT/PTT), dan cetak PDF resmi kop surat.',
      tag: 'Akses Penuh CRUD'
    },
    {
      icon: GraduationCap,
      title: 'Buku Induk & Data Siswa',
      desc: 'Kelola data seluruh murid kelas 1 s.d. 6, NISN, status mutasi/lulus, serta cetak laporan PDF buku induk.',
      tag: 'Akses Penuh CRUD'
    },
    {
      icon: Building,
      title: 'Profil Lembaga & Akreditasi',
      desc: 'Pembaruan identitas madrasah, NSM (111232130142), NPSN (60728914), visi-misi, dan sarana prasarana.',
      tag: 'Otoritas Admin'
    },
    {
      icon: Key,
      title: 'Manajemen Akun & Hak Akses',
      desc: 'Penerbitan akun login baru untuk GTK, reset kata sandi lupa, serta aktivasi atau penonaktifan akun.',
      tag: 'Keamanan Sistem'
    },
    {
      icon: Calendar,
      title: 'Master Jadwal KBM Seluruh Kelas',
      desc: 'Penyusunan jadwal pelajaran, alokasi jam tatap muka, dan penugasan guru pengampu untuk semua tingkat.',
      tag: 'Kurikulum Madrasah'
    },
    {
      icon: Bell,
      title: 'Publikasi Kaldik & Pengumuman',
      desc: 'Rilis kalender akademik resmi, agenda rapat dinas, jadwal PTS/PAS, dan surat edaran kelembagaan.',
      tag: 'Pusat Informasi'
    }
  ];

  // Guru Features List
  const guruFeatures: FeatureItem[] = [
    {
      icon: Calendar,
      title: 'Jadwal Mengajar Pribadi',
      desc: 'Akses rincian jadwal KBM mingguan guru, mata pelajaran yang diampu, jam pelajaran, dan ruang kelas binaan.',
      tag: 'Khusus Guru Terkait'
    },
    {
      icon: GraduationCap,
      title: 'Informasi Santri Binaan',
      desc: 'Melihat data murid kelas binaan untuk kelancaran pendampingan pembelajaran dan koordinasi wali santri.',
      tag: 'Data Siswa Terpadu'
    },
    {
      icon: UserCheck,
      title: 'Perbarui Profil Mandiri',
      desc: 'Pembaruan nomor WhatsApp aktif, kontak darurat, gelar pendidikan terakhir, dan biodata NUPTK pribadi.',
      tag: 'Data Mandiri GTK'
    },
    {
      icon: Bell,
      title: 'Pantau Pengumuman & Kaldik',
      desc: 'Menerima edaran resmi Kepala Madrasah, agenda kegiatan akademik, UTS/UAS, dan hari libur keagamaan.',
      tag: 'Informasi Terkini'
    },
    {
      icon: Building,
      title: 'Informasi Resmi Profil Madrasah',
      desc: 'Akses terpadu identitas madrasah, sejarah singkat, visi-misi madrasah, dan struktur kelembagaan.',
      tag: 'Informasi Lembaga'
    },
    {
      icon: Lock,
      title: 'Keamanan Sandi Mandiri',
      desc: 'Fasilitas ubah kata sandi akun secara mandiri berkala untuk menjaga kerahasiaan akses akun guru.',
      tag: 'Keamanan Akun'
    }
  ];

  // Check account role before sending or notify user
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    // Check if user exists in storage
    const trimmedUser = username.trim().toLowerCase();
    const existingUsers = storage.getUsersList();
    const matchedUser = existingUsers.find(u => u.username.toLowerCase() === trimmedUser);

    if (matchedUser) {
      if (matchedUser.role !== activeTab) {
        // Mismatch between selected tab and actual account role
        setRoleMismatchNotice({
          detectedRole: matchedUser.role as RoleTab,
          detectedName: matchedUser.nama
        });
        return;
      }
    }

    setRoleMismatchNotice(null);
    onLogin(username.trim(), password);
  };

  const handleSwitchTabAndLogin = () => {
    if (!roleMismatchNotice) return;
    const targetRole = roleMismatchNotice.detectedRole;
    setActiveTab(targetRole);
    setRoleMismatchNotice(null);
    onLogin(username.trim(), password);
  };

  // Quick Preset Handlers
  const handleSelectAdminPreset = () => {
    setActiveTab('admin');
    setUsername('misdarussalam22');
    setPassword('misdarussalam#26');
    setRoleMismatchNotice(null);
  };

  const handleSelectIpPreset = (ipIdentifier: string) => {
    setActiveTab('admin');
    setUsername(ipIdentifier);
    setPassword('misdarussalam#26');
    setRoleMismatchNotice(null);
  };

  const handleSelectGuruPreset = (guruUsername: string) => {
    setActiveTab('guru');
    setUsername(guruUsername);
    setPassword('guru12345');
    setRoleMismatchNotice(null);
  };

  return (
    <div 
      className="min-h-[calc(100vh-4rem)] relative flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-cover bg-center bg-no-repeat transition-all"
      style={{ backgroundImage: `url("${LOGIN_BG}")` }}
    >
      {/* Dark atmospheric overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/98 via-emerald-950/85 to-slate-950/80 backdrop-blur-[2px]" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Navigation back to landing */}
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all hover:scale-105 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Kembali ke Beranda Madrasah</span>
          </button>

          <button
            type="button"
            onClick={() => setShowComparisonModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-md border border-amber-400/40 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Bandingkan Hak Akses Admin vs Guru</span>
          </button>
        </div>

        {/* Role Tab Selector Bar */}
        <div className="bg-white/95 dark:bg-emerald-950/95 backdrop-blur-md rounded-2xl p-2 border border-white/40 dark:border-emerald-800 shadow-xl mb-6">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setRoleMismatchNotice(null);
              }}
              className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-emerald-800 to-emerald-900 text-white shadow-md shadow-emerald-900/40 border border-amber-400/40 scale-[1.01]'
                  : 'text-slate-600 dark:text-emerald-300 hover:bg-slate-100 dark:hover:bg-emerald-900/50'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${activeTab === 'admin' ? 'bg-amber-400 text-emerald-950' : 'bg-slate-200 dark:bg-emerald-900 text-slate-600 dark:text-emerald-300'}`}>
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="leading-tight flex items-center gap-1.5">
                  <span>Portal Administrator</span>
                  {activeTab === 'admin' && (
                    <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] bg-amber-400 text-emerald-950 font-black">
                      AKTIF
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-normal opacity-85 hidden sm:block">
                  Akses Penuh Pengelolaan Madrasah
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('guru');
                setRoleMismatchNotice(null);
              }}
              className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'guru'
                  ? 'bg-gradient-to-r from-teal-800 to-emerald-900 text-white shadow-md shadow-teal-900/40 border border-teal-400/40 scale-[1.01]'
                  : 'text-slate-600 dark:text-emerald-300 hover:bg-slate-100 dark:hover:bg-emerald-900/50'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${activeTab === 'guru' ? 'bg-teal-400 text-emerald-950' : 'bg-slate-200 dark:bg-emerald-900 text-slate-600 dark:text-emerald-300'}`}>
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="leading-tight flex items-center gap-1.5">
                  <span>Portal Guru & Pendidik</span>
                  {activeTab === 'guru' && (
                    <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] bg-teal-300 text-emerald-950 font-black">
                      AKTIF
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-normal opacity-85 hidden sm:block">
                  Akses KBM & Jadwal Mengajar Pribadi
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Two-Column Grid: Left: Feature Showcase, Right: Form Login */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Role Details & Features Breakdown */}
          <div className="lg:col-span-6 bg-white/95 dark:bg-emerald-950/95 backdrop-blur-md border border-white/40 dark:border-emerald-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            {/* Role Header Banner */}
            <div className="flex items-start gap-4 pb-4 border-b border-slate-200 dark:border-emerald-800/80">
              <div className={`p-3.5 rounded-2xl shrink-0 shadow-sm ${
                activeTab === 'admin' 
                  ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-emerald-950' 
                  : 'bg-gradient-to-br from-teal-400 to-emerald-500 text-emerald-950'
              }`}>
                {activeTab === 'admin' ? (
                  <ShieldCheck className="w-7 h-7" />
                ) : (
                  <GraduationCap className="w-7 h-7" />
                )}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-1 bg-slate-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>{activeTab === 'admin' ? 'Kewenangan Administrator' : 'Kewenangan Guru & Tenaga Pendidik'}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {activeTab === 'admin' 
                    ? 'Fitur Khusus Administrator Madrasah' 
                    : 'Fitur Khusus Guru & Tenaga Pendidik'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-emerald-300/90 leading-relaxed mt-1">
                  {activeTab === 'admin'
                    ? 'Peran administrator memiliki hak akses tertinggi untuk mengelola seluruh data operasional, perizinan, data GTK, buku induk siswa, dan laporan madrasah.'
                    : 'Peran guru berfokus pada kegiatan belajar mengajar (KBM), jadwal mengajar mandiri, pendampingan santri, serta pembaruan biodata pribadi.'}
                </p>
              </div>
            </div>

            {/* List of Differentiated Features */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-400 flex items-center justify-between">
                <span>Daftar Menu & Fitur yang Dapat Diakses</span>
                <span className="text-[11px] text-emerald-600 dark:text-amber-400">
                  {activeTab === 'admin' ? '6 Modul Pengelolaan' : '6 Fasilitas Pendidik'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(activeTab === 'admin' ? adminFeatures : guruFeatures).map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-emerald-900/40 border border-slate-200/80 dark:border-emerald-800/60 hover:border-emerald-500/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={`p-1.5 rounded-lg shrink-0 ${
                          activeTab === 'admin'
                            ? 'bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-amber-300'
                            : 'bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {feat.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-emerald-200/80 leading-snug line-clamp-2">
                        {feat.desc}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="inline-block text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                          {feat.tag}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Summary Note */}
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Tips Pembagian Peran:</span>{' '}
                {activeTab === 'admin' ? (
                  <span>
                    Gunakan akun Admin bila Anda bertugas sebagai Kepala Madrasah, Operator EMIS/RDM, atau Petugas Tata Usaha untuk mengelola data siswa & GTK.
                  </span>
                ) : (
                  <span>
                    Gunakan akun Guru bila Anda adalah Tenaga Pendidik untuk mengecek jam mengajar, siswa binaan, dan agenda KBM kelas.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Login Form for Selected Role */}
          <div className="lg:col-span-6 bg-white/95 dark:bg-emerald-950/95 backdrop-blur-md border border-white/40 dark:border-emerald-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Card Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto flex items-center justify-center">
                <img 
                  src={MADRASAH_LOGO} 
                  alt="Logo MI Darussalam" 
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-emerald-900 text-slate-800 dark:text-emerald-200">
                  {activeTab === 'admin' ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                      <span>Masuk sebagai Administrator</span>
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
                      <span>Masuk sebagai Guru / Pendidik</span>
                    </>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                  {activeTab === 'admin' ? 'LOGIN ADMIN MADRASAH' : 'LOGIN GURU & PENDIDIK'}
                </h2>
                <p className="text-xs text-slate-600 dark:text-emerald-300 font-medium">
                  MI Darussalam Pinangsari, Ciasem, Subang
                </p>
              </div>
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Role Mismatch Detection Notification */}
            {roleMismatchNotice && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/90 border border-amber-300 dark:border-amber-700 space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-amber-400 text-emerald-950 shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs text-amber-900 dark:text-amber-100">
                    <p className="font-bold">
                      Akun Terdeteksi: {roleMismatchNotice.detectedName}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-amber-800 dark:text-amber-200">
                      Akun ini terdaftar dengan peran <strong className="uppercase">{roleMismatchNotice.detectedRole}</strong>, sedangkan Anda sedang membuka tab <strong className="uppercase">{activeTab}</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleSwitchTabAndLogin}
                    className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold text-xs shadow-sm transition-all text-center cursor-pointer"
                  >
                    Beralih ke Portal {roleMismatchNotice.detectedRole === 'admin' ? 'Admin' : 'Guru'} & Masuk
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleMismatchNotice(null)}
                    className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-emerald-900 text-slate-700 dark:text-emerald-200 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}

            {/* Main Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-200 mb-1.5">
                  Username {activeTab === 'admin' ? 'Admin' : 'Guru'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-emerald-400">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (roleMismatchNotice) setRoleMismatchNotice(null);
                    }}
                    placeholder={activeTab === 'admin' ? 'misdarussalam22 / 192.168.93.113' : 'contoh: siti.rahmah / ahmad.fauzi'}
                    autoComplete="username"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-900/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-200 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-emerald-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password akun"
                    autoComplete="current-password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-900/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 dark:text-emerald-400 hover:text-slate-600 dark:hover:text-emerald-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/25'
                    : 'bg-teal-700 hover:bg-teal-800 shadow-teal-700/25'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>
                  {isLoading 
                    ? 'Memproses...' 
                    : activeTab === 'admin' 
                      ? 'Masuk ke Dashboard Admin' 
                      : 'Masuk ke Dashboard Guru'}
                </span>
              </button>
            </form>

            {/* Quick Demo Accounts Helper */}
            <div className="pt-2 border-t border-slate-200 dark:border-emerald-800/60 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-emerald-300 uppercase tracking-wider">
                <span>Pintasan Masuk Cepat ({activeTab === 'admin' ? 'Akun Admin' : 'Akun Guru'}):</span>
                <span className="text-emerald-600 dark:text-amber-400">1-Klik Isi</span>
              </div>

              {activeTab === 'admin' ? (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleSelectAdminPreset}
                    className="w-full text-left p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/70 border border-emerald-200 dark:border-emerald-700/50 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-emerald-700 text-white">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Administrator Utama MI
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-emerald-300">
                          User: <code className="font-mono text-emerald-800 dark:text-amber-300 font-bold">misdarussalam22</code>
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 group-hover:translate-x-0.5 transition-transform">
                      Gunakan →
                    </span>
                  </button>

                  {/* Local Network / IP Access Buttons */}
                  <div className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-emerald-950/70 border border-slate-200 dark:border-emerald-800/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-emerald-300">
                        <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Akses Jaringan Lokal & IP Terdaftar</span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900 px-2 py-0.2 rounded-full">
                        Port 3000
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleSelectIpPreset('192.168.93.113')}
                        className="text-left p-2 rounded-lg bg-white dark:bg-emerald-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-900 border border-slate-200 dark:border-emerald-700/60 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                      >
                        <div className="truncate">
                          <div className="text-[10px] font-bold text-slate-800 dark:text-white flex items-center gap-1">
                            <Globe className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span>IPv4 LAN</span>
                          </div>
                          <code className="text-[11px] font-mono text-emerald-700 dark:text-amber-300 font-bold block truncate">
                            192.168.93.113
                          </code>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 group-hover:translate-x-0.5 transition-transform">
                          Isi →
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectIpPreset('fe80::3cdf:aff:fea7:6e35')}
                        className="text-left p-2 rounded-lg bg-white dark:bg-emerald-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-900 border border-slate-200 dark:border-emerald-700/60 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                      >
                        <div className="truncate">
                          <div className="text-[10px] font-bold text-slate-800 dark:text-white flex items-center gap-1">
                            <Network className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                            <span>IPv6 Link-Local</span>
                          </div>
                          <code className="text-[10px] font-mono text-teal-700 dark:text-teal-300 font-bold block truncate max-w-[125px]">
                            fe80::3cdf:aff:fea7:6e35
                          </code>
                        </div>
                        <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 group-hover:translate-x-0.5 transition-transform">
                          Isi →
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectGuruPreset('siti.rahmah')}
                    className="text-left p-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800/60 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Siti Rahmah, S.Pd.I
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-teal-300">
                        Wali Kelas 6 (siti.rahmah)
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300">
                      Pilih
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGuruPreset('ahmad.fauzi')}
                    className="text-left p-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800/60 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Ahmad Fauzi, S.Pd
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-teal-300">
                        Wali Kelas 4 (ahmad.fauzi)
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300">
                      Pilih
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Role Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-emerald-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-400 text-emerald-950">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Matriks Perbandingan Hak Akses: Admin vs Guru
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-emerald-300">
                    MI Darussalam Pinangsari, Ciasem, Subang
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowComparisonModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-emerald-900 text-slate-500 dark:text-emerald-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-emerald-900 text-slate-700 dark:text-emerald-200 uppercase font-extrabold">
                  <tr>
                    <th className="py-2.5 px-3 rounded-l-xl">Modul / Fitur Aplikasi</th>
                    <th className="py-2.5 px-3 text-center">Administrator</th>
                    <th className="py-2.5 px-3 text-center rounded-r-xl">Guru / Pendidik</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-emerald-900">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                      Profil Madrasah (NSM, NPSN, Visi-Misi)
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold text-[10px]">
                        Penuh (Edit & Simpan)
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-emerald-900/50 text-slate-600 dark:text-emerald-300 font-semibold text-[10px]">
                        Hanya Melihat
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                      Data GTK & Cetak Laporan PDF Kop Surat
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold text-[10px]">
                        Penuh (CRUD + Cetak)
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-emerald-900/50 text-slate-600 dark:text-emerald-300 font-semibold text-[10px]">
                        Hanya Biodata Sendiri
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                      Buku Induk Murid (Kelas 1 - 6) & Unduh PDF
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold text-[10px]">
                        Penuh (CRUD + Unduh PDF)
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-emerald-900/50 text-slate-600 dark:text-emerald-300 font-semibold text-[10px]">
                        Pantau Santri Binaan
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                      Manajemen Akun Pengguna & Reset Sandi
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold text-[10px]">
                        Penuh (Semua Akun)
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-emerald-900/50 text-slate-600 dark:text-emerald-300 font-semibold text-[10px]">
                        Hanya Ganti Sandi Pribadi
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                      Master Jadwal Pelajaran (KBM)
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold text-[10px]">
                        Atur Semua Rombel
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold text-[10px]">
                        Jadwal Mengajar Sendiri
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                      Pengumuman & Kalender Akademik (Kaldik)
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold text-[10px]">
                        Buat & Hapus Agenda
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold text-[10px]">
                        Melihat Agenda & Edaran
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowComparisonModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
              >
                Tutup Matriks Perbandingan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subtle school photo caption */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center pointer-events-none hidden sm:block">
        <p className="text-[11px] text-white/80 font-medium px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-xs border border-white/10">
          🏫 Suasana Madrasah Ibtidaiyah Darussalam Pinangsari, Ciasem, Subang
        </p>
      </div>
    </div>
  );
};
