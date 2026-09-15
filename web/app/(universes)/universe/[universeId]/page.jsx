'use client';

import Link from 'next/link';
import { use, useState, useEffect } from 'react';

/* ────────────────────────────────────────────────────────────
   MOCK DATA — استبدلها لاحقًا بالداتا الحقيقية جاية من الباك اند
   (حسب universeId) بدل الـ lookup object دا
   ──────────────────────────────────────────────────────────── */

const universesData = {
  '1': {
    name: 'Aethelgard Zenith',
    tag: 'CELESTIAL',
    danger: 32,
    stability: 78,
    characters: [
      { name: 'Solen', color: '#9333ea', role: 'Skyward Warden' },
      { name: 'The Cartographer', color: '#6b21a8', role: 'Keeper of Maps' },
      { name: 'Ivri', color: '#7c3aed', role: 'Wind Merchant' },
    ],
    memories: [
      {
        title: 'The Falling Spire',
        time: 'Session 1',
        content:
          'You watched the eastern spire detach from the crystal lattice and drift into the void, taking an entire district — and everyone in it — with it. No one else seemed to notice it was gone.',
        important: true,
      },
      {
        title: "Solen's Warning",
        time: 'Session 2',
        content:
          'Solen pulled you aside before the council meeting. "The wind doesn\'t forget," she said. "And neither should you."',
        important: false,
      },
      {
        title: "The Cartographer's Map",
        time: 'Session 2',
        content:
          'You were given a map with your own house marked on it — a house you never told anyone about, in a world you just arrived in.',
        important: true,
      },
    ],
  },

  '2': {
    name: 'Neon Abyssal',
    tag: 'CYBERPUNK',
    danger: 61,
    stability: 44,
    characters: [
      { name: 'Reyes', color: '#0ea5e9', role: 'Data Smuggler' },
      { name: 'Null', color: '#1e1b4b', role: 'Unknown Signal' },
    ],
    memories: [
      {
        title: 'The Rain That Glows',
        time: 'Session 1',
        content:
          'The bioluminescent rain burned faintly where it touched your skin. Reyes said that only happens to people who "aren\'t supposed to be here."',
        important: true,
      },
      {
        title: "Null's First Message",
        time: 'Session 3',
        content:
          'A signal cut through your comm line, no source, no ID. Just one line: "You already know how this ends."',
        important: true,
      },
    ],
  },

  '3': {
    name: 'Ashen Chronos',
    tag: 'TEMPORAL',
    danger: 48,
    stability: 60,
    characters: [
      { name: 'The Hourkeeper', color: '#a16207', role: 'Time Warden' },
      { name: 'Sera', color: '#d97706', role: 'Ruin Diver' },
    ],
    memories: [
      {
        title: 'Sunset Reversal',
        time: 'Session 1',
        content:
          'At sunset, the ruins rebuilt themselves stone by stone, and for a moment you saw the city as it once was — full, lit, alive.',
        important: false,
      },
      {
        title: "The Hourkeeper's Price",
        time: 'Session 2',
        content:
          '"Every question has a cost here," he said, "and you\'ve already asked three." You don\'t remember asking any.',
        important: true,
      },
    ],
  },
};

const fallbackUniverse = {
  name: 'Unknown Universe',
  tag: 'UNSTABLE',
  danger: 50,
  stability: 50,
  characters: [],
  memories: [],
};

/* رسايل شات mockup — كأننا لعبنا الكون دا قبل كدا */

const mockMessages = [
  {
    type: 'system',
    text: 'WATCH — Entry log restored. Continuing from last known point.',
  },
  {
    type: 'narrator',
    text: 'The chamber is quiet, save for the low hum of something vast turning beneath the floor. You are not alone here, but whoever else is has not yet chosen to be seen.',
  },
  {
    type: 'user',
    text: 'I stay still and listen.',
  },
  {
    type: 'narrator',
    text: 'Footsteps — deliberate, unhurried — circle you once before stopping just behind your left shoulder. A voice, dry as old paper, breaks the silence.',
  },
  {
    type: 'system',
    text: 'WATCH — New presence detected. Threat level: unconfirmed.',
  },
  {
    type: 'user',
    text: '"Who\'s there?"',
  },
  {
    type: 'narrator',
    text: 'A pause. Then: "Someone who has been waiting a very long time for you to ask that question."',
  },
];

/* ────────────────────────────────────────────────────────────
   نصوص الـ boot sequence — عادي / أخطاء وميض بيتختاروا عشوائي
   ──────────────────────────────────────────────────────────── */

const NORMAL_LINES = [
  'Initializing reality fabric...',
  'Calibrating dimensional anchors...',
  'Synchronizing narrative threads...',
  'Loading universe parameters...',
  'Establishing consciousness link...',
  'Rendering causal framework...',
  'Compiling memory archive...',
  'Awakening resident entities...',
  'Aligning timeline branches...',
];

const GLITCH_LINES = [
  'WARNING: Spacetime fabric disturbance detected.',
  'ERROR: Memory thread desynchronization.',
  'ANOMALY: Unauthorized presence detected.',
  'CRITICAL: Reality bleed exceeding safe threshold.',
  'ERROR: Signal lost... reacquiring...',
  'WARNING: Timeline integrity fluctuating.',
];

function buildBootScript(universeName) {
  const pool = [...NORMAL_LINES];
  const lines = [];
  const total = 7;

  for (let i = 0; i < total; i++) {
    const isGlitch = Math.random() < 0.28;

    if (isGlitch) {
      lines.push({
        text: GLITCH_LINES[Math.floor(Math.random() * GLITCH_LINES.length)],
        glitch: true,
      });
    } else {
      const idx = Math.floor(Math.random() * pool.length);

      lines.push({
        text: pool[idx],
        glitch: false,
      });

      pool.splice(idx, 1);

      if (pool.length === 0) {
        pool.push(...NORMAL_LINES);
      }
    }
  }

  lines.push({
    text: `Entry granted. Welcome back to ${universeName}.`,
    glitch: false,
    final: true,
  });

  return lines;
}

/* ────────────────────────────────────────────────────────────
   ICONS — inline SVGs, نفس أسلوب باقي المشروع (من غير مكتبات)
   ──────────────────────────────────────────────────────────── */

function ShieldIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function AlertTriangleIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function PanelIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="14" y1="4" x2="14" y2="20" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function UniversePage({ params }) {
  /*
    Next.js 16:
    params is a Promise in Client Components,
    so we unwrap it with React's use().
  */
  const { universeId } = use(params);

  const universe = universesData[universeId] || fallbackUniverse;

  const [phase, setPhase] = useState('boot');
  const [visibleLines, setVisibleLines] = useState([]);
  const [activeMemory, setActiveMemory] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ────────────────────────────────────────────────────────────
     BOOT SEQUENCE
     ──────────────────────────────────────────────────────────── */

  useEffect(() => {
    let cancelled = false;
    let timer = null;

    const script = buildBootScript(universe.name);

    setVisibleLines([]);
    setPhase('boot');

    let index = 0;

    const pushNext = () => {
      if (cancelled) return;

      if (index >= script.length) {
        timer = setTimeout(() => {
          if (!cancelled) {
            setPhase('fading');
          }
        }, 700);

        return;
      }

      const line = script[index];

      index += 1;

      /*
        Defensive check:
        visibleLines should never contain undefined.
      */
      if (line) {
        setVisibleLines((prev) => [...prev, line]);
      }

      const delay = 350 + Math.random() * 450;

      timer = setTimeout(pushNext, delay);
    };

    timer = setTimeout(pushNext, 400);

    return () => {
      cancelled = true;

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [universe.name]);

  /* ────────────────────────────────────────────────────────────
     BOOT → CHAT TRANSITION
     ──────────────────────────────────────────────────────────── */

  useEffect(() => {
    if (phase !== 'fading') {
      return;
    }

    const timer = setTimeout(() => {
      setPhase('chat');
    }, 1100);

    return () => {
      clearTimeout(timer);
    };
  }, [phase]);

  const showBoot = phase === 'boot' || phase === 'fading';

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <style>{`
        @keyframes crt-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.82; }
          94% { opacity: 1; }
          96% { opacity: 0.88; }
          97% { opacity: 1; }
        }

        @keyframes scan-move {
          0% { background-position: 0 0; }
          100% { background-position: 0 60px; }
        }

        @keyframes line-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes chat-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .boot-line {
          animation: line-in 0.35s ease-out both;
        }

        .boot-cursor {
          animation: cursor-blink 1s step-start infinite;
        }

        .chat-fade-in {
          animation: chat-in 0.6s ease-out both;
        }
      `}</style>

      {/* ══════════ BOOT / CRT SCREEN ══════════ */}

      {showBoot && (
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
              /*
                Extra protection against malformed state.
                Normally this will never trigger because the timer
                already checks for a valid line.
              */
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
      )}

      {/* ══════════ CHAT + SIDEBAR ══════════ */}

      {phase === 'chat' && (
        <div className="chat-fade-in flex h-screen">
          {/* BG ambient */}

          <div className="fixed inset-0 pointer-events-none z-0">
            <div
              className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px]"
              style={{
                background: 'rgba(88,28,135,0.1)',
              }}
            />
          </div>

          {/* ── CHAT COLUMN ── */}

          <div className="relative z-10 flex-1 flex flex-col min-w-0">
            {/* header */}

            <div
              className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4"
              style={{
                borderBottom: '1px solid rgba(147,51,234,0.15)',
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Back to home */}
                <Link
                  href="/Home"
                  aria-label="Back to home"
                  className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-colors duration-150 hover:bg-white/5"
                  style={{ border: '1px solid rgba(147,51,234,0.25)', color: 'rgba(216,180,254,0.8)' }}
                >
                  <BackIcon />
                </Link>

                <div className="flex flex-col min-w-0">
                  <span
                    className="text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.2em] uppercase"
                    style={{
                      color: 'rgba(147,51,234,0.6)',
                    }}
                  >
                    {universe.tag}
                  </span>

                  <h1 className="font-['Cinzel',serif] text-[1.05rem] sm:text-[1.3rem] font-black truncate">
                    {universe.name}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(16,185,129,0.12)',
                    border: '1px solid rgba(16,185,129,0.25)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                  <span className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-emerald-400">
                    Live
                  </span>
                </div>

                {/* Sidebar toggle — mobile / tablet only */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Show universe panel"
                  className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-150 hover:bg-white/5"
                  style={{ border: '1px solid rgba(147,51,234,0.25)', color: 'rgba(216,180,254,0.8)' }}
                >
                  <PanelIcon />
                </button>
              </div>
            </div>

            {/* messages */}

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
              {mockMessages.map((m, i) => {
                if (m.type === 'system') {
                  return (
                    <div key={i} className="flex justify-center">
                      <span
                        className="text-[0.62rem] sm:text-[0.68rem] font-mono tracking-wide px-3 py-1 rounded-full text-center"
                        style={{
                          background: 'rgba(147,51,234,0.08)',
                          border: '1px solid rgba(147,51,234,0.2)',
                          color: 'rgba(216,180,254,0.6)',
                        }}
                      >
                        {m.text}
                      </span>
                    </div>
                  );
                }

                if (m.type === 'narrator') {
                  return (
                    <p
                      key={i}
                      className="font-['Cinzel',serif] text-[0.85rem] sm:text-[0.92rem] leading-[1.8] italic max-w-[640px]"
                      style={{
                        color: 'rgba(255,255,255,0.65)',
                      }}
                    >
                      {m.text}
                    </p>
                  );
                }

                return (
                  <div key={i} className="flex justify-end">
                    <div
                      className="max-w-[85%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-[0.82rem] sm:text-[0.85rem] leading-relaxed"
                      style={{
                        background:
                          'linear-gradient(135deg, #7c3aed, #9333ea)',
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* input bar */}

            <div
              className="px-4 sm:px-6 py-4"
              style={{
                borderTop: '1px solid rgba(147,51,234,0.15)',
              }}
            >
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(147,51,234,0.2)',
                }}
              >
                <input
                  type="text"
                  placeholder="What do you do?"
                  className="flex-1 min-w-0 bg-transparent outline-none text-[0.82rem] sm:text-[0.85rem] placeholder:text-white/30"
                />

                <button
                  className="shrink-0 px-4 py-1.5 rounded-lg text-[0.75rem] font-bold uppercase tracking-wider"
                  style={{
                    background:
                      'linear-gradient(135deg, #7c3aed, #9333ea)',
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Backdrop — mobile/tablet only, shown while the panel is open */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-30"
              style={{ background: 'rgba(0,0,0,0.6)' }}
            />
          )}

          {/* ── SIDEBAR ── */}

          <aside
            className={`
              fixed lg:relative top-0 right-0 z-40 h-full
              w-[85%] max-w-[320px] lg:w-[300px] lg:max-w-none
              shrink-0 flex flex-col gap-6 px-5 py-6 overflow-y-auto
              transform transition-transform duration-300 ease-in-out
              ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0
            `}
            style={{
              borderLeft: '1px solid rgba(147,51,234,0.15)',
              background: '#0a0514',
            }}
          >
            {/* Close button — mobile / tablet only */}
            <div className="flex lg:hidden items-center justify-between -mb-2">
              <h3 className="font-['Cinzel',serif] text-[0.85rem] font-bold text-white/70">
                Universe Panel
              </h3>
              <button
                onClick={() => setSidebarOpen(false)}
                aria-label="Close panel"
                className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-150 hover:bg-white/5"
                style={{ border: '1px solid rgba(147,51,234,0.25)', color: 'rgba(216,180,254,0.8)' }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Reality Stability */}

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span
                  className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.15em] uppercase"
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  <ShieldIcon color="rgba(216,180,254,0.8)" />
                  Reality Stability
                </span>

                <span
                  className="text-[0.7rem] font-mono"
                  style={{
                    color: 'rgba(216,180,254,0.8)',
                  }}
                >
                  {universe.stability}%
                </span>
              </div>

              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${universe.stability}%`,
                    background:
                      'linear-gradient(90deg, #7c3aed, #c084fc)',
                  }}
                />
              </div>
            </div>

            {/* Danger Level */}

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span
                  className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.15em] uppercase"
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  <AlertTriangleIcon color="#f87171" />
                  Danger Level
                </span>

                <span
                  className="text-[0.7rem] font-mono"
                  style={{
                    color: '#f87171',
                  }}
                >
                  {universe.danger}%
                </span>
              </div>

              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${universe.danger}%`,
                    background:
                      'linear-gradient(90deg, #b91c1c, #f87171)',
                  }}
                />
              </div>
            </div>

            {/* Characters */}

            <div className="flex flex-col gap-3">
              <h3 className="font-['Cinzel',serif] text-[0.8rem] font-bold text-white/70">
                Characters Encountered
              </h3>

              <div className="flex flex-col gap-2">
                {universe.characters.length === 0 && (
                  <p
                    className="text-[0.72rem]"
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    No one has revealed themselves yet.
                  </p>
                )}

                {universe.characters.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[0.65rem] font-black shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${c.color}, #000)`,
                      }}
                    >
                      {c.name[0]}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="text-[0.78rem] font-semibold truncate">
                        {c.name}
                      </span>

                      <span
                        className="text-[0.65rem] truncate"
                        style={{
                          color: 'rgba(255,255,255,0.35)',
                        }}
                      >
                        {c.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Memory Slots */}

            <div className="flex flex-col gap-3">
              <h3 className="font-['Cinzel',serif] text-[0.8rem] font-bold text-white/70">
                Memory Fragments
              </h3>

              <div className="flex flex-col gap-2">
                {universe.memories.length === 0 && (
                  <p
                    className="text-[0.72rem]"
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    No memories recorded yet.
                  </p>
                )}

                {universe.memories.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveMemory(m)}
                    className="text-left rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-white/5"
                    style={{
                      background: m.important
                        ? 'rgba(147,51,234,0.08)'
                        : 'rgba(255,255,255,0.02)',
                      border: m.important
                        ? '1px solid rgba(147,51,234,0.25)'
                        : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[0.75rem] font-semibold truncate">
                        {m.title}
                      </span>

                      {m.important && (
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            background: '#c084fc',
                          }}
                        />
                      )}
                    </div>

                    <span
                      className="text-[0.62rem]"
                      style={{
                        color: 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {m.time}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ══════════ MEMORY POPUP ══════════ */}

      {activeMemory && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-6"
          style={{
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(3px)',
          }}
          onClick={() => setActiveMemory(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[440px] rounded-2xl p-6 flex flex-col gap-3"
            style={{
              background: '#0f0620',
              border: '1px solid rgba(147,51,234,0.3)',
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[0.65rem] font-bold tracking-[0.15em] uppercase"
                style={{
                  color: 'rgba(147,51,234,0.7)',
                }}
              >
                {activeMemory.time}
              </span>

              <button
                onClick={() => setActiveMemory(null)}
                className="text-[0.75rem]"
                style={{
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                ✕
              </button>
            </div>

            <h4 className="font-['Cinzel',serif] text-[1.05rem] font-bold">
              {activeMemory.title}
            </h4>

            <p
              className="text-[0.85rem] leading-relaxed italic"
              style={{
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              "{activeMemory.content}"
            </p>
          </div>
        </div>
      )}
    </main>
  );
}