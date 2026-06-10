import { useEffect } from 'react';

export default function Structure() {
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

  return (
    <div className="bg-sand-100 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-navy-900 py-12 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-black text-sand-50 mb-4">Struktur Organisasi</h1>
            <p className="text-sand-500 max-w-2xl mx-auto text-lg">Hierarki operasional PT Beira Deep yang memadukan keahlian teknis ekstrem dengan protokol keselamatan tak tertandingi.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        
        {/* Pemangku Kepentingan (Board of Directors) */}
        <section className="mb-16 animate-on-scroll">
            <div className="text-center mb-8">
                <h2 className="text-gold-600 font-bold tracking-[0.2em] uppercase text-sm mb-2">Dewan Direksi</h2>
                <h3 className="text-3xl font-black text-navy-900">Pemangku Kepentingan Utama (HQ)</h3>
                <p className="text-navy-800/80 mt-2">Para eksekutif pengambil keputusan strategis yang berpusat di kantor darat (Onshore).</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Abdul Zaqi Syaqiqur R', 'Fajar Kurnia Putra', 'Rafi Zeta Fauzan', 'Sutoko'].map(name => (
                    <div key={name} className="bg-navy-900 p-6 rounded-2xl border-t-4 border-gold-500 shadow-lg text-center hover:-translate-y-1 transition-transform">
                        <i className="fas fa-user-tie text-gold-500 text-3xl mb-3"></i>
                        <h4 className="font-bold text-sand-50 text-sm">{name}</h4>
                        <p className="text-xs text-gold-400 mt-1">Board of Directors</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Garis Pemisah */}
        <div className="flex items-center justify-center gap-4 mb-16 opacity-50">
            <div className="h-px bg-navy-900 w-1/4"></div>
            <i className="fas fa-ship text-navy-900 text-xl"></i>
            <div className="h-px bg-navy-900 w-1/4"></div>
        </div>

        {/* Struktur Rig Lepas Pantai */}
        <div className="text-center mb-10 animate-on-scroll">
            <h2 className="text-gold-600 font-bold tracking-[0.2em] uppercase text-sm mb-2">Offshore Command</h2>
            <h3 className="text-3xl font-black text-navy-900">Struktur Anjungan Lepas Pantai</h3>
            <p className="text-navy-800/80 mt-2 max-w-3xl mx-auto">Standar industri operasional dibagi berdasarkan fungsi teknis untuk memastikan kelancaran ekstraksi dan keselamatan nyawa di atas rig.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            
            {/* 1. Divisi Manajemen */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md animate-on-scroll flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                        <i className="fas fa-crown text-gold-500 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">Divisi Manajemen</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Offshore Management</p>
                    </div>
                </div>
                <div className="space-y-5 flex-grow">
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">OIM (Offshore Installation Manager)</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Pemimpin tertinggi di anjungan. Semua departemen melapor kepadanya. Ia bertanggung jawab mutlak atas keselamatan, produksi, dan operasional harian rig.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gold-100 text-gold-900 rounded-lg text-xs font-bold border border-gold-300">David Rennick</span>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Tim Manajemen & Administrasi Senior</h5>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {['Cor Van Der Bijl', 'Glen Torkill', 'Iain "Trots" Campbell', 'John Roper', 'Hector King', 'Gregory King', 'Michael McNeil'].map(name => (
                                <span key={name} className="px-3 py-1 bg-sand-100 text-navy-900 rounded-lg text-xs font-semibold border border-sand-200">{name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. HSE & Medis */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md animate-on-scroll flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                        <i className="fas fa-shield-alt text-green-500 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">Departemen HSE & Medis</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Health, Safety, & Environment</p>
                    </div>
                </div>
                <div className="space-y-5 flex-grow">
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Safety Officer / HSE Advisor</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Melapor langsung kepada OIM. Bertugas mengawasi protokol keselamatan, memberikan izin kerja (Permit to Work), dan menginvestigasi seluruh insiden operasional.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-green-50 text-green-900 rounded-lg text-xs font-semibold border border-green-200">Nicole Hall</span>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Rig Medic</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Dokter atau petugas medis bersertifikat tinggi yang bersiaga 24 jam untuk menangani kesehatan kru dan keadaan darurat medis (Medical Emergency).</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-sand-100 text-navy-900 rounded-lg text-xs font-semibold border border-sand-200 border-dashed">TBD (Tenaga Medis)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Drilling */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md animate-on-scroll flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                        <i className="fas fa-oil-well text-orange-500 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">Departemen Pengeboran</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Drilling Department</p>
                    </div>
                </div>
                <div className="space-y-5 flex-grow">
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Toolpusher</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Kepala operasi pengeboran, merupakan perwakilan utama dari perusahaan kontraktor rig untuk mengebor sumur ke dasar laut.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-orange-50 text-orange-900 rounded-lg text-xs font-semibold border border-orange-200">George Gregor</span>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Driller & Assistant Driller</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Operator ahli yang mengendalikan mesin bor utama dari kabin (Drill Cabin), serta asisten yang memantau parameter pengeboran secara real-time.</p>
                        <div className="flex flex-wrap gap-2">
                            {['Grant', 'Kenneth Patterson'].map(name => (
                                <span key={name} className="px-3 py-1 bg-sand-100 text-navy-900 rounded-lg text-xs font-semibold border border-sand-200">{name}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Derrickman & Roughneck (Floorhand)</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Bekerja di menara bor untuk menyusun pipa dan memantau lumpur (mud system). Kru fisik terdepan di lantai bor (rig floor) yang menyambung pipa besi raksasa.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-sand-100 text-navy-900 rounded-lg text-xs font-semibold border border-sand-200">Stuart "Gibbo" Gibson</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Engineering */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md animate-on-scroll flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                        <i className="fas fa-cogs text-blue-500 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">Departemen Teknik & Pemeliharaan</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Engineering & Maintenance</p>
                    </div>
                </div>
                <div className="space-y-5 flex-grow">
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Maintenance Supervisor / Chief Engineer</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Kepala teknisi pemeliharaan, menjamin seluruh mesin (dari generator hingga pompa) di rig tidak pernah mati.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-50 text-blue-900 rounded-lg text-xs font-semibold border border-blue-200">Douglas Dunbar</span>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Mechanic & Electrician</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Memperbaiki mesin diesel tugas berat, pompa hidrolik, dan memelihara sistem kelistrikan tegangan tinggi maupun rendah di seluruh anjungan.</p>
                        <div className="flex flex-wrap gap-2">
                            {['Gordon Abernathy', "Donald O'Connor", 'DJ'].map(name => (
                                <span key={name} className="px-3 py-1 bg-sand-100 text-navy-900 rounded-lg text-xs font-semibold border border-sand-200">{name}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Instrument Tech & Motorman (Specialized)</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Merawat sensor, sistem alarm, perangkat elektronik presisi, dan menjaga keandalan mesin utama (engine room).</p>
                        <div className="flex flex-wrap gap-2">
                            {['Cameron "Caz" McLeary', 'Malcolm Addair', 'Eileen Finlay', 'Davros', 'Banky Holiday', 'Alan McLurg', 'James "Scooby" Scobie', 'Toby Boyd'].map(name => (
                                <span key={name} className="px-3 py-1 bg-sand-100 text-navy-900 rounded-lg text-xs font-semibold border border-sand-200">{name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Deck Crew */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md animate-on-scroll flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                        <i className="fas fa-anchor text-gold-500 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">Departemen Geladak & Kelautan</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Marine & Deck Crew</p>
                    </div>
                </div>
                <div className="space-y-5 flex-grow">
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Barge Engineer & Crane Operator</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Bertanggung jawab mutlak atas stabilitas rig dan pemberat (ballast), serta mengoperasikan derek raksasa untuk bongkar muat dari kapal suplai.</p>
                        <div className="flex flex-wrap gap-2">
                            {['Alex Cranstoun', 'Bruce'].map(name => (
                                <span key={name} className="px-3 py-1 bg-sand-100 text-navy-900 rounded-lg text-xs font-semibold border border-sand-200">{name}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Deck Pusher / Bosun & Roustabout</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Mandor geladak dan pekerja level awal yang fokus membersihkan rig, mengecat, serta memindahkan barang-barang logistik berat.</p>
                        <div className="flex flex-wrap gap-2">
                            {['Dalgleish', 'Dobbie', 'Ewan Muir', 'Loudon', 'Sunil', 'Terry Innes', 'Fergus'].map(name => (
                                <span key={name} className="px-3 py-1 bg-sand-100 text-navy-900 rounded-lg text-xs font-semibold border border-sand-200">{name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. Catering */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md animate-on-scroll flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                        <i className="fas fa-utensils text-yellow-600 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">Departemen Layanan & Dukungan</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Catering & Camp Services</p>
                    </div>
                </div>
                <div className="space-y-5 flex-grow">
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Camp Boss & Radio Operator</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Mengurus logistik kamar dan mengatur lalu lintas komunikasi penerbangan helikopter serta kapal laut.</p>
                        <div className="flex flex-wrap gap-2">
                            {['Anderson', 'Andy', 'Bachchan', 'Bannon'].map(name => (
                                <span key={name} className="px-3 py-1 bg-yellow-50 text-yellow-900 rounded-lg text-xs font-semibold border border-yellow-200">{name}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Chief Cook & Steward (Galley Hand)</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Urat nadi kesejahteraan kru: menyiapkan makanan bergizi tinggi, membersihkan kabin, dan mencuci pakaian pekerja.</p>
                        <div className="flex flex-wrap gap-2">
                            {['Henderson', 'Logan', 'Jamie McLoud', 'Kelly', 'Ken', 'Shuggie Schaw', 'Keith Shaw'].map(name => (
                                <span key={name} className="px-3 py-1 bg-sand-100 text-navy-900 rounded-lg text-xs font-semibold border border-sand-200">{name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 7. Divers & Transport */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md lg:col-span-2 animate-on-scroll flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                        <i className="fas fa-water text-cyan-500 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">Kontraktor Spesialis Eksternal</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Offshore Divers & Air Support</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Penyelam Lepas Pantai (Offshore Divers)</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Bukan staf tetap; kontraktor pihak ketiga yang diturunkan via *Diving Support Vessel* untuk inspeksi atau perbaikan lambung rig bawah air.</p>
                        <div className="flex flex-wrap gap-2">
                            {['Albert Brodie', 'Rafferty Raffs'].map(name => (
                                <span key={name} className="px-3 py-1 bg-cyan-50 text-cyan-900 rounded-lg text-xs font-semibold border border-cyan-200">{name}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold text-navy-900 text-sm mb-1">Dukungan Transportasi Udara</h5>
                        <p className="text-xs text-navy-800/80 mb-2 leading-relaxed">Pilot helikopter spesialis laut dalam yang menerjang cuaca ekstrem demi mengantar pergantian kru (crew change) atau Medevac.</p>
                        <div className="flex flex-wrap gap-2">
                            {['Archie', 'Dominic Clague'].map(name => (
                                <span key={name} className="px-3 py-1 bg-cyan-50 text-cyan-900 rounded-lg text-xs font-semibold border border-cyan-200">{name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
