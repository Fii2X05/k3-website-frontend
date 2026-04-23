import React, { useState, useEffect } from 'react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', message: '' });

  // Handle Navbar Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Intersection Observer for Animations
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          (entry.target as HTMLElement).style.opacity = '1';
        }
      });
    }, observerOptions);

    // Initial state for card-hover elements
    document.querySelectorAll('.card-hover, .animate-on-scroll').forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const showToast = (title: string, message: string) => {
    setToast({ show: true, title, message });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsLoginOpen(false);
      showToast('Login Berhasil', 'Selamat datang kembali di sistem!');
    }, 1500);
  };

  const downloadPDF = (filename: string) => {
    showToast('Mengunduh...', `File ${filename} sedang diunduh`);
    setTimeout(() => {
      showToast('Unduhan Selesai', `${filename} berhasil diunduh`);
    }, 2000);
  };

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo('top')}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                <i className="fas fa-hard-hat"></i>
              </div>
              <span className="text-2xl font-bold text-slate-800">Safety<span className="text-blue-600">First</span></span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={() => scrollTo('top')} className="nav-link text-slate-600 hover:text-blue-600 font-medium transition">Beranda</button>
              <button onClick={() => scrollTo('features')} className="nav-link text-slate-600 hover:text-blue-600 font-medium transition">Fitur K3</button>
              <button onClick={() => scrollTo('regulations')} className="nav-link text-slate-600 hover:text-blue-600 font-medium transition">Regulasi</button>
              <button onClick={() => scrollTo('downloads')} className="nav-link text-slate-600 hover:text-blue-600 font-medium transition">Unduhan</button>
              <button onClick={() => setIsLoginOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition transform hover:scale-105 shadow-lg hover:shadow-blue-500/30">
                Masuk
              </button>
            </div>

            <button className="md:hidden text-slate-600 text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-slate-200 absolute w-full`}>
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button onClick={() => scrollTo('top')} className="block w-full text-left px-3 py-2 text-slate-600 hover:bg-blue-50 rounded-lg">Beranda</button>
            <button onClick={() => scrollTo('features')} className="block w-full text-left px-3 py-2 text-slate-600 hover:bg-blue-50 rounded-lg">Fitur K3</button>
            <button onClick={() => scrollTo('regulations')} className="block w-full text-left px-3 py-2 text-slate-600 hover:bg-blue-50 rounded-lg">Regulasi</button>
            <button onClick={() => { setIsLoginOpen(true); setIsMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 text-blue-600 font-medium">Masuk</button>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsLoginOpen(false)}></div>
          <div className="login-glass w-full max-w-md rounded-2xl p-8 text-white shadow-2xl relative border border-white/10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse-slow">
                <i className="fas fa-user-shield text-2xl"></i>
              </div>
              <h2 className="text-3xl font-bold mb-2">Selamat Datang</h2>
              <p className="text-slate-300">Sistem Informasi K3 Terpadu</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <input type="email" required className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition peer" placeholder=" " />
                <label className="absolute left-4 top-3 text-slate-400 transition-all peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs bg-transparent px-2">
                  Email Address
                </label>
                <i className="fas fa-envelope absolute right-4 top-3.5 text-slate-400"></i>
              </div>

              <div className="relative">
                <input type="password" required className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition peer" placeholder=" " />
                <label className="absolute left-4 top-3 text-slate-400 transition-all peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs bg-transparent px-2">
                  Password
                </label>
                <i className="fas fa-lock absolute right-4 top-3.5 text-slate-400"></i>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500 bg-white/10" />
                  <span className="ml-2 text-slate-300">Ingat saya</span>
                </label>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition">Lupa password?</a>
              </div>

              <button type="submit" disabled={isLoggingIn} className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 group">
                {isLoggingIn ? <span><i className="fas fa-spinner fa-spin"></i> Memproses...</span> : <span>Masuk Sekarang <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i></span>}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">Belum punya akun? <a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition">Daftar disini</a></p>
            </div>

            <button onClick={() => setIsLoginOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main id="top">
        {/* Hero Section */}
        <section className="hero-section relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-grow flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-300 mb-8 animate-on-scroll mx-auto w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm font-medium">Sistem K3 Terintegrasi #1 di Indonesia</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-on-scroll" style={{ animationDelay: '0.1s' }}>
              Lindungi Pekerja <br />
              <span className="text-gradient">Wujudkan Keselamatan</span>
            </h1>

            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              Platform komprehensif untuk manajemen Keselamatan dan Kesehatan Kerja (K3) yang modern, terintegrasi, dan sesuai regulasi Indonesia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-on-scroll" style={{ animationDelay: '0.3s' }}>
              <button onClick={() => scrollTo('features')} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2">
                <span>Jelajahi Fitur</span>
                <i className="fas fa-chevron-down"></i>
              </button>
              <button onClick={() => downloadPDF('brosur-k3')} className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold transition transform hover:scale-105 flex items-center gap-2">
                <i className="fas fa-download"></i>
                <span>Unduh Panduan</span>
              </button>
            </div>

            <div className="mt-16 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-on-scroll" style={{ animationDelay: '0.4s' }}>
              <div className="glass-effect rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-slate-400">Perusahaan Mitra</div>
              </div>
              <div className="glass-effect rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">99%</div>
                <div className="text-sm text-slate-400">Tingkat Kepatuhan</div>
              </div>
              <div className="glass-effect rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">24/7</div>
                <div className="text-sm text-slate-400">Dukungan Teknis</div>
              </div>
              <div className="glass-effect rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">ISO</div>
                <div className="text-sm text-slate-400">Sertifikasi 45001</div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pb-8 flex justify-center">
            <div className="animate-bounce">
              <i className="fas fa-chevron-down text-white/50 text-2xl"></i>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-blue-600 font-semibold mb-2 tracking-wide uppercase text-sm">Fitur Utama</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">Standar K3 Lengkap</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">Implementasi sistem manajemen K3 sesuai dengan regulasi pemerintah dan standar internasional.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: 'fa-helmet-safety', color: 'blue', title: 'APD Management', desc: 'Pengelolaan Alat Pelindung Diri lengkap dengan tracking penggunaan dan inspeksi berkala.', item1: 'Inventori Real-time', item2: 'Kalibrasi Otomatis' },
                { icon: 'fa-file-medical-alt', color: 'emerald', title: 'Medical Check Up', desc: 'Monitoring kesehatan pekerja dengan riwayat digital dan reminder pemeriksaan berkala.', item1: 'Riwayat Digital', item2: 'Analisis Trend' },
                { icon: 'fa-exclamation-triangle', color: 'amber', title: 'Insiden Reporting', desc: 'Pelaporan kecelakaan dan insiden near-miss dengan investigasi root cause analysis.', item1: 'Laporan Real-time', item2: 'Investigasi Digital' },
                { icon: 'fa-graduation-cap', color: 'purple', title: 'Training Matrix', desc: 'Manajemen pelatihan K3 dengan sertifikasi digital dan tracking kompetensi pekerja.', item1: 'E-Learning', item2: 'Sertifikasi Digital' },
                { icon: 'fa-fire-extinguisher', color: 'red', title: 'Emergency Response', desc: 'Sistem tanggap darurat dengan prosedur evakuasi dan koordinasi tim rescue.', item1: 'Drill Scheduling', item2: 'Panic Button' },
                { icon: 'fa-clipboard-check', color: 'cyan', title: 'Audit & Inspection', desc: 'Audit internal K3 dengan checklist digital dan tracking temuan hingga closed.', item1: 'Mobile Inspection', item2: 'CAPA Tracking' }
              ].map((feat, i) => (
                <div key={i} className="card-hover group bg-slate-50 rounded-2xl p-8 border border-slate-100 relative overflow-hidden cursor-pointer">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${feat.color}-100 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150`}></div>
                  <div className="relative z-10">
                    <div className={`w-14 h-14 bg-${feat.color}-600 rounded-xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg group-hover:rotate-12 transition-transform`}>
                      <i className={`fas ${feat.icon}`}></i>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h4>
                    <p className="text-slate-600 mb-4">{feat.desc}</p>
                    <ul className="space-y-2 text-sm text-slate-500">
                      <li className="flex items-center gap-2"><i className="fas fa-check text-emerald-500"></i> {feat.item1}</li>
                      <li className="flex items-center gap-2"><i className="fas fa-check text-emerald-500"></i> {feat.item2}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regulations Section */}
        <section id="regulations" className="py-24 bg-slate-50 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-blue-600 font-semibold mb-2 tracking-wide uppercase text-sm">Regulasi</h2>
                <h3 className="text-4xl font-bold text-slate-900 mb-6">Kepatuhan Hukum K3 Indonesia</h3>
                <p className="text-slate-600 mb-8 text-lg">Sistem kami dirancang sesuai dengan peraturan perundangan yang berlaku di Indonesia untuk memastikan kepatuhan penuh terhadap standar keselamatan nasional.</p>

                <div className="space-y-4">
                  {[
                    { icon: 'fa-gavel', color: 'blue', title: 'UU No. 1 Tahun 1970', desc: 'Keselamatan Kerja dan ketentuan umum K3 di Indonesia' },
                    { icon: 'fa-book', color: 'emerald', title: 'Permenaker No. 5/2018', desc: 'Pengelolaan Keselamatan dan Kesehatan Kerja' },
                    { icon: 'fa-certificate', color: 'amber', title: 'ISO 45001:2018', desc: 'Sistem Manajemen Kesehatan dan Keselamatan Kerja Internasional' }
                  ].map((reg, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer group">
                      <div className={`w-12 h-12 bg-${reg.color}-100 rounded-lg flex items-center justify-center text-${reg.color}-600 group-hover:bg-${reg.color}-600 group-hover:text-white transition`}>
                        <i className={`fas ${reg.icon}`}></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{reg.title}</h4>
                        <p className="text-sm text-slate-600">{reg.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative animate-on-scroll">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl transform rotate-3 opacity-20"></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-bold text-slate-900">Status Kepatuhan</h4>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">Aktif</span>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { title: 'SMK3 Implementation', val: 98, color: 'blue' },
                      { title: 'Training Compliance', val: 100, color: 'emerald' },
                      { title: 'Audit Internal', val: 95, color: 'amber' },
                      { title: 'Reporting System', val: 92, color: 'purple' }
                    ].map((stat, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">{stat.title}</span>
                          <span className={`text-sm font-bold text-${stat.color}-600`}>{stat.val}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className={`bg-${stat.color}-600 h-2 rounded-full transition-all duration-1000`} style={{ width: `${stat.val}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-shield-alt text-emerald-500 text-2xl"></i>
                      <div>
                        <div className="font-bold text-slate-900">Tersertifikasi Resmi</div>
                        <div className="text-sm text-slate-600">oleh Kementerian Ketenagakerjaan RI</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Downloads Section */}
        <section id="downloads" className="py-24 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-blue-600 font-semibold mb-2 tracking-wide uppercase text-sm">Pusat Unduhan</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">Dokumen & Formulir K3</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">Akses berbagai dokumen penting terkait K3 untuk kebutuhan perusahaan Anda.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 'panduan-k3', icon: 'fa-file-pdf', color: 'red', ext: 'PDF', title: 'Panduan Umum K3', desc: 'Buku panduan lengkap implementasi K3 di tempat kerja sesuai UU.' },
                { id: 'formulir-insiden', icon: 'fa-file-word', color: 'blue', ext: 'DOCX', title: 'Formulir Laporan Insiden', desc: 'Template standar pelaporan kecelakaan kerja dan near miss.' },
                { id: 'checklist-audit', icon: 'fa-file-excel', color: 'emerald', ext: 'XLSX', title: 'Checklist Audit Internal', desc: 'Format checklist audit SMK3 lengkap dengan scoring system.' },
                { id: 'sop-kebakaran', icon: 'fa-file-pdf', color: 'amber', ext: 'PDF', title: 'SOP Kebakaran', desc: 'Standar operasional prosedur penanganan kebakaran dan evakuasi.' },
                { id: 'jadwal-pelatihan', icon: 'fa-file-powerpoint', color: 'purple', ext: 'PPTX', title: 'Materi Pelatihan K3', desc: 'Presentasi standar untuk pelatihan dasar K3 karyawan baru.' },
                { id: 'peraturan-terbaru', icon: 'fa-file-pdf', color: 'cyan', ext: 'PDF', title: 'Kompilasi Peraturan 2024', desc: 'Update terbaru regulasi K3 dari pemerintah Indonesia.' }
              ].map((dl, i) => (
                <div key={i} className="group bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-blue-500 transition-all hover:shadow-xl cursor-pointer card-hover" onClick={() => downloadPDF(dl.id)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-${dl.color}-100 rounded-xl flex items-center justify-center text-${dl.color}-600 group-hover:scale-110 transition-transform`}>
                      <i className={`fas ${dl.icon} text-xl`}></i>
                    </div>
                    <span className="px-3 py-1 bg-slate-200 text-slate-600 rounded-full text-xs font-medium">{dl.ext}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">{dl.title}</h4>
                  <p className="text-sm text-slate-600 mb-4">{dl.desc}</p>
                  <div className="flex items-center text-sm text-blue-600 font-medium group-hover:gap-2 transition-all">
                    <span>Unduh Dokumen</span>
                    <i className="fas fa-download ml-2 group-hover:animate-bounce"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Edukasi Section (Sesuai Request Youtube) */}
        <section className="py-24 bg-slate-50 relative z-10 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-blue-600 font-semibold mb-2 tracking-wide uppercase text-sm">Referensi Visual</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">Materi Edukasi K3</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">Pelajari standar keselamatan industri melalui referensi video secara langsung.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="card-hover bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl p-2 animate-on-scroll">
                <div className="aspect-video w-full rounded-2xl overflow-hidden">
                  <iframe className="w-full h-full" src="https://www.youtube.com/embed/2oXJbdxryCs" title="Oil & Gas Drilling rig safety" allowFullScreen></iframe>
                </div>
                <div className="p-6 text-center">
                  <h4 className="font-bold text-lg text-slate-900">Keselamatan Pengeboran (Oil & Gas)</h4>
                  <p className="text-sm text-slate-500 mt-2">Standar menjaga jarak titik bahaya operasional.</p>
                </div>
              </div>
              <div className="card-hover bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl p-2 animate-on-scroll">
                <div className="aspect-video w-full rounded-2xl overflow-hidden">
                  <iframe className="w-full h-full" src="https://www.youtube.com/embed/h4NuE7wY_pg" title="OSHA Oil and Gas Safety Standards" allowFullScreen></iframe>
                </div>
                <div className="p-6 text-center">
                  <h4 className="font-bold text-lg text-slate-900">Standar Keselamatan OSHA</h4>
                  <p className="text-sm text-slate-500 mt-2">Regulasi APD dan ruang terbatas industri.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-blue-900 to-slate-900 relative overflow-hidden z-10">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Siap Meningkatkan Standar K3?</h2>
            <p className="text-xl text-slate-300 mb-10">Bergabung dengan ratusan perusahaan yang telah menerapkan sistem K3 modern dan terintegrasi.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setIsLoginOpen(true)} className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold hover:bg-slate-100 transition transform hover:scale-105 shadow-xl">
                Mulai Sekarang
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition">
                Hubungi Kami
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
                  <i className="fas fa-hard-hat"></i>
                </div>
                <span className="text-2xl font-bold text-white">Safety<span className="text-blue-500">First</span></span>
              </div>
              <p className="text-slate-400 mb-6">Platform terdepan untuk manajemen Keselamatan dan Kesehatan Kerja di Indonesia.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition text-white"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 transition text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition text-white"><i className="fab fa-instagram"></i></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-700 transition text-white"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Tautan Cepat</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-400 transition">Tentang Kami</a></li>
                <li><a href="#features" className="hover:text-blue-400 transition">Fitur</a></li>
                <li><a href="#regulations" className="hover:text-blue-400 transition">Regulasi</a></li>
                <li><a href="#downloads" className="hover:text-blue-400 transition">Unduhan</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Sumber Daya</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-400 transition">Dokumentasi API</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Pusat Bantuan</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Webinar K3</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Kontak</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><i className="fas fa-map-marker-alt text-blue-500 mt-1"></i><span>Jl. Sudirman No. 123<br />Jakarta Selatan 12920</span></li>
                <li className="flex items-center gap-3"><i className="fas fa-phone text-blue-500"></i><span>+62 21 1234 5678</span></li>
                <li className="flex items-center gap-3"><i className="fas fa-envelope text-blue-500"></i><span>info@safetyfirst.id</span></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <div className={`fixed bottom-5 right-5 transform transition-all duration-300 z-[100] ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
          <i className="fas fa-check-circle text-emerald-500 text-xl"></i>
          <div>
            <h4 className="font-bold text-sm">{toast.title}</h4>
            <p className="text-sm text-slate-300">{toast.message}</p>
          </div>
        </div>
      </div>

    </div>
  );
}