/* ────────────────────────────────────────────────────────────
   BOOT / CRT SCREEN — scanlines + vignette + typed-out boot lines
   ──────────────────────────────────────────────────────────── */

export default function BootScreen({ phase, visibleLines }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center px-6"
      style={{
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 1.1s ease-in-out',
      }}
    >
      {/* scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(147,51,234,0.06) 0px, rgba(147,51,234,0.06) 1px, transparent 1px, transparent 3px)',
          animation: 'scan-move 6s linear infinite',
          mixBlendMode: 'screen',
        }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      <div
        className="relative z-10 w-full max-w-[560px] font-mono text-[0.78rem] sm:text-[0.85rem] leading-relaxed"
        style={{
          animation: 'crt-flicker 5s infinite',
        }}
      >
        <p
          className="text-[0.62rem] sm:text-[0.7rem] tracking-[0.3em] uppercase mb-4"
          style={{
            color: 'rgba(147,51,234,0.5)',
          }}
        >
          THE DIVE — INITIATING SEQUENCE
        </p>

        {visibleLines.filter(Boolean).map((line, i) => {
          if (!line) {
            return null;
          }

          return (
            <p
              key={`${line.text}-${i}`}
              className="boot-line"
              style={{
                color: line.glitch
                  ? '#f87171'
                  : line.final
                    ? '#c084fc'
                    : 'rgba(216,180,254,0.75)',
                fontWeight: line.final ? 700 : 400,
              }}
            >
              <span
                style={{
                  color: 'rgba(147,51,234,0.5)',
                }}
              >
                {'>'}
              </span>{' '}
              {line.text}
            </p>
          );
        })}

        {visibleLines.length < 8 && (
          <span
            className="boot-cursor inline-block w-2 h-4 align-middle"
            style={{
              background: 'rgba(216,180,254,0.6)',
            }}
          />
        )}
      </div>
    </div>
  );
}