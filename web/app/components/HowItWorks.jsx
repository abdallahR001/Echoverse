const steps = [
  {
    num: '01',
    title: 'You Enter. Blindly.',
    body: 'No setup. No character sheet. No backstory. You press play and the Verse drops you somewhere. A rooftop. A basement. A train. You figure it out.',
  },
  {
    num: '02',
    title: 'The World Breathes.',
    body: "Every scene is written live by AI — sounds, smells, tension, and the weight of what's unsaid. The world reacts to your presence before you even speak.",
  },
  {
    num: '03',
    title: 'You Choose. It Echoes.',
    body: 'Respond freely or pick an option. Every choice shifts the story. A lie you told in chapter one comes back. A face you ignored returns with a knife.',
  },
  {
    num: '04',
    title: 'The Verse Remembers.',
    body: "Worlds you've visited aren't forgotten. Characters persist across realities. Something you did last session already changed a world you haven't found yet.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="relative bg-[#020204] py-28 px-6 overflow-hidden"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(147,51,234,0.25), transparent)',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(88,28,135,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="text-center mb-20 flex flex-col items-center gap-4">
          <span
            className="text-[0.65rem] font-bold tracking-[0.25em] uppercase"
            style={{
              color: 'rgba(147,51,234,0.7)',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            The Mechanics
          </span>

          <h2
            className="font-black tracking-[-0.02em]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            How the Verse Works
          </h2>

          <p
            className="text-[0.95rem] italic max-w-[440px] leading-relaxed"
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Not a game. Not a chatbot. Something between a dream and a
            consequence.
          </p>
        </div>

        {/* Steps grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(147,51,234,0.1)',
          }}
        >
          {steps.map((s) => (
            <div
              key={s.num}
              className="group flex gap-5 p-8 bg-[#020204] transition-colors duration-300 hover:bg-[rgba(88,28,135,0.1)]"
            >
              {/* Step number */}
              <span
                className="font-black text-[2.2rem] leading-none flex-shrink-0 transition-colors duration-300 text-[rgba(147,51,234,0.15)] group-hover:text-[rgba(168,85,247,0.45)]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {s.num}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-2.5 pt-1">
                <h3
                  className="font-bold text-[1rem]"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  {s.title}
                </h3>

                <p
                  className="text-[0.88rem] leading-[1.8]"
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}