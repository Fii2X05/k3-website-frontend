import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Reset scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to incidents dashboard as a gimmick
      navigate('/incidents');
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-navy-950 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 rounded-full bg-gold-500 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 rounded-full bg-blue-500 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md space-y-8 z-10 bg-navy-900/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-gold-500/30 shadow-2xl animate-fade-in">
        
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo className="w-20 h-20" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-sand-50">
            {isLogin ? 'Portal Akses Kru' : 'Registrasi Kredensial'}
          </h2>
          <p className="mt-2 text-sm text-sand-300">
            {isLogin 
              ? 'Silakan masuk menggunakan ID Karyawan Anda.' 
              : 'Daftarkan identitas untuk akses sistem Beira Deep.'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          <div className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-bold text-sand-300 uppercase tracking-wider mb-1">Nama Lengkap Sesuai ID</label>
                  <input required type="text" className="w-full px-4 py-3 bg-navy-800/50 border border-navy-600 rounded-xl text-sand-50 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition" placeholder="Cth: David Rennick" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-sand-300 uppercase tracking-wider mb-1">Departemen / Unit Kerja</label>
                  <select className="w-full px-4 py-3 bg-navy-800/50 border border-navy-600 rounded-xl text-sand-50 focus:outline-none focus:ring-2 focus:ring-gold-500 transition">
                    <option value="management">Offshore Management (OIM)</option>
                    <option value="hse">Health, Safety, & Environment</option>
                    <option value="drilling">Departemen Pengeboran</option>
                    <option value="engineering">Teknik & Pemeliharaan</option>
                    <option value="marine">Geladak & Kelautan (Deck Crew)</option>
                    <option value="catering">Layanan & Katering</option>
                    <option value="contractor">Kontraktor / Penyelam</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-sand-300 uppercase tracking-wider mb-1">ID Karyawan / Email Korporat</label>
              <input required type="text" className="w-full px-4 py-3 bg-navy-800/50 border border-navy-600 rounded-xl text-sand-50 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition" placeholder="Cth: EMP-00142" />
            </div>

            <div>
              <label className="block text-xs font-bold text-sand-300 uppercase tracking-wider mb-1">Kata Sandi Akses</label>
              <input required type="password" className="w-full px-4 py-3 bg-navy-800/50 border border-navy-600 rounded-xl text-sand-50 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition" placeholder="••••••••" />
            </div>
            
            {isLogin && (
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-navy-600 bg-navy-800 text-gold-500 focus:ring-gold-500" />
                  <label htmlFor="remember-me" className="ml-2 block text-xs text-sand-300">Ingat Saya</label>
                </div>
                <div className="text-xs">
                  <a href="#" className="font-semibold text-gold-500 hover:text-gold-400 transition" onClick={(e) => { e.preventDefault(); alert('Hubungi IT Support Rig di Ext. 991'); }}>Lupa sandi?</a>
                </div>
              </div>
            )}
          </div>

          <div>
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 rounded-xl shadow-lg text-sm font-bold text-navy-950 bg-gold-500 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy-900 focus:ring-gold-500 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
            >
              {isLoading ? (
                <span className="flex items-center"><i className="fas fa-circle-notch fa-spin mr-2"></i> Memproses...</span>
              ) : (
                <span className="flex items-center"><i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-id-badge'} mr-2`}></i> {isLogin ? 'Otorisasi Akses' : 'Daftarkan Profil'}</span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-sand-400">
            {isLogin ? "Karyawan baru atau rotasi kru?" : "Sudah memiliki kredensial terdaftar?"}
          </p>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="px-5 py-2 rounded-lg border border-gold-500/40 text-xs font-bold text-gold-500 hover:bg-gold-500/10 hover:border-gold-500 transition"
          >
            <i className={`fas ${isLogin ? 'fa-id-badge' : 'fa-sign-in-alt'} mr-1.5`}></i>
            {isLogin ? "Registrasi Karyawan Baru" : "Masuk ke Portal Kru"}
          </button>
        </div>
        
        <div className="mt-8 border-t border-navy-700/50 pt-6">
            <div className="flex items-center justify-center gap-2 text-xs text-navy-500 font-semibold uppercase tracking-widest">
                <i className="fas fa-lock text-gold-500/50"></i>
                Beira Deep Secure Network
            </div>
        </div>

      </div>
    </div>
  );
}
