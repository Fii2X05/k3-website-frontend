import { useAuth } from '../context/AuthContext';
import type { Role } from '../context/AuthContext';

interface Props {
  children: React.ReactNode;
  requiredRole?: Role; // minimum role required
}

const ROLE_LEVEL: Record<Role, number> = {
  guest: 0,
  crew: 1,
  management: 2,
};

export default function ProtectedRoute({ children, requiredRole = 'crew' }: Props) {
  const { user } = useAuth();

  const userLevel = user ? ROLE_LEVEL[user.role] : 0;
  const requiredLevel = ROLE_LEVEL[requiredRole];

  if (userLevel < requiredLevel) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-navy-950 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-red-900/30 flex items-center justify-center mb-6 border-2 border-red-500/30">
          <i className="fas fa-lock text-red-400 text-4xl"></i>
        </div>
        <h2 className="text-3xl font-black text-sand-50 mb-3">Akses Ditolak</h2>
        <p className="text-sand-200 max-w-sm mb-8">
          {user
            ? `Akun Anda (${user.role === 'crew' ? 'Kru' : 'Tamu'}) tidak memiliki izin untuk mengakses halaman ini.`
            : 'Anda harus masuk ke portal terlebih dahulu untuk mengakses halaman ini.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {!user && (
            <a href="/auth" className="px-6 py-3 bg-gold-500 text-navy-950 font-bold rounded-xl hover:bg-gold-400 transition flex items-center shadow-lg shadow-gold-500/10">
              <i className="fas fa-sign-in-alt mr-2"></i>Login Sekarang
            </a>
          )}
          <a href="/" className="px-6 py-3 border border-gold-500/40 text-gold-500 font-bold rounded-xl hover:bg-gold-500/10 transition flex items-center">
            <i className="fas fa-home mr-2"></i>Kembali ke Beranda
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
