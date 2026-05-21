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
                        <p className="text-xs text-sand-300 mt-1">Board of Directors</p>
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
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            
            {/* 1. Management */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md animate-on-scroll">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner">
                        <i className="fas fa-crown text-gold-500 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">Pimpinan Tertinggi</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Offshore Management</p>
                    </div>
                </div>
                <p className="text-sm text-navy-800/80 mb-4 leading-relaxed">Pemegang kendali penuh atas operasi dan keselamatan nyawa di atas rig (OIM & jajarannya).</p>
                <div className="flex flex-wrap gap-2">
                    {['David Rennick', 'Cor Van Der Bijl', 'Glen Torkill', 'Iain "Trots" Campbell', 'John Roper', 'Hector King', 'Gregory King', 'Michael McNeil'].map(name => (
                        <span key={name} className="px-3 py-1 bg-sand-100 text-navy-900 rounded-lg text-sm font-semibold border border-sand-200">{name}</span>
                    ))}
                </div>
            </div>

            {/* 2. HSE & Medis */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md animate-on-scroll">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner">
                        <i className="fas fa-shield-alt text-green-500 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">HSE, Medis & Legal</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Safety & Compliance</p>
                    </div>
                </div>
                <p className="text-sm text-navy-800/80 mb-4 leading-relaxed">Mengawasi protokol keselamatan, izin kerja, keadaan darurat medis, dan kepatuhan hukum operasi.</p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-50 text-green-900 rounded-lg text-sm font-semibold border border-green-200">Nicole Hall</span>
                    <span className="px-3 py-1 bg-sand-100 text-navy-900 rounded-lg text-sm font-semibold border border-sand-200">Rig Medic (TBD)</span>
                </div>
            </div>

            {/* 3. Drilling */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md animate-on-scroll">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner">
                        <i className="fas fa-oil-well text-orange-500 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">Departemen Pengeboran</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Drilling Crew</p>
                    </div>
                </div>
                <p className="text-sm text-navy-800/80 mb-4 leading-relaxed">Kru inti yang mengendalikan mesin bor, memantau tekanan lumpur, dan menyambung pipa besi raksasa.</p>
                <div className="flex flex-wrap gap-2">
                    {['George Gregor', 'Grant', 'Kenneth Patterson', 'Stuart "Gibbo" Gibson'].map(name => (
                        <span key={name} className="px-3 py-1 bg-orange-50 text-orange-900 rounded-lg text-sm font-semibold border border-orange-200">{name}</span>
                    ))}
                </div>
            </div>

            {/* 4. Engineering */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md animate-on-scroll">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner">
                        <i className="fas fa-cogs text-blue-500 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">Teknik & Pemeliharaan</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Engineering Dept & Techs</p>
                    </div>
                </div>
                <p className="text-sm text-navy-800/80 mb-4 leading-relaxed">Memastikan keandalan mesin rig, generator, kelistrikan, hingga instrumen elektronik sensitif tetap menyala.</p>
                <div className="flex flex-wrap gap-2">
                    {['Douglas Dunbar', 'Gordon Abernathy', "Donald O'Connor", 'DJ'].map(name => (
                        <span key={name} className="px-3 py-1 bg-blue-50 text-blue-900 rounded-lg text-sm font-semibold border border-blue-200">{name}</span>
                    ))}
                    {['Cameron "Caz" McLeary', 'Malcolm Addair', 'Eileen Finlay', 'Davros', 'Banky Holiday', 'Alan McLurg', 'James "Scooby" Scobie', 'Toby Boyd'].map(name => (
                        <span key={name} className="px-3 py-1 bg-sand-100 text-navy-900 rounded-lg text-sm font-semibold border border-sand-200">{name}</span>
                    ))}
                </div>
            </div>

            {/* 5. Deck Crew */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md animate-on-scroll">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner">
                        <i className="fas fa-anchor text-gold-500 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">Geladak & Kelautan</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Deck Crew</p>
                    </div>
                </div>
                <p className="text-sm text-navy-800/80 mb-4 leading-relaxed">Menangani stabilitas rig, operasi derek laut (crane), dan pergerakan kargo yang dikirim dari kapal suplai.</p>
                <div className="flex flex-wrap gap-2">
                    {['Alex Cranstoun', 'Bruce', 'Dalgleish', 'Dobbie', 'Ewan Muir', 'Loudon', 'Sunil', 'Terry Innes', 'Fergus'].map(name => (
                        <span key={name} className="px-3 py-1 bg-sand-100 text-navy-900 rounded-lg text-sm font-semibold border border-sand-200">{name}</span>
                    ))}
                </div>
            </div>

            {/* 6. Divers & Transport */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md animate-on-scroll">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner">
                        <i className="fas fa-water text-cyan-500 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">Penyelam & Dukungan Udara</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Divers & Transport</p>
                    </div>
                </div>
                <p className="text-sm text-navy-800/80 mb-4 leading-relaxed">Spesialis operasi bawah laut dan pilot transportasi logistik udara via helikopter.</p>
                <div className="flex flex-wrap gap-2">
                    {['Albert Brodie (Diver)', 'Rafferty Raffs (Diver)', 'Archie (Transport)', 'Dominic Clague (Transport)'].map(name => (
                        <span key={name} className="px-3 py-1 bg-cyan-50 text-cyan-900 rounded-lg text-sm font-semibold border border-cyan-200">{name}</span>
                    ))}
                </div>
            </div>

            {/* 7. Catering */}
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-md lg:col-span-2 animate-on-scroll">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shadow-inner">
                        <i className="fas fa-utensils text-yellow-600 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-navy-900">Layanan, Dukungan & Katering</h4>
                        <p className="text-xs text-navy-600 font-bold uppercase tracking-wider">Catering & Camp Services</p>
                    </div>
                </div>
                <p className="text-sm text-navy-800/80 mb-4 leading-relaxed">Garda depan yang memastikan kelayakan hidup kru; mulai dari penyediaan logistik bergizi hingga kebersihan area akomodasi.</p>
                <div className="flex flex-wrap gap-2">
                    {['Anderson', 'Andy', 'Bachchan', 'Bannon', 'Henderson', 'Logan', 'Jamie McLoud', 'Kelly', 'Ken', 'Shuggie Schaw', 'Keith Shaw'].map(name => (
                        <span key={name} className="px-3 py-1 bg-yellow-50 text-yellow-900 rounded-lg text-sm font-semibold border border-yellow-200">{name}</span>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
