import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Role = 'guest' | 'crew' | 'management';

export interface User {
  id: string;
  name: string;
  dept: string;
  role: Role;
  avatar: string; // initials
}

interface AuthContextType {
  user: User | null;
  login: (employeeId: string, password: string) => { success: boolean; message: string; role?: Role };
  logout: () => void;
  isAuthenticated: boolean;
}

const DUMMY_ACCOUNTS: { id: string; password: string; user: User }[] = [
  // === MANAGEMENT (Full Access) ===
  {
    id: 'EMP-00001', password: 'mgr123',
    user: { id: 'EMP-00001', name: 'David Rennick', dept: 'Offshore Management (OIM)', role: 'management', avatar: 'DR' }
  },
  {
    id: 'EMP-00002', password: 'mgr123',
    user: { id: 'EMP-00002', name: 'Nicole Hall', dept: 'HSE & Legal Compliance', role: 'management', avatar: 'NH' }
  },
  {
    id: 'EMP-00003', password: 'mgr123',
    user: { id: 'EMP-00003', name: 'Douglas Dunbar', dept: 'Chief Engineering', role: 'management', avatar: 'DD' }
  },
  {
    id: 'EMP-00004', password: 'mgr123',
    user: { id: 'EMP-00004', name: 'George Gregor', dept: 'Drilling Toolpusher', role: 'management', avatar: 'GG' }
  },
  // === CREW (Limited Access) ===
  {
    id: 'EMP-00142', password: 'crew123',
    user: { id: 'EMP-00142', name: 'Cameron "Caz" McLeary', dept: 'Engineering & Maintenance', role: 'crew', avatar: 'CM' }
  },
  {
    id: 'EMP-00143', password: 'crew123',
    user: { id: 'EMP-00143', name: 'Kenneth Patterson', dept: 'Drilling Crew', role: 'crew', avatar: 'KP' }
  },
  {
    id: 'EMP-00144', password: 'crew123',
    user: { id: 'EMP-00144', name: 'Sunil', dept: 'Deck Crew (Roustabout)', role: 'crew', avatar: 'SN' }
  },
  {
    id: 'EMP-00145', password: 'crew123',
    user: { id: 'EMP-00145', name: 'Alex Cranstoun', dept: 'Marine & Deck (Crane Operator)', role: 'crew', avatar: 'AC' }
  },
];

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('beira_auth_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (employeeId: string, password: string): { success: boolean; message: string; role?: Role } => {
    const account = DUMMY_ACCOUNTS.find(
      a => a.id.toLowerCase() === employeeId.trim().toLowerCase() && a.password === password
    );
    if (account) {
      setUser(account.user);
      localStorage.setItem('beira_auth_user', JSON.stringify(account.user));
      return { success: true, message: `Selamat datang, ${account.user.name}!`, role: account.user.role };
    }
    return { success: false, message: 'ID Karyawan atau kata sandi tidak valid.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('beira_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export const ROLE_LABELS: Record<Role, string> = {
  guest: 'Tamu Publik',
  crew: 'Kru / Anggota',
  management: 'Manajemen',
};

export const ROLE_COLORS: Record<Role, string> = {
  guest: 'bg-sand-200 text-navy-700',
  crew: 'bg-blue-100 text-blue-800',
  management: 'bg-gold-100 text-gold-900',
};
