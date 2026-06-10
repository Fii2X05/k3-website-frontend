import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // Form fields
  const [loginId, setLoginId] = useState('');
  const [loginPwd, setLoginPwd] = useState('');
  const [regName, setRegName] = useState('');
  const [regDept, setRegDept] = useState('Departemen Pengeboran');
  const [regId, setRegId] = useState('');
  const [regPwd, setRegPwd] = useState('');

  // Already logged in → redirect
  useEffect(() => {
    if (user) navigate('/incidents');
    window.scrollTo(0, 0);
  }, [user]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setIsLoading(true);

    setTimeout(() => {
      const result = login(loginId, loginPwd);
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          if (result.role === 'management') {
            navigate('/management');
          } else {
            navigate('/incidents');
          }
        }, 800);
      } else {
        setError(result.message);
        setIsLoading(false);
      }
    }, 1200);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!regName.trim() || !regId.trim() || !regPwd.trim()) {
      setError('Harap isi semua kolom yang wajib diisi.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Permintaan registrasi berhasil dikirim. Tim IT akan memverifikasi identitas Anda dalam 1×24 jam.');
      setTimeout(() => { setSuccess(''); setIsLogin(true); }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-navy-950 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 rounded-full bg-gold-500 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 rounded-full bg-blue-500 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md z-10 bg-navy-900/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-gold-500/30 shadow-2xl animate-fade-in space-y-6">

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-5">
            <Logo className="w-20 h-20" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-sand-50">
            {isLogin ? 'Portal Akses Kru' : 'Registrasi Kredensial'}
          </h2>
          <p className="mt-1.5 text-sm text-sand-200">
            {isLogin ? 'Masuk menggunakan ID Karyawan & sandi Anda.' : 'Daftarkan identitas Anda ke sistem Beira Deep.'}
          </p>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="flex items-center gap-3 bg-red-900/40 border border-red-500/40 text-red-300 text-sm px-4 py-3 rounded-xl">
            <i className="fas fa-exclamation-triangle shrink-0"></i>{error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-3 bg-green-900/40 border border-green-500/40 text-green-300 text-sm px-4 py-3 rounded-xl">
            <i className="fas fa-check-circle shrink-0"></i>{success}
          </div>
        )}

        {/* ── LOGIN FORM ── */}
        {isLogin && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-1.5">ID Karyawan</label>
              <input required value={loginId} onChange={e => { setLoginId(e.target.value); setError(''); }}
                className="w-full px-4 py-3 bg-navy-800/50 border border-navy-600 rounded-xl text-sand-50 placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition"
                placeholder="Cth: EMP-00001" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-1.5">Kata Sandi Akses</label>
              <input required type="password" value={loginPwd} onChange={e => { setLoginPwd(e.target.value); setError(''); }}
                className="w-full px-4 py-3 bg-navy-800/50 border border-navy-600 rounded-xl text-sand-50 placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition"
                placeholder="••••••••" />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => alert('Hubungi IT Support Rig di Ext. 991')}
                className="text-xs font-semibold text-gold-500 hover:text-gold-400 transition">Lupa sandi?</button>
            </div>

            {/* Dummy Hint */}
            <div className="bg-navy-800/60 border border-navy-600 rounded-xl p-3 text-xs text-sand-200 space-y-1">
              <p className="font-bold text-gold-400 mb-1.5"><i className="fas fa-info-circle text-gold-500 mr-1.5"></i>Akun Demo Tersedia:</p>
              <p><span className="text-sand-50 font-semibold">Manajemen:</span> EMP-00001 / mgr123</p>
              <p><span className="text-sand-50 font-semibold">Kru Biasa:</span> EMP-00142 / crew123</p>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl font-bold text-sm text-navy-950 bg-gold-500 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all disabled:opacity-60 hover:-translate-y-0.5">
              {isLoading
                ? <><i className="fas fa-circle-notch fa-spin mr-2"></i>Memproses...</>
                : <><i className="fas fa-sign-in-alt mr-2"></i>Otorisasi Akses</>}
            </button>
          </form>
        )}

        {/* ── REGISTER FORM ── */}
        {!isLogin && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-1.5">Nama Lengkap Sesuai ID <span className="text-red-400">*</span></label>
              <input required value={regName} onChange={e => setRegName(e.target.value)}
                className="w-full px-4 py-3 bg-navy-800/50 border border-navy-600 rounded-xl text-sand-50 placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-500 transition"
                placeholder="Cth: David Rennick" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-1.5">Departemen / Unit Kerja</label>
              <select value={regDept} onChange={e => setRegDept(e.target.value)}
                className="w-full px-4 py-3 bg-navy-800/50 border border-navy-600 rounded-xl text-sand-50 focus:outline-none focus:ring-2 focus:ring-gold-500 transition">
                <option>Offshore Management (OIM)</option>
                <option>Health, Safety, & Environment</option>
                <option>Departemen Pengeboran</option>
                <option>Teknik & Pemeliharaan</option>
                <option>Geladak & Kelautan (Deck Crew)</option>
                <option>Layanan & Katering</option>
                <option>Kontraktor / Penyelam</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-1.5">ID Karyawan yang Diajukan <span className="text-red-400">*</span></label>
              <input required value={regId} onChange={e => setRegId(e.target.value)}
                className="w-full px-4 py-3 bg-navy-800/50 border border-navy-600 rounded-xl text-sand-50 placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-500 transition"
                placeholder="Cth: EMP-00199" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-1.5">Buat Kata Sandi <span className="text-red-400">*</span></label>
              <input required type="password" value={regPwd} onChange={e => setRegPwd(e.target.value)}
                className="w-full px-4 py-3 bg-navy-800/50 border border-navy-600 rounded-xl text-sand-50 placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-500 transition"
                placeholder="Min. 8 karakter" />
            </div>
            <button type="submit" disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl font-bold text-sm text-navy-950 bg-gold-500 hover:bg-gold-400 transition-all disabled:opacity-60 hover:-translate-y-0.5">
              {isLoading
                ? <><i className="fas fa-circle-notch fa-spin mr-2"></i>Mengirim...</>
                : <><i className="fas fa-id-badge mr-2"></i>Daftarkan Profil</>}
            </button>
          </form>
        )}

        {/* Swap Toggle */}
        <div className="flex flex-col items-center gap-2 text-center pt-2 border-t border-navy-700/50">
          <p className="text-xs text-sand-500">
            {isLogin ? 'Karyawan baru atau rotasi kru?' : 'Sudah memiliki kredensial terdaftar?'}
          </p>
          <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
            className="px-5 py-2 rounded-lg border border-gold-500/40 text-xs font-bold text-gold-500 hover:bg-gold-500/10 hover:border-gold-500 transition">
            <i className={`fas ${isLogin ? 'fa-id-badge' : 'fa-sign-in-alt'} mr-1.5`}></i>
            {isLogin ? 'Registrasi Karyawan Baru' : 'Masuk ke Portal Kru'}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-navy-500 font-semibold uppercase tracking-widest">
          <i className="fas fa-lock text-gold-500/40"></i>
          Beira Deep Secure Network
        </div>

      </div>
    </div>
  );
}
