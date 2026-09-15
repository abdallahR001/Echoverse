import Image from 'next/image';

export default function WorldSectionPurple() {
  return (
    <section
      id="worlds"
      className="relative bg-[#020204] overflow-hidden"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(147,51,234,0.25), transparent)',
        }}
      />

      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row min-h-[700px]">

        {/* Image — right on desktop, top on mobile */}
        <div className="relative w-full md:w-1/2 min-h-[320px] md:min-h-full flex-shrink-0 order-1 md:order-2">
          <Image
            src="/image2.png"
            alt="Portal"
            fill
            className="object-cover object-center"
          />

          {/* Bottom image fade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, transparent 40%, #020204 100%)',
            }}
          />

          {/* Left image fade — desktop only */}
          <div
            className="absolute inset-0 pointer-events-none hidden md:block"
            style={{
              background:
                'linear-gradient(to right, #020204 0%, rgba(2,2,4,0.5) 30%, transparent 70%)',
            }}
          />
        </div>

        {/* Text — left on desktop, bottom on mobile */}
        <div className="relative z-10 flex flex-col justify-center gap-7 px-8 py-14 md:pl-16 md:pr-8 md:w-1/2 order-2 md:order-1">

          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <div
              className="h-px w-8"
              style={{
                background: 'rgba(147,51,234,0.5)',
              }}
            />

            <span
              className="text-[0.65rem] font-bold tracking-[0.25em] uppercase"
              style={{
                color: 'rgba(147,51,234,0.7)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              The Gateway
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-black leading-[1.0] tracking-[-0.02em]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              color: '#9333ea',
            }}
          >
            Step Through.
            <br />

            <span style={{ color: 'rgba(255,255,255,0.88)' }}>
              Never Return
            </span>
            <br />

            <span style={{ color: 'rgba(255,255,255,0.88)' }}>
              the Same.
            </span>
          </h2>

          {/* Description */}
          <p
            className="text-[0.95rem] leading-[1.85] max-w-[440px]"
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Every session opens a new portal — a world you've never seen,
            a reality you didn't ask for. You don't pick where you land.
            The Verse decides. And it always chooses something unexpected.
          </p>

          {/* Features */}
          <ul className="flex flex-col gap-3">
            {[
              'Dynamically generated worlds — no two alike',
              'AI builds tension, atmosphere, and consequence',
              'Your decisions echo across the multiverse',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3"
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: '#9333ea',
                    boxShadow:
                      '0 0 6px rgba(147,51,234,0.6)',
                  }}
                />

                <span
                  className="text-[0.88rem] leading-relaxed"
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
                  <a
          href="#"
          className="group w-fit flex items-center gap-2 text-[0.78rem] font-bold tracking-[0.1em] uppercase text-[#a855f7] transition-colors duration-200 hover:text-[#c084fc]"
        >
          Explore the Worlds

          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        </div>
      </div>
    </section>
  );
}