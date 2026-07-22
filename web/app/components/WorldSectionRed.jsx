import Image from 'next/image';

export default function WorldSectionRed() {
  return (
    <section id="characters" className="relative bg-black overflow-hidden">
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row min-h-[680px]">

        {/* Image */}
        <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-full flex-shrink-0 order-1">
          <Image
            src="/image1.png"
            alt="Lost in a fractured world"
            fill
            className="object-cover object-center"
          />

          {/* Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:bg-gradient-to-l md:from-black md:via-black/60 md:to-transparent pointer-events-none" />
        </div>

        {/* Text */}
        <div className="relative z-10 flex flex-col justify-center gap-5 px-6 py-12 md:pl-14 md:pr-16 md:w-1/2 order-2">

          <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-white/35">
            The Characters
          </span>

          <h2
            className="font-['Cinzel',serif] text-[clamp(1.8rem,5vw,3.2rem)] font-black leading-[1.1] tracking-tight"
            style={{ color: '#ef4444' }}
          >
            They Remember.
            <br />
            Even When
            <br />
            You Forget.
          </h2>

          <p className="text-[0.95rem] leading-[1.8] text-white/55 max-w-[460px]">
            Characters in Echoverse are not NPCs. They lie, vanish, die,
            and sometimes follow you across worlds. Each one carries a status —
            online, missing, or gone. Their silence says more than their words.
          </p>

          <ul className="flex flex-col gap-3 list-none">
            {[
              'Private chats with AI-driven characters',
              'Characters can betray, vanish, or die mid-story',
              'Live status: online · busy · missing · dead',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-[0.88rem] text-white/65 font-medium"
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0 bg-red-500" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="inline-block w-fit mt-1 px-6 py-3 rounded-lg border text-[0.82rem] font-bold tracking-[0.08em] uppercase transition-all duration-200 hover:bg-white/5 hover:translate-x-1"
            style={{
              borderColor: 'rgba(239,68,68,0.5)',
              color: '#fca5a5',
            }}
          >
            Meet the Characters →
          </a>

        </div>
      </div>
    </section>
  );
}