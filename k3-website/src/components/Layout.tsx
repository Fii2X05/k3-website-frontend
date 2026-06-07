import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change and scroll to top
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-sand-100 text-navy-900 font-sans selection:bg-gold-500 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-400 ${isScrolled ? 'bg-navy-900/95 backdrop-blur-md shadow-lg py-2 border-b border-gold-500/20' : 'bg-navy-900 py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <Logo className="w-14 h-14 transform group-hover:scale-105 transition duration-300" />
            </Link>
            
            <div className="hidden md:flex space-x-10 items-center">
              <Link to="/" className={`nav-link text-white hover:text-gold-500 transition ${location.pathname === '/' ? 'text-gold-500 active' : ''}`}>Beranda</Link>
              <Link to="/k3" className={`nav-link text-white hover:text-gold-500 transition ${location.pathname === '/k3' ? 'text-gold-500 active' : ''}`}>K3 & Lingkungan</Link>
              <Link to="/facility" className={`nav-link text-white hover:text-gold-500 transition ${location.pathname === '/facility' ? 'text-gold-500 active' : ''}`}>Denah Fasilitas</Link>
              <Link to="/structure" className={`nav-link text-white hover:text-gold-500 transition ${location.pathname === '/structure' ? 'text-gold-500 active' : ''}`}>Struktur Organisasi</Link>
              <Link to="/incidents" className={`nav-link text-white hover:text-gold-500 transition ${location.pathname === '/incidents' ? 'text-gold-500 active' : ''}`}>Laporan Insiden</Link>
            </div>

            <div className="hidden md:block">
              <Link to="/auth" className="px-6 py-2 bg-gold-500 text-navy-950 font-bold rounded-lg hover:bg-gold-400 transition shadow-lg hover:shadow-gold-500/20 inline-block">
                <i className="fas fa-sign-in-alt mr-2"></i>Login
              </Link>
            </div>

            <button className="md:hidden text-2xl text-sand-100 hover:text-gold-500 transition" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-navy-900 border-t border-gold-500/20 absolute w-full top-full shadow-2xl`}>
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" className="block w-full text-left px-4 py-3 text-sand-100 hover:bg-navy-800 hover:text-gold-500 rounded-lg transition font-medium">Beranda</Link>
            <Link to="/k3" className="block w-full text-left px-4 py-3 text-sand-100 hover:bg-navy-800 hover:text-gold-500 rounded-lg transition font-medium">K3 & Lingkungan</Link>
            <Link to="/facility" className="block w-full text-left px-4 py-3 text-sand-100 hover:bg-navy-800 hover:text-gold-500 rounded-lg transition font-medium">Denah Fasilitas</Link>
            <Link to="/structure" className="block w-full text-left px-4 py-3 text-sand-100 hover:bg-navy-800 hover:text-gold-500 rounded-lg transition font-medium">Struktur Organisasi</Link>
            <Link to="/incidents" className="block w-full text-left px-4 py-3 text-sand-100 hover:bg-navy-800 hover:text-gold-500 rounded-lg transition font-medium">Laporan Insiden</Link>
            <Link to="/auth" className="block w-full text-center px-4 py-3 text-navy-950 bg-gold-500 hover:bg-gold-400 rounded-lg transition font-bold mt-2">
              <i className="fas fa-sign-in-alt mr-2"></i>Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-navy-950 text-sand-200 py-16 border-t-4 border-gold-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-navy-800 pb-12">
                
                {/* Brand */}
                <div className="lg:col-span-2">
                    <div className="flex items-center space-x-3 mb-6">
                        <Logo className="w-16 h-16" />
                    </div>
                    <p className="text-sand-500 max-w-md mb-6 leading-relaxed">
                        PT Beira Deep berdedikasi untuk memajukan eksplorasi energi laut dalam dengan integritas operasional, teknologi mutakhir, dan komitmen mutlak terhadap keselamatan serta kelestarian ekosistem.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-navy-900 border border-navy-700 flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 hover:border-gold-500 transition duration-300 text-gold-500"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-navy-900 border border-navy-700 flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 hover:border-gold-500 transition duration-300 text-gold-500"><i className="fab fa-google"></i></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-navy-900 border border-navy-700 flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 hover:border-gold-500 transition duration-300 text-gold-500"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-navy-900 border border-navy-700 flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 hover:border-gold-500 transition duration-300 text-gold-500"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-navy-900 border border-navy-700 flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 hover:border-gold-500 transition duration-300 text-gold-500"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>

                {/* Certifications */}
                <div>
                    <h4 className="text-sand-100 font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-gold-500 pl-3">Sertifikasi</h4>
                    <ul className="space-y-4 text-sand-500 text-sm">
                        <li><span className="flex items-center gap-3"><i className="fas fa-shield-alt text-gold-500"></i> ISO 45001:2018 (SMK3)</span></li>
                        <li><span className="flex items-center gap-3"><i className="fas fa-leaf text-gold-500"></i> ISO 14001:2015 (Lingkungan)</span></li>
                        <li><span className="flex items-center gap-3"><i className="fas fa-certificate text-gold-500"></i> Standar Keamanan OSHA</span></li>
                        <li><span className="flex items-center gap-3"><i className="fas fa-anchor text-gold-500"></i> IADC Rig Pass</span></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-sand-100 font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-gold-500 pl-3">Kantor Pusat</h4>
                    <ul className="space-y-4 text-sand-500 text-sm">
                        <li className="flex items-start gap-3">
                            <i className="fas fa-map-marker-alt text-gold-500 mt-1"></i>
                            <span className="leading-relaxed">Jl. Ijen Boulevard No. 88<br />Klojen, Malang<br />Jawa Timur, Indonesia 65112</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="fas fa-phone text-gold-500"></i>
                            <span>+62 341 555 8899</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="fas fa-envelope text-gold-500"></i>
                            <span>info@beiradeep.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center text-sand-500/60 text-xs tracking-wide">
                <p>&copy; 2026 PT Beira Deep. Seluruh hak cipta dilindungi.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-gold-500 transition">Kebijakan Privasi</a>
                    <a href="#" className="hover:text-gold-500 transition">Syarat & Ketentuan</a>
                </div>
            </div>
        </div>
      </footer>

    </div>
  );
}
