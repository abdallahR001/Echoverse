import Link from 'next/link';

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative bg-[#020204] py-36 px-6 overflow-hidden"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(147,51,234,0.3), transparent)',
        }}
      />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(88,28,135,0.18) 0%, transparent 65%)',
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(147,51,234,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[680px] mx-auto flex flex-col items-center text-center gap-7">

        {/* Eyebrow */}
        <span
          className="text-[0.65rem] font-bold tracking-[0.25em] uppercase"
          style={{
            color: 'rgba(147,51,234,0.6)',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Are you ready?
        </span>

        {/* Heading */}
        <h2
          className="font-black tracking-[-0.03em] leading-[1.0]"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.88)' }}>
            The Verse Is
          </span>

          <br />

          <span
            style={{
              background:
                'linear-gradient(90deg, #7c3aed, #a855f7, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter:
                'drop-shadow(0 0 30px rgba(147,51,234,0.4))',
            }}
          >
            Already Watching.
          </span>
        </h2>

        {/* Description */}
        <p
          className="text-[1rem] leading-[1.85] max-w-[480px]"
          style={{
            color: 'rgba(255,255,255,0.38)',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Thousands of worlds are waiting to be discovered — or destroyed.
          Your first session begins the moment you enter. No tutorials.
          Only echoes of what you choose.
        </p>

        {/* CTA */}
        <Link
          href="/SignUp"
          className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-[0.88rem] tracking-[0.08em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(147,51,234,0.6),0_8px_55px_rgba(88,28,135,0.65)] mt-2"
          style={{
            background:
              'linear-gradient(135deg, #6d28d9, #9333ea)',
            boxShadow:
              '0 0 0 1px rgba(147,51,234,0.35), 0 8px 40px rgba(88,28,135,0.45)',
            fontFamily: "'Space Grotesk', sans-serif",
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

        {/* Fine print */}
        <p
          className="text-[0.72rem] tracking-[0.14em] uppercase"
          style={{
            color: 'rgba(255,255,255,0.18)',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          No credit card. No setup. Just enter.
        </p>

      </div>
    </section>
  );
}