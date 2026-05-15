import { useEffect } from 'react';

export default function K3() {
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
    <div className="bg-sand-100 min-h-screen">
      {/* Header - Reduced padding from py-20 to py-12 to fix spacing issue */}
      <div className="bg-navy-900 py-12 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-black text-sand-50 mb-4">Kesehatan, Keselamatan Kerja & Lingkungan</h1>
            <p className="text-sand-500 max-w-2xl mx-auto text-lg">Integritas keselamatan kami berpusat pada mitigasi proaktif dan kepatuhan penuh terhadap hukum perlindungan tenaga kerja Indonesia.</p>
        </div>
      </div>

      {/* Landasan Hukum */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-on-scroll">
              <h2 className="text-gold-600 font-bold tracking-[0.2em] uppercase text-sm mb-3">Regulasi</h2>
              <h3 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">Landasan Hukum K3</h3>
              <p className="text-navy-800/80 max-w-3xl mx-auto text-lg">Sebagai perusahaan dengan tingkat risiko operasional yang tinggi, PT Beira Deep wajib mematuhi berbagai peraturan perundang-undangan berikut:</p>
            </div>

            {/* Changed from simple list to Grid Cards for better visual layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
              
              <div className="bg-sand-50 p-6 rounded-2xl border-l-4 border-gold-600 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                 <div className="flex items-center gap-3 mb-3">
                    <i className="fas fa-balance-scale text-navy-900 text-xl"></i>
                    <h4 className="font-bold text-navy-900">UU No. 1 Tahun 1970</h4>
                 </div>
                 <p className="text-sm text-navy-700/80">Tentang Keselamatan Kerja, yang menjadi dasar pelaksanaan K3 di seluruh tempat kerja.</p>
              </div>

              <div className="bg-sand-50 p-6 rounded-2xl border-l-4 border-gold-600 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                 <div className="flex items-center gap-3 mb-3">
                    <i className="fas fa-file-contract text-navy-900 text-xl"></i>
                    <h4 className="font-bold text-navy-900">UU No. 13 Tahun 2003</h4>
                 </div>
                 <p className="text-sm text-navy-700/80">Tentang Ketenagakerjaan, pasal 86 dan 87 mengenai hak pekerja atas perlindungan K3.</p>
              </div>

              <div className="bg-sand-50 p-6 rounded-2xl border-l-4 border-gold-600 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                 <div className="flex items-center gap-3 mb-3">
                    <i className="fas fa-industry text-navy-900 text-xl"></i>
                    <h4 className="font-bold text-navy-900">PP No. 50 Tahun 2012</h4>
                 </div>
                 <p className="text-sm text-navy-700/80">Penerapan Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3).</p>
              </div>

              <div className="bg-sand-50 p-6 rounded-2xl border-l-4 border-gold-600 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                 <div className="flex items-center gap-3 mb-3">
                    <i className="fas fa-fire-extinguisher text-navy-900 text-xl"></i>
                    <h4 className="font-bold text-navy-900">Kepmenaker No. 186/1999</h4>
                 </div>
                 <p className="text-sm text-navy-700/80">Unit Penanggulangan Kebakaran di Tempat Kerja.</p>
              </div>

              <div className="bg-sand-50 p-6 rounded-2xl border-l-4 border-gold-600 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                 <div className="flex items-center gap-3 mb-3">
                    <i className="fas fa-hard-hat text-navy-900 text-xl"></i>
                    <h4 className="font-bold text-navy-900">Permenaker No. 8/2010</h4>
                 </div>
                 <p className="text-sm text-navy-700/80">Alat Pelindung Diri (APD) yang mewajibkan perusahaan menyediakan APD gratis.</p>
              </div>

              <div className="bg-sand-50 p-6 rounded-2xl border-l-4 border-gold-600 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                 <div className="flex items-center gap-3 mb-3">
                    <i className="fas fa-oil-can text-navy-900 text-xl"></i>
                    <h4 className="font-bold text-navy-900">Regulasi Sektoral Migas</h4>
                 </div>
                 <p className="text-sm text-navy-700/80">Berbagai Peraturan Menteri ESDM terkait keselamatan instalasi dan peralatan minyak dan gas bumi.</p>
              </div>

            </div>
        </div>
      </section>

      {/* Hierarki Pengendalian Bahaya */}
      <section className="py-20 bg-sand-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-gold-600 font-bold tracking-[0.2em] uppercase text-sm mb-3">Mitigasi Risiko</h2>
              <h3 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">Hierarki Pengendalian Bahaya</h3>
              <p className="text-navy-800/80 max-w-2xl mx-auto text-lg">Pendekatan sistematis 5 pilar untuk meminimalkan paparan bahaya di lingkungan rig laut dalam.</p>
            </div>

            <div className="grid md:grid-cols-5 gap-4 animate-on-scroll">
               <div className="bg-navy-900 text-sand-50 p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <i className="fas fa-trash-alt text-6xl"></i>
                  </div>
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">1</div>
                  <h4 className="font-bold text-lg mb-2 z-10">Eliminasi</h4>
                  <p className="text-xs text-sand-200 z-10">Menghilangkan sumber bahaya sepenuhnya. (Mis: otomasi total area pengeboran).</p>
               </div>
               
               <div className="bg-navy-800 text-sand-50 p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <i className="fas fa-exchange-alt text-6xl"></i>
                  </div>
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">2</div>
                  <h4 className="font-bold text-lg mb-2 z-10">Substitusi</h4>
                  <p className="text-xs text-sand-200 z-10">Mengganti bahan berbahaya dengan yang lebih aman. (Mis: bahan kimia water-based).</p>
               </div>

               <div className="bg-navy-700 text-sand-50 p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <i className="fas fa-tools text-6xl"></i>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg text-navy-900 group-hover:scale-110 transition-transform duration-300">3</div>
                  <h4 className="font-bold text-lg mb-2 z-10">Rekayasa Teknis</h4>
                  <p className="text-xs text-sand-200 z-10">Memodifikasi alat/tempat kerja. (Mis: exhaust fan, sensor gas, dinding tahan api).</p>
               </div>

               <div className="bg-navy-600 text-sand-50 p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <i className="fas fa-clipboard-list text-6xl"></i>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg text-navy-900 group-hover:scale-110 transition-transform duration-300">4</div>
                  <h4 className="font-bold text-lg mb-2 z-10">Administrasi</h4>
                  <p className="text-xs text-sand-200 z-10">SOP, rotasi kerja, pelatihan K3, dan sistem izin kerja (Permit to Work).</p>
               </div>

               <div className="bg-navy-500 text-sand-50 p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <i className="fas fa-hard-hat text-6xl"></i>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg text-navy-900 group-hover:scale-110 transition-transform duration-300">5</div>
                  <h4 className="font-bold text-lg mb-2 z-10">APD</h4>
                  <p className="text-xs text-sand-200 z-10">Langkah terakhir. Helmet, safety shoes, FRC, earplug, SCBA.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Rencana Tanggap Darurat (ERP) */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-on-scroll">
              <h3 className="text-3xl font-black text-navy-900 mb-4">Rencana Tanggap Darurat (ERP)</h3>
              <p className="text-navy-800/80 text-lg">Prosedur penanganan insiden kritikal di fasilitas lepas pantai PT Beira Deep.</p>
            </div>

            <div className="space-y-4 animate-on-scroll">
              <details className="group bg-sand-50 rounded-2xl border border-sand-200 open:bg-white open:border-gold-500 open:shadow-md transition-all">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-navy-900 text-lg">
                  1. Prosedur Evakuasi Kebakaran atau Ledakan
                  <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                    <i className="fas fa-chevron-down absolute inset-0 transition-transform group-open:rotate-180 text-gold-600"></i>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-navy-800/80 text-sm leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Aktifkan General Alarm.</li>
                    <li>Semua pekerja menghentikan pekerjaan (Stop Work Authority) dan mematikan peralatan.</li>
                    <li>Tinggalkan area menuju Muster Point (Titik Kumpul) terdekat yang aman.</li>
                    <li>Jangan menggunakan lift (jika ada), gunakan tangga darurat.</li>
                    <li>Fire fighting team segera melakukan pemadaman jika api masih kecil dan terkendali.</li>
                    <li>Jika api tidak terkendali, persiapkan evakuasi menggunakan sekoci (Lifeboats) atas perintah OIM (Offshore Installation Manager).</li>
                  </ul>
                </div>
              </details>

              <details className="group bg-sand-50 rounded-2xl border border-sand-200 open:bg-white open:border-gold-500 open:shadow-md transition-all">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-navy-900 text-lg">
                  2. Prosedur Tumpahan Bahan Kimia/Minyak (Spill Response)
                  <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                    <i className="fas fa-chevron-down absolute inset-0 transition-transform group-open:rotate-180 text-gold-600"></i>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-navy-800/80 text-sm leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Identifikasi jenis tumpahan dari jarak aman.</li>
                    <li>Hentikan sumber tumpahan jika aman dilakukan (misalnya, menutup katup).</li>
                    <li>Isolasi area dan cegah tumpahan mengalir ke laut menggunakan oil boom atau absorbent pad.</li>
                    <li>Laporkan segera ke Supervisor dan tim Spill Response.</li>
                    <li>Gunakan APD yang sesuai (masker respirator, sarung tangan bahan kimia) sebelum pembersihan.</li>
                  </ul>
                </div>
              </details>

              <details className="group bg-sand-50 rounded-2xl border border-sand-200 open:bg-white open:border-gold-500 open:shadow-md transition-all">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-navy-900 text-lg">
                  3. Prosedur Kecelakaan Medis (Medical Emergency)
                  <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                    <i className="fas fa-chevron-down absolute inset-0 transition-transform group-open:rotate-180 text-gold-600"></i>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-navy-800/80 text-sm leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Jangan pindahkan korban kecuali jika ada bahaya langsung (misal: area kebakaran).</li>
                    <li>Panggil tim medis rig (Medic) segera melalui radio atau telepon darurat.</li>
                    <li>Berikan pertolongan pertama (First Aid) hanya jika Anda terlatih.</li>
                    <li>Amankan lokasi kejadian untuk mencegah korban tambahan.</li>
                    <li>Siapkan prosedur Medevac (Medical Evacuation) menggunakan helikopter jika cedera serius.</li>
                  </ul>
                </div>
              </details>
            </div>
        </div>
      </section>

    </div>
  );
}
