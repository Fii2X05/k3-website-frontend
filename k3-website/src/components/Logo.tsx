export default function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className="flex items-center gap-3">
      <svg 
        className={className} 
        viewBox="20 0 60 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pill border */}
        <rect x="25" y="5" width="50" height="90" rx="25" stroke="#C5A880" strokeWidth="4" fill="none" />
        
        {/* Moon / Sun */}
        <circle cx="60" cy="30" r="10" stroke="#C5A880" strokeWidth="3" fill="none" />
        <path d="M 52 23 A 12 12 0 0 0 52 37" stroke="#C5A880" strokeWidth="3" fill="none" />
        
        {/* Mountain */}
        <path d="M 25 55 L 50 30 L 75 55" stroke="#C5A880" strokeWidth="3" fill="none" />
        <path d="M 35 55 L 50 40 L 65 55" stroke="#C5A880" strokeWidth="3" fill="none" />

        {/* Waves */}
        <path d="M 25 70 Q 37.5 60 50 70 T 75 70" stroke="#C5A880" strokeWidth="3" fill="none" />
        <path d="M 25 80 Q 37.5 70 50 80 T 75 80" stroke="#C5A880" strokeWidth="3" fill="none" />
      </svg>
      <span className="text-2xl font-black tracking-widest uppercase" style={{ color: '#C5A880' }}>Beira Deep</span>
    </div>
  );
}
