const worlds = [
  {
    tag: 'SCI-FI',
    title: 'Abandoned Space Station',
    desc: 'You wake up. The oxygen is at 12%. Someone deleted the logs.',
    color: '#7c3aed',
  },
  {
    tag: 'THRILLER',
    title: 'The Café on Kepler St.',
    desc: 'Normal coffee. Normal music. Everyone is watching the door.',
    color: '#9333ea',
  },
  {
    tag: 'WAR',
    title: 'Back of a Moving Truck',
    desc: 'Three strangers. One gun. The city is burning behind you.',
    color: '#6b21a8',
  },
  {
    tag: 'HORROR',
    title: 'Your Old Apartment',
    desc: 'Everything is exactly as you left it. But you moved out in 2019.',
    color: '#4c1d95',
  },
  {
    tag: 'MYSTERY',
    title: 'The Heist',
    desc: "You're inside. The alarm is off. Your partner isn't answering.",
    color: '#7e22ce',
  },
  {
    tag: 'SURREAL',
    title: 'The Interview',
    desc: 'The job is real. The office is real. The questions are wrong.',
    color: '#8b5cf6',
  },
];

export default function MultiverseSection() {
  return (
    <section
      id="multiverse"
      className="relative bg-[#020204] py-28 px-6"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(147,51,234,0.2), transparent)',
        }}
      />

      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <span
            className="text-[0.65rem] font-bold tracking-[0.25em] uppercase"
            style={{
              color: 'rgba(147,51,234,0.7)',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            The Multiverse
          </span>

          <h2
            className="font-black tracking-[-0.02em]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            No Two Sessions Are the Same
          </h2>

          <p
            className="text-[0.9rem] italic max-w-[420px] leading-relaxed"
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            A glimpse into the kinds of worlds Echoverse generates.
            Yours will be different. It always is.
          </p>
        </div>

        {/* Worlds grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(147,51,234,0.08)',
          }}
        >
          {worlds.map((world) => (
            <div
              key={world.tag}
              className="relative flex flex-col gap-3 p-7 bg-[#020204] transition-colors duration-300 overflow-hidden group hover:bg-[rgba(10,4,20,0.98)]"
            >
              {/* Accent bottom bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: world.color,
                }}
              />

              {/* Tag */}
              <span
                className="text-[0.6rem] font-black tracking-[0.22em] uppercase px-2.5 py-1 rounded-md w-fit"
                style={{
                  color: world.color,
                  border: `1px solid ${world.color}35`,
                  background: `${world.color}10`,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {world.tag}
              </span>

              {/* Title */}
              <h3
                className="font-bold text-[1rem] leading-snug"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                {world.title}
              </h3>

              {/* Description */}
              <p
                className="text-[0.83rem] leading-[1.7] italic"
                style={{
                  color: 'rgba(255,255,255,0.38)',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {world.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}