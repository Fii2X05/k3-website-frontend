import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Permit {
    id: string;
    type: string;
    applicant: string;
    location: string;
    status: 'Pending' | 'Disetujui' | 'Ditolak';
    date: string;
}

const INITIAL_PERMITS: Permit[] = [
    { id: 'PTW-089', type: 'Hot Work (Pengelasan)', applicant: 'Cameron "Caz" McLeary', location: 'Engineering L2', status: 'Pending', date: '2026-06-10' },
    { id: 'PTW-090', type: 'Confined Space Entry', applicant: 'Sunil', location: 'Under Rig (Pontoon)', status: 'Pending', date: '2026-06-11' },
    { id: 'PTW-091', type: 'Working at Height', applicant: 'Stuart "Gibbo" Gibson', location: 'Derrick (Menara Bor)', status: 'Disetujui', date: '2026-06-09' },
];

export default function Management() {
    const { user } = useAuth();
    const [permits, setPermits] = useState<Permit[]>(INITIAL_PERMITS);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handlePermit = (id: string, newStatus: 'Disetujui' | 'Ditolak') => {
        setPermits(permits.map(p => p.id === id ? { ...p, status: newStatus } : p));
        showToast(`✅ Izin kerja ${id} berhasil ${newStatus.toLowerCase()}.`);
    };

    const pendingCount = permits.filter(p => p.status === 'Pending').length;

    return (
        <div className="bg-sand-100 min-h-screen pb-20">
            {/* Toast */}
            {toast && (
                <div className="fixed top-24 right-6 z-50 bg-navy-900 text-sand-50 px-6 py-3 rounded-xl shadow-2xl border border-gold-500/30 animate-fade-in text-sm font-medium">
                    {toast}
                </div>
            )}

            {/* Header */}
            <div className="bg-navy-900 py-12 border-b border-gold-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500/20 rounded-full mb-4 border border-gold-500/30">
                        <i className="fas fa-crown text-gold-500 text-2xl"></i>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-sand-50 mb-4">Command Center</h1>
                    <p className="text-sand-200 max-w-2xl mx-auto text-lg">Panel kontrol eksklusif untuk Divisi Manajemen (OIM). Pantau status rig, Persons on Board (POB), dan persetujuan Izin Kerja (PTW).</p>

                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <div className="bg-navy-800/60 border border-navy-700 px-5 py-3 rounded-xl flex items-center gap-3">
                            <div className="w-10 h-10 bg-gold-500/20 rounded-full flex items-center justify-center">
                                <i className="fas fa-user-tie text-gold-400 text-lg"></i>
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-gold-400 font-bold uppercase tracking-wider">OIM on Duty</p>
                                <p className="text-sand-50 font-black">{user?.name}</p>
                            </div>
                        </div>
                        <div className="bg-navy-800/60 border border-navy-700 px-5 py-3 rounded-xl flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                <i className="fas fa-shield-check text-green-400 text-lg"></i>
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-gold-400 font-bold uppercase tracking-wider">Status Rig</p>
                                <p className="text-sand-50 font-black">NORMAL (GREEN)</p>
                            </div>
                        </div>
                        <div className="bg-navy-800/60 border border-navy-700 px-5 py-3 rounded-xl flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                                <i className="fas fa-users text-blue-400 text-lg"></i>
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-gold-400 font-bold uppercase tracking-wider">POB (Persons On Board)</p>
                                <p className="text-sand-50 font-black">142 <span className="text-gold-400 font-medium text-sm">/ 150</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column: PTW */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-sand-200 shadow-md p-6">
                            <div className="flex justify-between items-center mb-6 border-b border-sand-200 pb-4">
                                <div>
                                    <h2 className="text-xl font-black text-navy-900">Permit to Work (PTW)</h2>
                                    <p className="text-sm text-navy-600 mt-1">Persetujuan izin kerja berisiko tinggi.</p>
                                </div>
                                {pendingCount > 0 && (
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200 animate-pulse">
                                        {pendingCount} Menunggu
                                    </span>
                                )}
                            </div>

                            <div className="space-y-4">
                                {permits.map(permit => (
                                    <div key={permit.id} className="border border-sand-200 rounded-xl p-4 hover:border-gold-500/50 transition bg-sand-50/50">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-black text-navy-900 bg-sand-200 px-2 py-0.5 rounded">{permit.id}</span>
                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${permit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        permit.status === 'Disetujui' ? 'bg-green-100 text-green-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                        {permit.status}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-navy-900">{permit.type}</h3>
                                                <p className="text-sm text-navy-600 mt-1">
                                                    <i className="fas fa-user mr-1.5 text-navy-500"></i>{permit.applicant} &nbsp;&bull;&nbsp;
                                                    <i className="fas fa-map-marker-alt mx-1.5 text-gold-500"></i>{permit.location}
                                                </p>
                                            </div>

                                            {permit.status === 'Pending' && (
                                                <div className="flex gap-2">
                                                    <button onClick={() => handlePermit(permit.id, 'Disetujui')} className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold text-sm hover:bg-green-600 transition shadow-sm">
                                                        <i className="fas fa-check mr-1.5"></i>Setujui
                                                    </button>
                                                    <button onClick={() => handlePermit(permit.id, 'Ditolak')} className="px-4 py-2 bg-white text-red-500 border border-red-200 rounded-lg font-bold text-sm hover:bg-red-50 transition shadow-sm">
                                                        Tolak
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Quick Actions & Log */}
                    <div className="space-y-6">
                        <div className="bg-navy-900 rounded-2xl border border-gold-500/20 shadow-md p-6 text-sand-50">
                            <h2 className="text-lg font-black text-gold-500 mb-4 border-b border-navy-700 pb-3">Tindakan Cepat (OIM)</h2>
                            <div className="space-y-3">
                                <button className="w-full bg-navy-800 hover:bg-navy-700 border border-navy-600 hover:border-gold-500/50 text-left px-4 py-3 rounded-xl transition flex items-center justify-between group">
                                    <span className="font-semibold text-sm text-sand-100">Deklarasi Cuaca Buruk</span>
                                    <i className="fas fa-cloud-showers-heavy text-sand-200 group-hover:text-gold-500 transition"></i>
                                </button>
                                <button className="w-full bg-navy-800 hover:bg-navy-700 border border-navy-600 hover:border-gold-500/50 text-left px-4 py-3 rounded-xl transition flex items-center justify-between group">
                                    <span className="font-semibold text-sm text-sand-100">Hentikan Pengeboran</span>
                                    <i className="fas fa-hand-paper text-sand-200 group-hover:text-gold-500 transition"></i>
                                </button>
                                <button className="w-full bg-red-900/30 hover:bg-red-600 border border-red-500/30 hover:border-red-500 text-red-400 hover:text-white text-left px-4 py-3 rounded-xl transition flex items-center justify-between group">
                                    <span className="font-semibold text-sm">BUNYIKAN ALARM EVAKUASI</span>
                                    <i className="fas fa-bullhorn transition"></i>
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-sand-200 shadow-md p-6">
                            <h2 className="text-lg font-black text-navy-900 mb-4">Log Aktivitas Terbaru</h2>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-2 h-2 mt-1.5 rounded-full bg-gold-500 shrink-0"></div>
                                    <div>
                                        <p className="text-sm font-semibold text-navy-900">Helikopter H225 mendarat</p>
                                        <p className="text-xs text-navy-600">Membawa 12 kru shift baru &bull; 10:45 AM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></div>
                                    <div>
                                        <p className="text-sm font-semibold text-navy-900">Inspeksi Generator Selesai</p>
                                        <p className="text-xs text-navy-600">Oleh Chief Engineer &bull; 09:30 AM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 shrink-0"></div>
                                    <div>
                                        <p className="text-sm font-semibold text-navy-900">Laporan Cuaca Diterima</p>
                                        <p className="text-xs text-navy-600">Gelombang 2 meter, angin tenang &bull; 06:00 AM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
