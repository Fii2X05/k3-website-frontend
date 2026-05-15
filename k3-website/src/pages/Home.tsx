import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    "/images/hero_slide_1.png",
    "/images/hero_slide_2.png",
    "/images/hero_slide_3.png"
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

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
    <div className="bg-sand-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <img 
              key={index}
              src={slide} 
              alt={`Deepwater Drilling Rig Slide ${index + 1}`} 
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[5000ms] ease-in-out ${
                currentSlide === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          ))}
          {/* Darker overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-gold-500/50 text-white text-sm font-bold tracking-widest mb-6">
              PENGEBORAN MINYAK LEPAS PANTAI
            </div>
            {/* Added strong shadow and strict white color */}
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              Fueling the Future.<br/>
              <span className="text-gold-500 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">Shaping the Energy Landscape.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light leading-relaxed border-l-4 border-gold-500 pl-6 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]">
              Pelopor solusi pengeboran lepas pantai dengan teknologi mutakhir dan komitmen teguh terhadap kesejahteraan awak dan ekosistem laut.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/k3" className="px-8 py-4 font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-yellow-500/30" style={{ backgroundColor: '#A98D65', color: '#0B1221' }}>
                Standar K3 Kami
              </Link>
              <Link to="/facility" className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white text-white hover:text-slate-900 font-bold rounded-lg transition-all duration-300">
                Eksplorasi Fasilitas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Value Proposition Cards */}
      <section className="relative z-20 -mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Uniform Grid Setup */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-on-scroll">
          
          <div className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-2 h-full">
            <div className="w-16 h-16 rounded-full bg-navy-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <i className="fas fa-anchor text-gold-500 text-2xl"></i>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-navy-900 mb-1">Deepwater</h3>
            <p className="text-xs text-navy-600 font-bold tracking-widest uppercase">Spesialisasi</p>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-2 h-full">
            <div className="w-16 h-16 rounded-full bg-navy-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <i className="fas fa-shield-alt text-gold-500 text-2xl"></i>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-navy-900 mb-1">Zero LTI</h3>
            <p className="text-xs text-navy-600 font-bold tracking-widest uppercase">Lost Time Injury</p>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-2 h-full">
            <div className="w-16 h-16 rounded-full bg-navy-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <i className="fas fa-fish text-gold-500 text-2xl"></i>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-navy-900 mb-1">Eco-Safe</h3>
            <p className="text-xs text-navy-600 font-bold tracking-widest uppercase">Terverifikasi</p>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-2 h-full">
            <div className="w-16 h-16 rounded-full bg-navy-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <i className="fas fa-users-cog text-gold-500 text-2xl"></i>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-navy-900 mb-1">100%</h3>
            <p className="text-xs text-navy-600 font-bold tracking-widest uppercase">Awak Tersertifikasi</p>
          </div>

        </div>
      </section>

      {/* Profil Perusahaan */}
      <section className="py-24 bg-sand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="animate-on-scroll">
              {/* Removed weird tiny text, made it a clean block */}
              <div className="flex items-center gap-4 mb-6">
                  <div className="h-1 w-12 bg-gold-600 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-navy-900">PT Beira Deep</h2>
              </div>
              
              <div className="prose prose-lg text-navy-800/80 leading-relaxed mb-8">
                <p>
                  Merupakan perusahaan energi yang bergerak dalam sektor industri minyak dan gas bumi (migas), 
                  khususnya pada kegiatan eksplorasi dan produksi hidrokarbon di wilayah lepas pantai (offshore). 
                </p>
                <p>
                  Perusahaan ini berfokus pada pemanfaatan teknologi pengeboran modern untuk mengekstraksi cadangan 
                  minyak dan gas dari lapisan bawah laut yang memiliki potensi energi tinggi. Dengan memanfaaatkan 
                  sistem pengeboran laut dalam (deepwater drilling rig), perusahaan mampu beroperasi pada lingkungan laut 
                  yang kompleks serta memiliki tantangan operasional yang tinggi.
                </p>
              </div>

              {/* Added visual list to break text monotony */}
              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white p-5 rounded-xl border border-sand-200 shadow-sm flex gap-4 items-start">
                      <div className="mt-1 w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center shrink-0">
                          <i className="fas fa-cogs text-gold-600"></i>
                      </div>
                      <div>
                          <h4 className="font-bold text-navy-900 mb-1">Teknologi Modern</h4>
                          <p className="text-sm text-navy-700/80">Eksplorasi laut dalam didukung infrastruktur canggih.</p>
                      </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-sand-200 shadow-sm flex gap-4 items-start">
                      <div className="mt-1 w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center shrink-0">
                          <i className="fas fa-globe-asia text-gold-600"></i>
                      </div>
                      <div>
                          <h4 className="font-bold text-navy-900 mb-1">Operasi Global</h4>
                          <p className="text-sm text-navy-700/80">Kapasitas produksi skala besar di berbagai medan laut.</p>
                      </div>
                  </div>
              </div>
            </div>

            <div className="relative animate-on-scroll">
              <div className="absolute inset-0 bg-gold-500 rounded-3xl transform translate-x-4 translate-y-4 opacity-20"></div>
              <img 
                src="/images/profil_rig.png" 
                alt="Offshore Platform Silhouette" 
                className="relative rounded-3xl shadow-2xl w-full object-cover h-[500px]"
              />
              {/* Decorative badge with explicit style to guarantee rendering and float animation */}
              <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-2xl border-4 border-white animate-float" style={{ backgroundColor: '#0B1221', color: '#ffffff' }}>
                  <div className="text-3xl font-black text-gold-500 mb-1">20+</div>
                  <div className="text-sm font-bold tracking-wider text-white">TAHUN PENGALAMAN</div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
