import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface Permit {
    id: string;
    type: string;
    applicant: string;
    location: string;
    risk: 'Tinggi' | 'Sedang';
    status: 'Pending' | 'Disetujui' | 'Ditolak';
    date: string;
    description: string;
}

const INITIAL_PERMITS: Permit[] = [
    { id: 'PTW-089', type: 'Hot Work (Pengelasan)', applicant: 'Cameron "Caz" McLeary', location: 'Engineering L2', risk: 'Tinggi', status: 'Pending', date: '2026-06-10', description: 'Perbaikan sambungan pipa hidrolik menggunakan mesin las TIG di area engine room level 2.' },
    { id: 'PTW-090', type: 'Confined Space Entry', applicant: 'Sunil', location: 'Under Rig (Pontoon)', risk: 'Tinggi', status: 'Pending', date: '2026-06-11', description: 'Inspeksi visual ruang ballast tank #3 untuk pengecekan korosi dan integritas struktural.' },
    { id: 'PTW-091', type: 'Working at Height', applicant: 'Stuart "Gibbo" Gibson', location: 'Derrick (Menara Bor)', risk: 'Sedang', status: 'Disetujui', date: '2026-06-09', description: 'Penggantian crown block sheave di puncak menara bor pada ketinggian 45 meter.' },
];

interface Toast {
    message: string;
    type: 'success' | 'error' | 'info';
}

interface ConfirmAction {
    permitId: string;
    permitType: string;
    applicant: string;
    action: 'Disetujui' | 'Ditolak';
}

export default function Management() {
    const { user } = useAuth();
    const [permits, setPermits] = useState<Permit[]>(INITIAL_PERMITS);
    const [toast, setToast] = useState<Toast | null>(null);
    const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
    const [expandedPermit, setExpandedPermit] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Live clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const showToast = (message: string, type: Toast['type']) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const executePermitAction = () => {
        if (!confirmAction) return;
        const { permitId, action } = confirmAction;
        setPermits(permits.map(p => p.id === permitId ? { ...p, status: action } : p));

        if (action === 'Disetujui') {
            showToast(`Izin kerja ${permitId} telah DISETUJUI. Kru dapat melanjutkan pekerjaan.`, 'success');
        } else {
            showToast(`Izin kerja ${permitId} DITOLAK. Kru harus mengajukan ulang dengan perbaikan.`, 'error');
        }
        setConfirmAction(null);
    };

    const pendingCount = permits.filter(p => p.status === 'Pending').length;
    const approvedCount = permits.filter(p => p.status === 'Disetujui').length;
    const rejectedCount = permits.filter(p => p.status === 'Ditolak').length;

    const toastStyles: Record<Toast['type'], string> = {
        success: 'bg-green-900/90 border-green-500/50 text-green-100',
        error: 'bg-red-900/90 border-red-500/50 text-red-100',
        info: 'bg-navy-900/90 border-gold-500/50 text-sand-50',
    };
    const toastIcons: Record<Toast['type'], string> = {
        success: 'fa-check-circle text-green-400',
        error: 'fa-times-circle text-red-400',
        info: 'fa-info-circle text-gold-400',
    };

    return (
        <div className="bg-sand-100 min-h-screen pb-20">
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-24 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl border animate-fade-in text-sm font-medium flex items-center gap-3 max-w-sm ${toastStyles[toast.type]}`}>
                    <i className={`fas ${toastIcons[toast.type]} text-lg shrink-0`}></i>
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Confirmation Modal */}
            {confirmAction && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmAction(null)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in border border-sand-200">
                        {/* Icon */}
                        <div className="flex justify-center mb-5">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${confirmAction.action === 'Disetujui' ? 'bg-green-100' : 'bg-red-100'}`}>
                                <i className={`fas ${confirmAction.action === 'Disetujui' ? 'fa-check-circle text-green-600' : 'fa-exclamation-triangle text-red-600'} text-3xl`}></i>
                            </div>
                        </div>

                        <h3 className="text-xl font-black text-navy-900 text-center mb-2">
                            {confirmAction.action === 'Disetujui' ? 'Setujui Izin Kerja?' : 'Tolak Izin Kerja?'}
                        </h3>
                        <p className="text-sm text-navy-600 text-center mb-6 leading-relaxed">
                            {confirmAction.action === 'Disetujui'
                                ? <>Anda akan menyetujui <span className="font-bold text-navy-900">{confirmAction.permitType}</span> yang diajukan oleh <span className="font-bold text-navy-900">{confirmAction.applicant}</span>. Kru akan diizinkan memulai pekerjaan di area terkait.</>
                                : <>Anda akan menolak <span className="font-bold text-navy-900">{confirmAction.permitType}</span> yang diajukan oleh <span className="font-bold text-navy-900">{confirmAction.applicant}</span>. Kru harus mengajukan ulang izin dengan perbaikan.</>
                            }
                        </p>

                        <div className="flex gap-3">
                            <button onClick={() => setConfirmAction(null)}
                                className="flex-1 px-4 py-3 bg-sand-100 text-navy-900 border border-sand-200 rounded-xl font-bold text-sm hover:bg-sand-200 transition">
                                Batal
                            </button>
                            <button onClick={executePermitAction}
                                className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition shadow-md ${confirmAction.action === 'Disetujui'
                                    ? 'bg-green-500 hover:bg-green-600 text-white'
                                    : 'bg-red-500 hover:bg-red-600 text-white'
                                    }`}>
                                <i className={`fas ${confirmAction.action === 'Disetujui' ? 'fa-check' : 'fa-times'} mr-1.5`}></i>
                                {confirmAction.action === 'Disetujui' ? 'Ya, Setujui' : 'Ya, Tolak'}
                            </button>
                        </div>
                    </div>
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
                                <i className="fas fa-shield-alt text-green-400 text-lg"></i>
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
                        {/* Live Clock */}
                        <div className="bg-navy-800/60 border border-navy-700 px-5 py-3 rounded-xl flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                                <i className="fas fa-clock text-purple-400 text-lg"></i>
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-gold-400 font-bold uppercase tracking-wider">Waktu Rig (WIB)</p>
                                <p className="text-sand-50 font-black font-mono">{currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">

                {/* PTW Summary Cards */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl border border-sand-200 p-4 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
                            <i className="fas fa-hourglass-half text-yellow-600 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-navy-900">{pendingCount}</p>
                            <p className="text-xs font-bold text-navy-600 uppercase tracking-wider">Menunggu</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-sand-200 p-4 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                            <i className="fas fa-check-circle text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-navy-900">{approvedCount}</p>
                            <p className="text-xs font-bold text-navy-600 uppercase tracking-wider">Disetujui</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-sand-200 p-4 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                            <i className="fas fa-times-circle text-red-600 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-navy-900">{rejectedCount}</p>
                            <p className="text-xs font-bold text-navy-600 uppercase tracking-wider">Ditolak</p>
                        </div>
                    </div>
                </div>

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
                                    <div key={permit.id} className={`border rounded-xl p-4 transition ${permit.status === 'Disetujui' ? 'border-green-200 bg-green-50/30' :
                                        permit.status === 'Ditolak' ? 'border-red-200 bg-red-50/30' :
                                            'border-sand-200 bg-sand-50/50 hover:border-gold-500/50'
                                        }`}>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <span className="text-xs font-black text-navy-900 bg-sand-200 px-2 py-0.5 rounded">{permit.id}</span>
                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${permit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        permit.status === 'Disetujui' ? 'bg-green-100 text-green-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                        <i className={`fas ${permit.status === 'Pending' ? 'fa-clock' :
                                                            permit.status === 'Disetujui' ? 'fa-check' :
                                                                'fa-times'
                                                            } mr-1`}></i>
                                                        {permit.status}
                                                    </span>
                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${permit.risk === 'Tinggi' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-orange-50 text-orange-700 border border-orange-200'
                                                        }`}>
                                                        <i className="fas fa-exclamation-triangle mr-1"></i>Risiko {permit.risk}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-navy-900">{permit.type}</h3>
                                                <p className="text-sm text-navy-600 mt-1">
                                                    <i className="fas fa-user mr-1.5 text-navy-500"></i>{permit.applicant} &nbsp;&bull;&nbsp;
                                                    <i className="fas fa-map-marker-alt mx-1.5 text-gold-500"></i>{permit.location} &nbsp;&bull;&nbsp;
                                                    <i className="fas fa-calendar-alt mx-1.5 text-navy-500"></i>{permit.date}
                                                </p>

                                                {/* Expandable Detail */}
                                                <button onClick={() => setExpandedPermit(expandedPermit === permit.id ? null : permit.id)}
                                                    className="text-xs text-gold-600 font-bold mt-2 hover:text-gold-500 transition flex items-center gap-1">
                                                    <i className={`fas fa-chevron-${expandedPermit === permit.id ? 'up' : 'down'} text-[10px]`}></i>
                                                    {expandedPermit === permit.id ? 'Sembunyikan Detail' : 'Lihat Detail Pekerjaan'}
                                                </button>
                                                {expandedPermit === permit.id && (
                                                    <div className="mt-2 p-3 bg-sand-100 rounded-lg border border-sand-200 text-xs text-navy-700 leading-relaxed animate-fade-in">
                                                        <span className="font-bold text-navy-900">Deskripsi Pekerjaan:</span> {permit.description}
                                                    </div>
                                                )}
                                            </div>

                                            {permit.status === 'Pending' && (
                                                <div className="flex gap-2 shrink-0">
                                                    <button onClick={() => setConfirmAction({ permitId: permit.id, permitType: permit.type, applicant: permit.applicant, action: 'Disetujui' })}
                                                        className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold text-sm hover:bg-green-600 transition shadow-sm">
                                                        <i className="fas fa-check mr-1.5"></i>Setujui
                                                    </button>
                                                    <button onClick={() => setConfirmAction({ permitId: permit.id, permitType: permit.type, applicant: permit.applicant, action: 'Ditolak' })}
                                                        className="px-4 py-2 bg-white text-red-500 border border-red-200 rounded-lg font-bold text-sm hover:bg-red-50 transition shadow-sm">
                                                        <i className="fas fa-times mr-1.5"></i>Tolak
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
                                <button onClick={() => showToast('Deklarasi cuaca buruk telah diaktifkan. Semua operasi luar ruangan dihentikan sementara.', 'info')}
                                    className="w-full bg-navy-800 hover:bg-navy-700 border border-navy-600 hover:border-gold-500/50 text-left px-4 py-3 rounded-xl transition flex items-center justify-between group">
                                    <span className="font-semibold text-sm text-sand-100">Deklarasi Cuaca Buruk</span>
                                    <i className="fas fa-cloud-showers-heavy text-sand-200 group-hover:text-gold-500 transition"></i>
                                </button>
                                <button onClick={() => showToast('Perintah penghentian pengeboran telah dikirim ke Driller. Menunggu konfirmasi dari Drill Cabin.', 'info')}
                                    className="w-full bg-navy-800 hover:bg-navy-700 border border-navy-600 hover:border-gold-500/50 text-left px-4 py-3 rounded-xl transition flex items-center justify-between group">
                                    <span className="font-semibold text-sm text-sand-100">Hentikan Pengeboran</span>
                                    <i className="fas fa-hand-paper text-sand-200 group-hover:text-gold-500 transition"></i>
                                </button>
                                <button onClick={() => showToast('⚠️ ALARM EVAKUASI DIBUNYIKAN! Semua kru menuju Muster Station terdekat!', 'error')}
                                    className="w-full bg-red-900/30 hover:bg-red-600 border border-red-500/30 hover:border-red-500 text-red-400 hover:text-white text-left px-4 py-3 rounded-xl transition flex items-center justify-between group">
                                    <span className="font-semibold text-sm">BUNYIKAN ALARM EVAKUASI</span>
                                    <i className="fas fa-bullhorn transition"></i>
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-sand-200 shadow-md p-6">
                            <h2 className="text-lg font-black text-navy-900 mb-4 flex items-center gap-2">
                                <i className="fas fa-history text-gold-500"></i>Log Aktivitas Terbaru
                            </h2>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                                        <i className="fas fa-helicopter text-gold-600 text-xs"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-navy-900">Helikopter H225 mendarat</p>
                                        <p className="text-xs text-navy-600">Membawa 12 kru shift baru &bull; 10:45 AM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                        <i className="fas fa-cogs text-blue-600 text-xs"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-navy-900">Inspeksi Generator Selesai</p>
                                        <p className="text-xs text-navy-600">Oleh Chief Engineer &bull; 09:30 AM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                        <i className="fas fa-cloud-sun text-green-600 text-xs"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-navy-900">Laporan Cuaca Diterima</p>
                                        <p className="text-xs text-navy-600">Gelombang 2 meter, angin tenang &bull; 06:00 AM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                        <i className="fas fa-ship text-purple-600 text-xs"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-navy-900">Supply Vessel merapat</p>
                                        <p className="text-xs text-navy-600">Bongkar muat 15 ton material &bull; 05:00 AM</p>
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
