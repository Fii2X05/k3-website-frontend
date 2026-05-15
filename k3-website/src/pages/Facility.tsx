import { useState, useEffect } from 'react';

export default function Facility() {
  const [activeTab, setActiveTab] = useState('overview');

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

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const facilityTabs = [
    { id: 'overview', label: 'Tinjauan Umum Rig (Overview)' },
    { id: 'under', label: 'Struktur Bawah (Under Rig)' },
    { id: 'weather', label: 'Dek Cuaca (Weather Deck)' },
    { id: 'eng1', label: 'Engineering L1 (Gas Separation)' },
    { id: 'eng2', label: 'Engineering L2 (Water Tanks)' },
    { id: 'eng3', label: 'Engineering L3 (Pump & Gen)' },
    { id: 'utility', label: 'Lantai Utilitas (Utility Floor)' },
    { id: 'cabin', label: 'Lantai Kabin (Cabin Floor)' },
  ];

  const hazardData = [
    { loc: 'Gudang Peralatan', src: 'Rak dan lemari penyimpanan', factor: 'Penataan barang tidak rapi', type: 'Fisik (barang jatuh)', prevent: 'Label penyimpanan dan inspeksi rak', ppe: 'Helm keselamatan, sepatu safety' },
    { loc: 'Area Pengeboran (Drilling Floor)', src: 'Mesin bor dan pipa bor', factor: 'Operasi mesin berat', type: 'Mekanik', prevent: 'SOP pengeboran dan pengawasan operator', ppe: 'Helm, sarung tangan, sepatu safety' },
    { loc: 'Ruang Mesin (Engine Room)', src: 'Generator dan mesin diesel', factor: 'Suhu tinggi dan kebisingan', type: 'Fisik', prevent: 'Ventilasi dan perawatan mesin berkala', ppe: 'Earplug, helm, sepatu safety' },
    { loc: 'Ruang Kontrol', src: 'Peralatan elektronik', factor: 'Gangguan sistem listrik', type: 'Listrik', prevent: 'Grounding dan pengecekan sistem listrik', ppe: 'Sarung tangan isolasi' },
    { loc: 'Area Penyimpanan Bahan Kimia', src: 'Tangki bahan kimia', factor: 'Kebocoran bahan kimia', type: 'Kimia', prevent: 'Ventilasi dan prosedur penanganan bahan kimia', ppe: 'Masker respirator, sarung tangan' },
    { loc: 'Area Pengolahan Gas', src: 'Gas bertekanan tinggi', factor: 'Kebocoran pipa gas', type: 'Ledakan / kebakaran', prevent: 'Gas detector dan sistem alarm', ppe: 'SCBA, helm' },
    { loc: 'Helipad', src: 'Aktivitas helikopter', factor: 'Kesalahan prosedur pendaratan', type: 'Mekanik', prevent: 'Prosedur keselamatan penerbangan', ppe: 'Helm, rompi reflektif' },
    { loc: 'Area Pemadam Kebakaran', src: 'Tangki bahan bakar', factor: 'Percikan api', type: 'Kebakaran', prevent: 'APAR dan sistem hydrant', ppe: 'Fire suit' },
    { loc: 'Ruang Panel Listrik', src: 'Panel distribusi listrik', factor: 'Korsleting', type: 'Listrik', prevent: 'Inspeksi instalasi listrik berkala', ppe: 'Sarung tangan listrik' },
    { loc: 'Ruang Kompresor', src: 'Mesin kompresor', factor: 'Tekanan tinggi', type: 'Mekanik', prevent: 'Perawatan berkala', ppe: 'Helm, earplug' },
    { loc: 'Tangga dan Koridor', src: 'Lantai licin', factor: 'Tumpahan minyak', type: 'Fisik (terpeleset)', prevent: 'Pembersihan rutin dan tanda peringatan', ppe: 'Sepatu anti slip' },
    { loc: 'Area Pengolahan Limbah', src: 'Limbah minyak dan bahan kimia', factor: 'Pengelolaan limbah tidak tepat', type: 'Kimia', prevent: 'Sistem pengolahan limbah', ppe: 'Masker, sarung tangan' },
    { loc: 'Ruang Penyimpanan BBM', src: 'Tangki bahan bakar', factor: 'Kebocoran tangki', type: 'Kebakaran', prevent: 'Sistem deteksi kebakaran', ppe: 'Helm, sarung tangan tahan panas' },
    { loc: 'Ruang Pompa', src: 'Pompa tekanan tinggi', factor: 'Kerusakan mekanik', type: 'Mekanik', prevent: 'Maintenance berkala', ppe: 'Helm, sepatu safety' },
    { loc: 'Area Loading', src: 'Selang transfer minyak', factor: 'Kebocoran saat transfer', type: 'Kimia / kebakaran', prevent: 'Prosedur transfer aman', ppe: 'Sarung tangan, helm' },
    { loc: 'Area Crane', src: 'Crane pengangkat barang', factor: 'Beban berlebih', type: 'Mekanik', prevent: 'Batas beban crane', ppe: 'Helm, sepatu safety' },
    { loc: 'Ruang Server', src: 'Perangkat server', factor: 'Overheating', type: 'Listrik', prevent: 'Pendingin ruangan dan monitoring suhu', ppe: 'Sarung tangan antistatik' },
    { loc: 'Area Workshop', src: 'Peralatan las', factor: 'Percikan api', type: 'Kebakaran', prevent: 'SOP pengelasan', ppe: 'Kacamata las, sarung tangan' },
    { loc: 'Area Dek Kapal', src: 'Permukaan basah', factor: 'Air laut dan hujan', type: 'Fisik', prevent: 'Lapisan anti slip', ppe: 'Sepatu anti slip' },
    { loc: 'Ruang Istirahat Kru', src: 'Peralatan listrik kecil', factor: 'Penggunaan listrik tidak aman', type: 'Listrik', prevent: 'Pemeriksaan instalasi listrik', ppe: 'Standar keselamatan umum' }
  ];

  const renderFacilityContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white group bg-sand-50">
              <img src="/images/overview.jpg" alt="Rig Overview" className="w-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-in-out" />
            </div>
            {/* Teks dipisah dari gambar agar tidak bertabrakan */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-sand-200 shadow-md">
                <h4 className="text-2xl font-black text-navy-900 mb-2">Rig Laut Dalam (Overview)</h4>
                <p className="text-navy-800/80 leading-relaxed mb-4">
                  Struktur rig BEIRA D ditopang oleh 4 kaki ponton utama untuk menjaga stabilitas optimal di laut dalam yang ekstrem. 
                  Zona utama di atas struktur meliputi <strong className="text-navy-900">Processing Quad</strong>, <strong className="text-navy-900">Weather Deck</strong>, 
                  <strong className="text-navy-900">Menara Derrick</strong>, dan <strong className="text-navy-900">Area Akomodasi</strong>.
                </p>
                <div className="p-4 bg-sand-50 border-l-4 border-gold-500 text-sm">
                    <strong>Sinkronisasi K3:</strong> Karena setiap zona memiliki tingkat bahaya operasional yang berbeda, silakan rujuk ke <strong>Tabel Database Keselamatan</strong> di bawah (seperti <em>Area Dek Kapal</em> atau <em>Tangga dan Koridor</em>) untuk mengetahui potensi risiko fisik dan kewajiban APD secara ketat saat melintasi zona transisi ini.
                </div>
            </div>
          </div>
        );
      case 'under':
        return (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white group bg-sand-50 flex items-center justify-center p-4">
              <img src="/images/under_rig.jpg" alt="Under Rig Map" className="w-full max-h-[500px] object-contain drop-shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500 ease-out" />
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-sand-200 shadow-md">
                <h4 className="text-2xl font-black text-navy-900 mb-4 border-b-2 border-gold-500 pb-2 inline-block">Struktur Bawah (Under Rig)</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-layer-group text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Legs A-D</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Pilar penyangga utama struktur rig yang tertanam di dasar laut.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-water text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Dive Deck</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Titik akses untuk operasi penyelaman komersial dan ROV.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-oil-well text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Drill Area</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Pusat pengeboran bawah laut yang terpapar risiko operasional tinggi.</div>
                        </div>
                    </div>
                </div>
                <p className="text-navy-800/80 mb-4 leading-relaxed">
                  Area ini berbatasan langsung dengan laut lepas dan merupakan fondasi utama sistem pengeboran. Angin kencang dan deburan ombak menjadi faktor penyebab risiko fisik yang sangat tinggi.
                </p>
                <div className="p-4 bg-sand-50 border-l-4 border-gold-500 text-navy-800/80 text-sm">
                   <strong>Sinkronisasi K3:</strong> Merujuk pada tabel di bawah untuk <strong>"Area Pengeboran (Drilling Floor)"</strong>, operasi mesin berat pada <em>Drill Area</em> membawa risiko bahaya mekanik. Pengawasan operator, penggunaan helm, dan sepatu safety mutlak diperlukan.
                </div>
            </div>
          </div>
        );
      case 'weather':
        return (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white group bg-sand-50 flex items-center justify-center p-4">
              <img src="/images/weather_deck.jpg" alt="Weather Deck Map" className="w-full max-h-[500px] object-contain drop-shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500 ease-out" />
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-sand-200 shadow-md">
                <h4 className="text-2xl font-black text-navy-900 mb-4 border-b-2 border-gold-500 pb-2 inline-block">Dek Cuaca Utama</h4>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-arrow-circle-up text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Menara Derrick</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Pusat penanganan pipa pengeboran utama berukuran masif.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-fire text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Flare Stack</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Menara pembuangan dan pembakaran gas sisa dengan risiko panas ekstrem.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-cogs text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Processing Quad</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Area pengolahan awal hidrokarbon sesaat setelah diekstraksi.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-helicopter text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Helipad</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Titik pendaratan udara untuk evakuasi darurat dan transportasi kru.</div>
                        </div>
                    </div>
                </div>
                <p className="text-navy-800/80 mb-4 leading-relaxed">
                  Dek Cuaca merupakan pusat aktivitas operasional tingkat atas yang terpapar cuaca langsung. Area ini menggabungkan proses pengolahan awal hingga evakuasi udara.
                </p>
                <div className="p-4 bg-sand-50 border-l-4 border-gold-500 text-navy-800/80 text-sm">
                    <strong>Sinkronisasi K3:</strong> Cek baris <strong>"Helipad"</strong> pada tabel identifikasi lokasi di bawah untuk prosedur keselamatan penerbangan. Selain itu, potensi ledakan di dekat <em>Flare Stack</em> mengharuskan kepatuhan ekstra (Flame Resistant Clothing).
                </div>
            </div>
          </div>
        );
      case 'eng1':
        return (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white group bg-sand-50 flex items-center justify-center p-4">
              <img src="/images/eng1.jpg" alt="Engineering Level 1 Map" className="w-full max-h-[500px] object-contain drop-shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500 ease-out" />
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-sand-200 shadow-md">
                <h4 className="text-2xl font-black text-navy-900 mb-4 border-b-2 border-gold-500 pb-2 inline-block">Engineering L1 (Gas Separation)</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-filter text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Gas Separation</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Fasilitas utama pemisahan gas alam dari cairan hidrokarbon.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-desktop text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Gas Monitor</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Pusat kendali deteksi gas untuk peringatan dini kebocoran.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-cogs text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Eng. Ops</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Ruang operasional teknisi untuk perawatan mesin ringan.</div>
                        </div>
                    </div>
                </div>
                <p className="text-navy-800/80 mb-4 leading-relaxed">
                  Fasilitas krusial untuk pemisahan gas alam dari cairan hidrokarbon. Memiliki risiko paparan gas bertekanan tinggi dan senyawa beracun (seperti H2S).
                </p>
                <div className="p-4 bg-sand-50 border-l-4 border-gold-500 text-navy-800/80 text-sm">
                   <strong>Sinkronisasi K3:</strong> Tabel bahaya mencantumkan area ini dalam kategori <strong>"Area Pengolahan Gas"</strong>. Kebocoran pipa gas dapat memicu ledakan, sehingga pencegahan berupa <em>Gas Detector</em> dan kewajiban APD jenis SCBA adalah mandat absolut.
                </div>
            </div>
          </div>
        );
      case 'eng2':
        return (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white group bg-sand-50 flex items-center justify-center p-4">
              <img src="/images/eng2.jpg" alt="Engineering Level 2 Map" className="w-full max-h-[500px] object-contain drop-shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500 ease-out" />
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-sand-200 shadow-md">
                <h4 className="text-2xl font-black text-navy-900 mb-4 border-b-2 border-gold-500 pb-2 inline-block">Engineering L2 (Water Tanks)</h4>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-water text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Water Tanks</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Infrastruktur tangki air skala besar dan penyimpanan cadangan air bersih.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-door-open text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Exit to Accom.</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Jalur koneksi utama dan akses evakuasi menuju area akomodasi.</div>
                        </div>
                    </div>
                </div>
                <p className="text-navy-800/80 mb-4 leading-relaxed">
                  Lantai L2 menaungi infrastruktur tangki air skala besar dan penyimpanan cadangan air bersih. Lantai ini menjadi jalur koneksi utama antara area kerja teknik dan akomodasi.
                </p>
                <div className="p-4 bg-sand-50 border-l-4 border-gold-500 text-navy-800/80 text-sm">
                   <strong>Sinkronisasi K3:</strong> Mengingat fungsi penyimpanannya, lihat baris <strong>"Ruang Pompa"</strong> dan <strong>"Tangga dan Koridor"</strong> pada tabel identifikasi bahaya. Tumpahan air meningkatkan potensi bahaya fisik (terpeleset), wajib menggunakan sepatu <em>anti slip</em>.
                </div>
            </div>
          </div>
        );
      case 'eng3':
        return (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white group bg-sand-50 flex items-center justify-center p-4">
              <img src="/images/eng3.jpg" alt="Engineering Level 3 Map" className="w-full max-h-[500px] object-contain drop-shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500 ease-out" />
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-sand-200 shadow-md">
                <h4 className="text-2xl font-black text-navy-900 mb-4 border-b-2 border-gold-500 pb-2 inline-block">Engineering L3 (Pump & Generators)</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-bolt text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Generators</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Pusat kelistrikan rig utama dengan tingkat kebisingan sangat tinggi.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-tachometer-alt text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Pump Control</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Sistem monitor tekanan untuk pompa injeksi sumur.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-tint text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Mud Handling</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Area sirkulasi dan pengolahan fluida pengeboran (lumpur).</div>
                        </div>
                    </div>
                </div>
                <p className="text-navy-800/80 mb-4 leading-relaxed">
                  Pusat kelistrikan rig (Generator utama) dan sirkulasi fluida pengeboran (Mud Handling). Area tertutup dengan tingkat kebisingan mesin yang melebihi standar aman pendengaran.
                </p>
                <div className="p-4 bg-sand-50 border-l-4 border-gold-500 text-navy-800/80 text-sm">
                   <strong>Sinkronisasi K3:</strong> Rujuk pada baris <strong>"Ruang Mesin (Engine Room)"</strong> di tabel bawah. Bahaya utama adalah faktor fisik berupa kebisingan ekstrem dan suhu tinggi, menuntut penggunaan perlindungan pendengaran ganda (<em>Earplug</em> & <em>Earmuff</em>).
                </div>
            </div>
          </div>
        );
      case 'utility':
        return (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white group bg-sand-50 flex items-center justify-center p-4">
              <img src="/images/utility_floor.jpg" alt="Utility Floor Map" className="w-full max-h-[500px] object-contain drop-shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500 ease-out" />
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-sand-200 shadow-md">
                 <h4 className="text-2xl font-black text-navy-900 mb-4 border-b-2 border-gold-500 pb-2 inline-block">Lantai Utilitas (Akomodasi)</h4>
                 <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-tshirt text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Ruang Binatu (Laundry)</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Area kebersihan seragam pekerja yang menggunakan mesin heavy-duty.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-door-open text-gold-500 text-2xl mt-1 group-hover:scale-110 transition-transform"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Lifeboats</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Jalur evakuasi sekoci utama jika terjadi skenario 'Abandon Rig'.</div>
                        </div>
                    </div>
                  </div>
                  <div className="p-4 bg-sand-50 border-l-4 border-gold-500 text-navy-800/80 text-sm">
                    <strong>Sinkronisasi K3:</strong> Fasilitas ini mendukung keberlangsungan hidup awak. Lihat baris <strong>"Ruang Istirahat Kru"</strong> pada tabel, bahaya kelistrikan dari peralatan utilitas seperti mesin cuci diwajibkan melalui inspeksi instalasi rutin.
                </div>
            </div>
          </div>
        );
      case 'cabin':
        return (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white group bg-sand-50 flex items-center justify-center p-4">
              <img src="/images/cabin_floor.jpg" alt="Cabin Floor Map" className="w-full max-h-[500px] object-contain drop-shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500 ease-out" />
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-sand-200 shadow-md">
                <h4 className="text-2xl font-black text-navy-900 mb-4 border-b-2 border-gold-500 pb-2 inline-block">Lantai Kabin (Akomodasi)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-bed text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Kabin (101-122)</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Ruang istirahat utama kru dengan sistem kedap suara.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-shower text-gold-500 text-2xl mt-1"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Fasilitas MCK</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Area kebersihan personal kru dengan standar sanitasi ketat.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-navy-900 p-4 rounded-xl shadow-md border border-navy-800 hover:-translate-y-1 transition-transform">
                        <i className="fas fa-briefcase-medical text-red-500 text-2xl mt-1 drop-shadow-md"></i>
                        <div>
                            <div className="text-sand-50 font-bold mb-1">Klinik K3</div>
                            <div className="text-xs text-sand-200 leading-relaxed">Pusat pertolongan pertama (First Aid) dan layanan medis darurat.</div>
                        </div>
                    </div>
                </div>
                
                <p className="text-navy-800/80 mb-4 leading-relaxed">
                  Merupakan "Safe Zone" utama bagi para kru, tempat beristirahat dan berlindung sementara di mana APD operasional dilepas.
                </p>
                <div className="p-4 bg-sand-50 border-l-4 border-gold-500 text-navy-800/80 text-sm">
                    <strong>Sinkronisasi K3:</strong> Sesuai tabel bahaya bagian <strong>"Ruang Istirahat Kru"</strong>, zona ini lebih menonjolkan standar keselamatan umum. Namun, fasilitas <em>Klinik</em> selalu siap siaga sebagai garda terdepan untuk Medical Emergency Response (MER).
                </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-sand-100 min-h-screen">
      {/* Header */}
      <div className="bg-navy-900 py-10 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-black text-sand-50 mb-4">Denah & Identifikasi Fasilitas</h1>
            <p className="text-sand-500 max-w-2xl mx-auto text-lg">Peta struktural rig laut dalam PT Beira Deep dan daftar lengkap identifikasi bahaya di setiap zona operasional.</p>
        </div>
      </div>

      {/* Bagian Denah Visual */}
      <section className="py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 animate-on-scroll">
              <h2 className="text-gold-600 font-bold tracking-[0.2em] uppercase text-sm mb-3">Pemetaan Struktural</h2>
              <h3 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">Eksplorasi Denah Rig</h3>
              <p className="text-navy-800/80 max-w-2xl mx-auto text-lg">Tinjau cetak biru struktur anjungan lepas pantai kami mulai dari dek cuaca hingga fasilitas akomodasi kru.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 md:p-10 rounded-3xl border border-sand-200 shadow-2xl animate-on-scroll">
                
                {/* Tabs Sidebar */}
                <div className="lg:w-1/3 flex flex-col gap-3">
                    {facilityTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`text-left px-5 py-4 rounded-xl font-bold transition-all duration-300 flex justify-between items-center border ${
                                activeTab === tab.id 
                                ? 'bg-navy-900 text-gold-500 shadow-lg border-navy-900 transform scale-[1.02]' 
                                : 'bg-sand-50 text-navy-700 border-sand-200 hover:bg-sand-200 hover:text-navy-900'
                            }`}
                        >
                            <span className="text-sm md:text-base">{tab.label}</span>
                            {activeTab === tab.id && <i className="fas fa-chevron-right text-gold-500"></i>}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:w-2/3">
                    {renderFacilityContent()}
                </div>
            </div>
        </div>
      </section>

      {/* Bagian Tabel Identifikasi Lokasi */}
      <section className="py-20 bg-white border-t-4 border-gold-500 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-gold-600 font-bold tracking-[0.2em] uppercase text-sm mb-3">Database Keselamatan</h2>
              <h3 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">Identifikasi Lokasi & Bahaya</h3>
              <p className="text-navy-800/80 max-w-2xl mx-auto text-lg">Daftar lengkap pendataan ruangan, sumber bahaya potensial, beserta langkah pencegahan dan APD yang diwajibkan oleh perusahaan.</p>
            </div>

            <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-sand-200 animate-on-scroll">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-navy-900 text-sand-50 text-sm uppercase tracking-wider">
                            <th className="p-4 border-b border-navy-700 font-bold">Lokasi</th>
                            <th className="p-4 border-b border-navy-700 font-bold">Sumber Bahaya</th>
                            <th className="p-4 border-b border-navy-700 font-bold hidden md:table-cell">Faktor Penyebab</th>
                            <th className="p-4 border-b border-navy-700 font-bold">Jenis Bahaya</th>
                            <th className="p-4 border-b border-navy-700 font-bold hidden lg:table-cell">Pencegahan</th>
                            <th className="p-4 border-b border-navy-700 font-bold">APD Wajib</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {hazardData.map((row, index) => (
                            <tr key={index} className="border-b border-sand-200 hover:bg-sand-50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 relative z-10 bg-white">
                                <td className="p-4 font-bold text-navy-900">{row.loc}</td>
                                <td className="p-4 text-navy-800">{row.src}</td>
                                <td className="p-4 text-navy-800/70 hidden md:table-cell">{row.factor}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 bg-navy-100 text-navy-800 rounded text-xs font-semibold">{row.type}</span>
                                </td>
                                <td className="p-4 text-navy-800/70 hidden lg:table-cell">{row.prevent}</td>
                                <td className="p-4 font-bold text-gold-600">{row.ppe}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
      </section>

    </div>
  );
}
