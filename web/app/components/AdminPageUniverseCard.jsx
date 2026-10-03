import Image from 'next/image';

export default function UniverseCard({ universe, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-xl overflow-hidden text-left transition-all duration-200 group hover:-translate-y-0.5"
      style={{ border: '1px solid rgba(147,51,234,0.12)', background: '#080610' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(147,51,234,0.35)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(147,51,234,0.12)'}
    >
      {/* Cover image */}
      <div className="relative h-36 overflow-hidden">
        {universe.cover ? (
          <Image src={universe.cover} alt={universe.name} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #1a0a2e, #0d0618)' }} />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #080610 0%, rgba(8,6,16,0.3) 60%, transparent 100%)' }} />

        {/* Edit hint */}
        <div
          className="absolute top-2.5 right-2.5 px-2 py-1 rounded-md text-[0.6rem] font-bold tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          Edit
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-5 pt-2 flex flex-col gap-2">
        <h3
          className="font-bold text-[0.95rem] leading-snug"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.88)' }}
        >
          {universe.name}
        </h3>

        <p
          className="text-[0.8rem] leading-[1.65] line-clamp-2"
          style={{ color: 'rgba(255,255,255,0.38)', fontFamily: "'DM Sans', sans-serif" }}
        >
          {universe.description}
        </p>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1.5" style={{ color: 'rgba(147,51,234,0.7)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            </svg>
            <span className="text-[0.7rem] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {universe.players} players
            </span>
          </div>

          <div className="flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            <span className="text-[0.68rem]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {universe.infos.length} {universe.infos.length === 1 ? 'info' : 'infos'}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}