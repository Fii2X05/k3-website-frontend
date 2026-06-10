import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface Incident {
  id: string;
  date: string;
  reporter: string;
  location: string;
  category: string;
  severity: 'Rendah' | 'Sedang' | 'Tinggi' | 'Kritis';
  description: string;
  status: 'Terbuka' | 'Investigasi' | 'Tindakan' | 'Selesai';
  action: string;
}

const LOCATIONS = ['Weather Deck', 'Drill Floor', 'Engineering L1', 'Engineering L2', 'Engineering L3', 'Under Rig', 'Helipad', 'Accommodation', 'Galley', 'Cabin Floor'];
const CATEGORIES = ['Near Miss', 'Kecelakaan Kerja', 'Kebocoran Gas', 'Tumpahan Minyak', 'Kegagalan Peralatan', 'Kebakaran', 'Jatuh dari Ketinggian', 'Paparan Bahan Kimia'];
const SEVERITIES: Incident['severity'][] = ['Rendah', 'Sedang', 'Tinggi', 'Kritis'];
const STATUSES: Incident['status'][] = ['Terbuka', 'Investigasi', 'Tindakan', 'Selesai'];

const SEED_DATA: Incident[] = [
  { id: 'INC-2026-001', date: '2026-06-01', reporter: 'Grant', location: 'Drill Floor', category: 'Near Miss', severity: 'Sedang', description: 'Pipa bor nyaris terlepas dari klem saat proses tripping akibat torsi yang tidak terkalibrasi.', status: 'Selesai', action: 'Kalibrasi ulang seluruh klem dan briefing keselamatan kepada tim pengeboran.' },
  { id: 'INC-2026-002', date: '2026-06-03', reporter: 'Douglas Dunbar', location: 'Engineering L3', category: 'Kegagalan Peralatan', severity: 'Tinggi', description: 'Generator #2 mengalami overheat dan shutdown otomatis. Indikator suhu menunjukkan 120°C.', status: 'Tindakan', action: 'Penggantian pompa pendingin dan inspeksi radiator sedang dilaksanakan.' },
  { id: 'INC-2026-003', date: '2026-06-05', reporter: 'Nicole Hall', location: 'Engineering L1', category: 'Kebocoran Gas', severity: 'Kritis', description: 'Detektor H2S di area Gas Separation menunjukkan konsentrasi 12ppm (batas aman: 10ppm). Evakuasi parsial dilakukan.', status: 'Investigasi', action: 'Tim investigasi sedang memeriksa integritas seal pada katup utama.' },
  { id: 'INC-2026-004', date: '2026-06-06', reporter: 'Sunil', location: 'Weather Deck', category: 'Jatuh dari Ketinggian', severity: 'Rendah', description: 'Roustabout terpeleset di tangga basah menuju crane platform. Tidak ada cedera serius, hanya lecet ringan.', status: 'Selesai', action: 'Anti-slip tape dipasang di seluruh tangga Weather Deck.' },
  { id: 'INC-2026-005', date: '2026-06-07', reporter: 'Cameron "Caz" McLeary', location: 'Under Rig', category: 'Paparan Bahan Kimia', severity: 'Sedang', description: 'Percikan cairan hidrolik mengenai lengan teknisi saat perawatan BOP. APD dipakai lengkap, tidak ada luka.', status: 'Terbuka', action: '' },
];

const severityColor = (s: string) => {
  switch (s) {
    case 'Rendah': return 'bg-green-100 text-green-800 border-green-300';
    case 'Sedang': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Tinggi': return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'Kritis': return 'bg-red-100 text-red-800 border-red-300';
    default: return 'bg-sand-200 text-navy-900';
  }
};

const statusColor = (s: string) => {
  switch (s) {
    case 'Terbuka': return 'bg-red-500';
    case 'Investigasi': return 'bg-yellow-500';
    case 'Tindakan': return 'bg-blue-500';
    case 'Selesai': return 'bg-green-500';
    default: return 'bg-sand-500';
  }
};

const statusIcon = (s: string) => {
  switch (s) {
    case 'Terbuka': return 'fa-exclamation-circle';
    case 'Investigasi': return 'fa-search';
    case 'Tindakan': return 'fa-wrench';
    case 'Selesai': return 'fa-check-circle';
    default: return 'fa-question-circle';
  }
};

export default function IncidentReport() {
  const { user } = useAuth();
  const isManagement = user?.role === 'management';

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [view, setView] = useState<'dashboard' | 'form' | 'detail'>('dashboard');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [editStatusId, setEditStatusId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [toast, setToast] = useState<string | null>(null);

  // Form state — pre-fill reporter from logged-in user
  const [formData, setFormData] = useState({
    reporter: user?.name || '',
    location: LOCATIONS[0],
    category: CATEGORIES[0],
    severity: 'Sedang' as Incident['severity'],
    description: '',
    action: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('beira_incidents');
    if (stored) {
      setIncidents(JSON.parse(stored));
    } else {
      setIncidents(SEED_DATA);
      localStorage.setItem('beira_incidents', JSON.stringify(SEED_DATA));
    }
  }, []);

  const saveIncidents = (data: Incident[]) => {
    setIncidents(data);
    localStorage.setItem('beira_incidents', JSON.stringify(data));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = () => {
    if (!formData.reporter.trim() || !formData.description.trim()) {
      showToast('⚠️ Harap isi Nama Pelapor dan Deskripsi Insiden.');
      return;
    }
    const newIncident: Incident = {
      id: `INC-2026-${String(incidents.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      reporter: formData.reporter,
      location: formData.location,
      category: formData.category,
      severity: formData.severity,
      description: formData.description,
      status: 'Terbuka',
      action: '',
    };
    saveIncidents([newIncident, ...incidents]);
    setFormData({ reporter: '', location: LOCATIONS[0], category: CATEGORIES[0], severity: 'Sedang', description: '', action: '' });
    showToast('✅ Laporan insiden berhasil dikirim ke server.');
    setView('dashboard');
  };

  const updateStatus = (id: string, newStatus: Incident['status']) => {
    const updated = incidents.map(inc => inc.id === id ? { ...inc, status: newStatus } : inc);
    saveIncidents(updated);
    setEditStatusId(null);
    if (selectedIncident?.id === id) setSelectedIncident({ ...selectedIncident, status: newStatus });
    showToast(`✅ Status ${id} diperbarui menjadi "${newStatus}".`);
  };

  const deleteIncident = (id: string) => {
    saveIncidents(incidents.filter(inc => inc.id !== id));
    if (selectedIncident?.id === id) { setSelectedIncident(null); setView('dashboard'); }
    showToast(`🗑️ Insiden ${id} berhasil dihapus dari database.`);
  };

  const filtered = filterStatus === 'Semua' ? incidents : incidents.filter(i => i.status === filterStatus);
  const stats = {
    total: incidents.length,
    open: incidents.filter(i => i.status === 'Terbuka').length,
    investigating: incidents.filter(i => i.status === 'Investigasi').length,
    critical: incidents.filter(i => i.severity === 'Kritis').length,
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-sand-50 mb-4">Sistem Pelaporan Insiden</h1>
          <p className="text-sand-500 max-w-2xl mx-auto text-lg">Catat, lacak, dan kelola insiden keselamatan secara real-time untuk menjamin keselamatan kru di atas anjungan.</p>
          {user && (
            <div className="mt-4 inline-flex items-center gap-2 bg-navy-800/60 border border-gold-500/20 px-4 py-2 rounded-full">
              <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center text-navy-950 text-xs font-black">{user.avatar}</div>
              <span className="text-sand-200 text-sm font-semibold">{user.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isManagement ? 'bg-gold-500/20 text-gold-300' : 'bg-blue-500/20 text-blue-300'}`}>
                {isManagement ? 'Akses Penuh' : 'Akses Terbatas'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={() => { setView('dashboard'); setSelectedIncident(null); }} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${view === 'dashboard' ? 'bg-navy-900 text-sand-50 shadow-lg' : 'bg-white text-navy-900 border border-sand-200 hover:bg-sand-50'}`}>
            <i className="fas fa-chart-bar mr-2"></i>Dashboard
          </button>
          <button onClick={() => setView('form')} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${view === 'form' ? 'bg-navy-900 text-sand-50 shadow-lg' : 'bg-white text-navy-900 border border-sand-200 hover:bg-sand-50'}`}>
            <i className="fas fa-plus-circle mr-2"></i>Lapor Insiden Baru
          </button>
        </div>

        {/* ── DASHBOARD VIEW ── */}
        {(view === 'dashboard' && !selectedIncident) && (
          <div className="animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Insiden', value: stats.total, icon: 'fa-clipboard-list', color: 'text-navy-600', bg: 'bg-navy-100' },
                { label: 'Terbuka', value: stats.open, icon: 'fa-exclamation-circle', color: 'text-red-600', bg: 'bg-red-100' },
                { label: 'Dalam Investigasi', value: stats.investigating, icon: 'fa-search', color: 'text-yellow-600', bg: 'bg-yellow-100' },
                { label: 'Kritis Aktif', value: stats.critical, icon: 'fa-radiation', color: 'text-red-700', bg: 'bg-red-50' },
              ].map(stat => (
                <div key={stat.label} className="bg-white p-5 rounded-2xl border border-sand-200 shadow-sm hover:-translate-y-1 transition-transform">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <i className={`fas ${stat.icon} ${stat.color}`}></i>
                  </div>
                  <div className="text-3xl font-black text-navy-900">{stat.value}</div>
                  <div className="text-xs text-navy-800/60 font-semibold mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Filter */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm font-bold text-navy-800 mr-1"><i className="fas fa-filter mr-1"></i>Filter:</span>
              {['Semua', ...STATUSES].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${filterStatus === s ? 'bg-navy-900 text-sand-50 border-navy-900' : 'bg-white text-navy-800 border-sand-200 hover:bg-sand-50'}`}>{s}</button>
              ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-sand-200 shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy-900 text-sand-50">
                      <th className="px-4 py-3 text-left font-bold">ID</th>
                      <th className="px-4 py-3 text-left font-bold">Tanggal</th>
                      <th className="px-4 py-3 text-left font-bold hidden md:table-cell">Lokasi</th>
                      <th className="px-4 py-3 text-left font-bold hidden lg:table-cell">Kategori</th>
                      <th className="px-4 py-3 text-center font-bold">Severity</th>
                      <th className="px-4 py-3 text-center font-bold">Status</th>
                      <th className="px-4 py-3 text-center font-bold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 && (
                      <tr><td colSpan={7} className="text-center py-12 text-navy-800/50">Tidak ada data insiden.</td></tr>
                    )}
                    {filtered.map((inc, i) => (
                      <tr key={inc.id} className={`border-b border-sand-100 hover:bg-sand-50 transition ${i % 2 === 0 ? 'bg-white' : 'bg-sand-50/50'}`}>
                        <td className="px-4 py-3 font-bold text-navy-900">{inc.id}</td>
                        <td className="px-4 py-3 text-navy-800/80">{inc.date}</td>
                        <td className="px-4 py-3 text-navy-800/80 hidden md:table-cell">{inc.location}</td>
                        <td className="px-4 py-3 text-navy-800/80 hidden lg:table-cell">{inc.category}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded-md text-xs font-bold border ${severityColor(inc.severity)}`}>{inc.severity}</span>
                        </td>
                        <td className="px-4 py-3 text-center relative">
                          {isManagement && editStatusId === inc.id ? (
                            <div className="flex flex-col gap-1 absolute z-20 bg-white border border-sand-200 rounded-xl shadow-xl p-2 -left-4 top-0 min-w-[140px]">
                              {STATUSES.map(s => (
                                <button key={s} onClick={() => updateStatus(inc.id, s)} className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-sand-50 ${inc.status === s ? 'bg-navy-100 font-bold' : ''}`}>
                                  <i className={`fas ${statusIcon(s)} mr-1.5`}></i>{s}
                                </button>
                              ))}
                              <button onClick={() => setEditStatusId(null)} className="text-xs text-red-500 mt-1 font-bold">Batal</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => isManagement ? setEditStatusId(inc.id) : showToast('⚠️ Hanya Manajemen yang dapat mengubah status insiden.')}
                              className="flex items-center gap-1.5 mx-auto group"
                              title={isManagement ? 'Klik untuk ubah status' : 'Akses terbatas'}
                            >
                              <span className={`w-2.5 h-2.5 rounded-full ${statusColor(inc.status)} ${isManagement ? 'group-hover:animate-pulse' : ''}`}></span>
                              <span className="text-xs font-semibold text-navy-800 group-hover:text-navy-600">{inc.status}</span>
                              {!isManagement && <i className="fas fa-lock text-sand-500 text-[10px]"></i>}
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => { setSelectedIncident(inc); setView('detail'); }} className="w-7 h-7 bg-navy-100 text-navy-700 rounded-lg hover:bg-navy-900 hover:text-sand-50 transition flex items-center justify-center" title="Detail">
                              <i className="fas fa-eye text-xs"></i>
                            </button>
                            {isManagement ? (
                              <button onClick={() => deleteIncident(inc.id)} className="w-7 h-7 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition flex items-center justify-center" title="Hapus">
                                <i className="fas fa-trash text-xs"></i>
                              </button>
                            ) : (
                              <button title="Akses terbatas" className="w-7 h-7 bg-sand-100 text-sand-500 rounded-lg flex items-center justify-center cursor-not-allowed" onClick={() => showToast('⚠️ Hanya Manajemen yang dapat menghapus laporan.')}>
                                <i className="fas fa-lock text-xs"></i>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-navy-800/40 mt-3 text-right italic"><i className="fas fa-database mr-1"></i>Sumber data: API Server PT Beira Deep (Realtime Sync)</p>
          </div>
        )}

        {/* ── DETAIL VIEW ── */}
        {(view === 'detail' && selectedIncident) && (
          <div className="animate-fade-in">
            <button onClick={() => { setView('dashboard'); setSelectedIncident(null); }} className="text-sm text-navy-600 hover:text-navy-900 font-bold mb-6 inline-flex items-center gap-2">
              <i className="fas fa-arrow-left"></i>Kembali ke Dashboard
            </button>
            <div className="bg-white rounded-2xl border border-sand-200 shadow-md p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-6 border-b border-sand-200">
                <div>
                  <h2 className="text-2xl font-black text-navy-900">{selectedIncident.id}</h2>
                  <p className="text-sm text-navy-800/60 mt-1">{selectedIncident.date} &bull; Dilaporkan oleh <strong>{selectedIncident.reporter}</strong></p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${severityColor(selectedIncident.severity)}`}>{selectedIncident.severity}</span>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white ${statusColor(selectedIncident.status)}`}><i className={`fas ${statusIcon(selectedIncident.status)} mr-1`}></i>{selectedIncident.status}</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div><span className="text-xs text-navy-800/50 font-bold uppercase tracking-wider">Lokasi</span><p className="text-navy-900 font-semibold mt-1"><i className="fas fa-map-marker-alt text-gold-500 mr-2"></i>{selectedIncident.location}</p></div>
                <div><span className="text-xs text-navy-800/50 font-bold uppercase tracking-wider">Kategori</span><p className="text-navy-900 font-semibold mt-1"><i className="fas fa-tag text-gold-500 mr-2"></i>{selectedIncident.category}</p></div>
              </div>
              <div className="mb-6">
                <span className="text-xs text-navy-800/50 font-bold uppercase tracking-wider">Deskripsi Insiden</span>
                <p className="text-navy-800/80 mt-2 leading-relaxed bg-sand-50 p-4 rounded-xl border border-sand-200">{selectedIncident.description}</p>
              </div>
              <div>
                <span className="text-xs text-navy-800/50 font-bold uppercase tracking-wider">Tindakan Korektif</span>
                <p className="text-navy-800/80 mt-2 leading-relaxed bg-sand-50 p-4 rounded-xl border border-sand-200">{selectedIncident.action || <span className="italic text-navy-800/40">Belum ada tindakan korektif yang dicatat.</span>}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── FORM VIEW ── */}
        {view === 'form' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-sand-200 shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-black text-navy-900 mb-1">Formulir Laporan Insiden Baru</h2>
              <p className="text-sm text-navy-800/60 mb-8">Isi formulir di bawah ini untuk mengirim laporan insiden ke sistem HSE pusat.</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-navy-900 mb-1.5">Nama Pelapor <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.reporter}
                    onChange={e => setFormData({ ...formData, reporter: e.target.value })}
                    readOnly={!!user}
                    placeholder="Masukkan nama lengkap pelapor"
                    className={`w-full px-4 py-3 rounded-xl border border-sand-200 bg-sand-50 text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500 transition ${user ? 'opacity-70 cursor-not-allowed' : ''}`}
                  />
                  {user && <p className="text-xs text-navy-800/50 mt-1"><i className="fas fa-info-circle mr-1"></i>Nama pelapor otomatis diisi dari akun Anda.</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-1.5">Lokasi Kejadian</label>
                    <select value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-sand-50 text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500 transition">
                      {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-1.5">Kategori Insiden</label>
                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-sand-50 text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500 transition">
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy-900 mb-1.5">Tingkat Keparahan (Severity)</label>
                  <div className="flex flex-wrap gap-2">
                    {SEVERITIES.map(s => (
                      <button key={s} type="button" onClick={() => setFormData({ ...formData, severity: s })} className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition ${formData.severity === s ? `${severityColor(s)} ring-2 ring-offset-1 ring-navy-900` : 'bg-white text-navy-800 border-sand-200 hover:bg-sand-50'}`}>{s}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy-900 mb-1.5">Deskripsi Insiden <span className="text-red-500">*</span></label>
                  <textarea rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Jelaskan kronologis kejadian secara detail..." className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-sand-50 text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500 transition resize-none"></textarea>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-sand-200">
                  <button onClick={handleSubmit} className="px-8 py-3 bg-navy-900 text-sand-50 rounded-xl font-bold text-sm hover:bg-navy-800 transition shadow-lg hover:shadow-xl">
                    <i className="fas fa-paper-plane mr-2"></i>Kirim Laporan
                  </button>
                  <button onClick={() => setView('dashboard')} className="px-6 py-3 bg-sand-200 text-navy-900 rounded-xl font-bold text-sm hover:bg-sand-100 transition">Batal</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
