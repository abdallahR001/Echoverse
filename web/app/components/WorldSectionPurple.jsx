import Image from 'next/image';

export default function WorldSectionPurple() {
  return (
    <section id="worlds" className="relative bg-black overflow-hidden">
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row min-h-[680px]">

        {/* TOP on mobile / LEFT on desktop: Image */}
        <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-full flex-shrink-0 order-1 md:order-2">
          <Image
            src="/image2.png"
            alt="Portal to another world"
            fill
            className="object-cover object-center"
          />

          {/* Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:bg-gradient-to-r md:from-black md:via-black/60 md:to-transparent pointer-events-none" />
        </div>

        {/* Text */}
        <div className="relative z-10 flex flex-col justify-center gap-5 px-6 py-12 md:pl-16 md:pr-14 md:w-1/2 order-2 md:order-1">

          <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-white/35">
            The Gateway
          </span>

          <h2
            className="font-['Cinzel',serif] text-[clamp(1.8rem,5vw,3.2rem)] font-black leading-[1.1] tracking-tight"
            style={{ color: '#9333ea' }}
          >
            Step Through.
            <br />
            Never Return
            <br />
            the Same.
          </h2>

          <p className="text-[0.95rem] leading-[1.8] text-white/55 max-w-[460px]">
            Every session opens a new portal — a world you've never seen,
            a reality you didn't ask for. You don't pick where you land.
            The Verse decides. And it always chooses something unexpected.
          </p>

          <ul className="flex flex-col gap-3 list-none">
            {[
              'Dynamically generated worlds — no two alike',
              'AI builds tension, atmosphere, and consequence',
              'Your decisions echo across the multiverse',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-[0.88rem] text-white/65 font-medium"
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0 bg-purple-600" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="inline-block w-fit mt-1 px-6 py-3 rounded-lg border text-[0.82rem] font-bold tracking-[0.08em] uppercase transition-all duration-200 hover:bg-white/5 hover:translate-x-1"
            style={{
              borderColor: 'rgba(147,51,234,0.5)',
              color: '#c084fc',
            }}
          >
            Explore the Worlds →
          </a>

        </div>
      </div>
    </section>
  );
}