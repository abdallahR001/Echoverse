import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative bg-black overflow-hidden py-36 px-6">

      {/* Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-purple-700/15 blur-[80px] pointer-events-none" />

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-600/40 to-transparent" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(147,51,234,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-6">

        <span className="text-[0.7rem] font-bold tracking-[0.25em] uppercase text-purple-400/70">
          Are you ready?
        </span>

        <h2
          className="font-['Cinzel',serif] font-black leading-[1.05] tracking-tight"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)' }}
        >
          <span className="text-white">The Verse Is</span>
          <br />
          <span
            style={{
              background:
                'linear-gradient(135deg, #9333ea 0%, #c084fc 50%, #9333ea 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Already Watching.
          </span>
        </h2>

        <p className="text-[1rem] leading-[1.85] text-white/50 max-w-[520px]">
          Thousands of worlds are waiting to be discovered — or destroyed.
          Your first session begins the moment you enter. There are no tutorials here.
          Only echoes of what you choose.
        </p>

        <div className="mt-3">
          <Link
            href="/SignUp"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[0.88rem] font-bold tracking-[0.08em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(147,51,234,0.6)]"
            style={{
              background:
                'linear-gradient(135deg, #7c3aed, #9333ea, #6b21a8)',
              boxShadow:
                '0 0 30px rgba(147,51,234,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            Enter Echoverse Free

            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <p className="text-[0.75rem] tracking-[0.12em] uppercase text-white/20 mt-1">
          No credit card. No setup. Just enter.
        </p>

      </div>
    </section>
  );
}