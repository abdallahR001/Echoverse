'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const greetings = [
  'The universe is waiting.',
  'Welcome back, traveler.',
  'Good to see you again.',
  'The Verse remembers you.',
  'Another echo begins.',
];

const objectives = [
  { title: 'Locate the Meridian Core', world: 'The Shattered Meridian', urgent: true },
  { title: "Decipher Lyra's Last Message", world: 'The Shattered Meridian', urgent: false },
  { title: 'Restore Sector 4 Gravity Field', world: 'Echo Station 7', urgent: true },
];

const PLACEHOLDER_IMAGE = '/image1.png';
const API_URL = 'http://localhost:4000/api/home';
const ENTER_UNIVERSE_URL = 'http://localhost:4000/api/universes/enter';

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function HomePage() {
  const router = useRouter();

  const [greeting, setGreeting] = useState('');
  const [homeData, setHomeData] = useState(null);
  const [loadingHome, setLoadingHome] = useState(true);
  const [homeError, setHomeError] = useState(false);
  const [selectedUniverse, setSelectedUniverse] = useState(null);
  const [entering, setEntering] = useState(false);
  const [enterError, setEnterError] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchHome() {
      try {
        setLoadingHome(true);
        setHomeError(false);

        const res = await fetch(API_URL, {
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();

        if (!cancelled) {
          setHomeData(data);
        }
      } catch (err) {
        console.error('Failed to fetch home data:', err);

        if (!cancelled) {
          setHomeError(true);
        }
      } finally {
        if (!cancelled) {
          setLoadingHome(false);
        }
      }
    }

    fetchHome();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleConfirmEnter() {
    if (!selectedUniverse || entering) return;

    setEntering(true);
    setEnterError('');

    try {
      const res = await fetch(
        `${ENTER_UNIVERSE_URL}/${selectedUniverse.id}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.message || `Request failed with status ${res.status}`
        );
      }

      router.push(`/universe/${selectedUniverse.id}`);
    } catch (err) {
      setEnterError(
        err.message || 'Something went wrong entering this universe.'
      );
      setEntering(false);
    }
  }

  function closeEnterModal() {
    if (entering) return;

    setSelectedUniverse(null);
    setEnterError('');
  }

  const userName = homeData?.user?.name || 'Traveler';
  const current = homeData?.currentUniverse ?? null;
  const enteredUniverses = homeData?.enteredUniverses ?? [];
  const explorableUniverses = homeData?.universesToExplore ?? [];

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">

      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: 'rgba(88,28,135,0.12)' }}
        />

        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'rgba(109,40,217,0.08)' }}
        />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-5 py-10 flex flex-col gap-10">

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[1rem] font-bold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {userName}
            </span>

            <div className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="rgba(147,51,234,0.6)"
                  stroke="rgba(147,51,234,0.8)"
                  strokeWidth="1.5"
                />
              </svg>

              <span
                className="text-[0.65rem] font-bold tracking-[0.15em] uppercase"
                style={{
                  color: 'rgba(147,51,234,0.7)',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Free Plan
              </span>
            </div>
          </div>

          <Link href="/">
            <Image
              src="/EchoverseLogo.svg"
              alt="Echoverse"
              width={130}
              height={80}
              className="object-contain opacity-90"
            />
          </Link>
        </div>

        {/* ── GREETING ── */}
        <div className="flex flex-col gap-1">
          <p
            className="text-[0.78rem] font-semibold tracking-[0.2em] uppercase"
            style={{
              color: 'rgba(147,51,234,0.6)',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {greeting}
          </p>

          <h1
            className="text-[2.2rem] font-black leading-tight"
            style={{
              color: 'white',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Hello, {userName}.
          </h1>
        </div>

        {/* ── CURRENT UNIVERSE CARD ── */}
        <div
          className="relative rounded-2xl overflow-hidden min-h-[220px] flex flex-col justify-between p-6"
          style={{
            border: '1px solid rgba(147,51,234,0.2)',
          }}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={PLACEHOLDER_IMAGE}
              alt="Current universe"
              fill
              className="object-cover object-center opacity-25"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(20,5,40,0.75) 100%)',
              }}
            />
          </div>

          <div className="relative z-10 flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span
                className="text-[0.65rem] font-bold tracking-[0.2em] uppercase"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Current Universe
              </span>

              <h2
                className="text-[1.5rem] font-black text-white leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {current?.universe?.universeCode ??
                  (loadingHome ? '...' : 'No active universe')}
              </h2>
            </div>

            {current && (
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(16,185,129,0.12)',
                  border: '1px solid rgba(16,185,129,0.25)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                <span
                  className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-emerald-400"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Active
                </span>
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="relative z-10 mt-3 max-w-[520px]">
            <p
              className={`text-[0.88rem] leading-[1.75] ${
                showFullDescription ? '' : 'line-clamp-3'
              }`}
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {current?.universe?.description ??
                (loadingHome
                  ? ''
                  : 'Explore a universe to start your journey.')}
            </p>

            {current?.universe?.description?.length > 180 && (
              <button
                type="button"
                onClick={() =>
                  setShowFullDescription(prev => !prev)
                }
                className="mt-2 text-[0.7rem] font-bold tracking-[0.08em] uppercase transition-colors duration-200 hover:text-purple-300"
                style={{
                  color: '#a855f7',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {showFullDescription ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>

          <div className="relative z-10 flex items-center justify-end mt-5">
            {current ? (
              <Link
                href={`/universe/${current.universe.id}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.8rem] font-bold tracking-[0.08em] uppercase text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background:
                    'linear-gradient(135deg, #7c3aed, #9333ea)',
                  boxShadow: '0 0 20px rgba(147,51,234,0.3)',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.boxShadow =
                    '0 0 35px rgba(147,51,234,0.55)')
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.boxShadow =
                    '0 0 20px rgba(147,51,234,0.3)')
                }
              >
                Continue

                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <button
                disabled
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.8rem] font-bold tracking-[0.08em] uppercase text-white/40 cursor-not-allowed"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                No Universe Yet
              </button>
            )}
          </div>
        </div>

        {/* ── OBJECTIVES ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: 'rgba(147,51,234,0.12)',
                border: '1px solid rgba(147,51,234,0.25)',
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>

            <h3
              className="text-[0.9rem] font-bold text-white/70"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Objectives
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            {objectives.map((o, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-3.5 flex items-center justify-between gap-4"
                style={{
                  background: o.urgent
                    ? 'rgba(147,51,234,0.06)'
                    : 'rgba(255,255,255,0.03)',
                  border: o.urgent
                    ? '1px solid rgba(147,51,234,0.2)'
                    : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-[0.62rem] font-bold tracking-[0.15em] uppercase"
                    style={{
                      color: o.urgent
                        ? 'rgba(168,85,247,0.85)'
                        : 'rgba(255,255,255,0.3)',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {o.world}
                  </span>

                  <p
                    className="text-[0.85rem] font-semibold text-white/90 leading-snug"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {o.title}
                  </p>
                </div>

                {o.urgent && (
                  <span
                    className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{
                      background: '#a855f7',
                      boxShadow: '0 0 6px rgba(168,85,247,0.7)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── YOUR UNIVERSES ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3
              className="text-[0.95rem] font-bold text-white/70"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Your Universes
            </h3>

            <span
              className="text-[0.7rem] tracking-[0.12em] uppercase"
              style={{
                color: 'rgba(255,255,255,0.25)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {enteredUniverses.length} total
            </span>
          </div>

          {loadingHome && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className="rounded-2xl min-h-[110px] animate-pulse"
                  style={{
                    border: '1px solid rgba(147,51,234,0.1)',
                    background: 'rgba(147,51,234,0.04)',
                  }}
                />
              ))}
            </div>
          )}

          {!loadingHome &&
            enteredUniverses.length === 0 &&
            !homeError && (
              <div
                className="rounded-xl p-5 text-center text-[0.8rem]"
                style={{
                  border: '1px solid rgba(147,51,234,0.15)',
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                You haven't entered any universes yet.
              </div>
            )}

          {!loadingHome && enteredUniverses.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {enteredUniverses.map(u => {
                const isActive = current?.id === u.id;

                return (
                  <Link
                    key={u.id}
                    href={`/universe/${u.universe.id}`}
                    className="relative rounded-2xl overflow-hidden flex flex-col gap-3 p-5 transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(109,28,200,0.2), rgba(0,0,0,0.6))'
                        : 'rgba(255,255,255,0.03)',
                      border: isActive
                        ? '1px solid rgba(147,51,234,0.45)'
                        : '1px solid rgba(255,255,255,0.07)',
                      minHeight: '110px',
                    }}
                  >
                    {isActive && (
                      <div
                        className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2 py-1 rounded-full"
                        style={{
                          background: 'rgba(16,185,129,0.12)',
                          border: '1px solid rgba(16,185,129,0.25)',
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />

                        <span
                          className="text-[0.58rem] font-bold tracking-[0.1em] uppercase text-emerald-400"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          Active
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col gap-1 pr-16">
                      <span
                        className="text-[0.62rem] font-bold tracking-[0.18em] uppercase"
                        style={{
                          color: isActive
                            ? 'rgba(168,85,247,0.8)'
                            : 'rgba(255,255,255,0.28)',
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {u.status}
                      </span>

                      <span
                        className="text-[0.95rem] font-bold leading-tight text-white"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        {u.universe.universeCode}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <span
                        className="text-[0.68rem]"
                        style={{
                          color: 'rgba(255,255,255,0.25)',
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        Since {formatDate(u.created_at)}
                      </span>

                      <span
                        className="text-[0.68rem] font-bold tracking-wider uppercase flex items-center gap-1"
                        style={{
                          color: isActive
                            ? '#a855f7'
                            : 'rgba(255,255,255,0.2)',
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        Continue

                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* ── UNIVERSES YOU MAY EXPLORE ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3
              className="text-[0.95rem] font-bold text-white/70"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Universes You May Explore
            </h3>

            <span
              className="text-[0.7rem] tracking-[0.12em] uppercase"
              style={{
                color: 'rgba(147,51,234,0.6)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Discover
            </span>
          </div>

          {loadingHome && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="rounded-2xl min-h-[280px] animate-pulse"
                  style={{
                    border: '1px solid rgba(147,51,234,0.15)',
                    background: 'rgba(147,51,234,0.05)',
                  }}
                />
              ))}
            </div>
          )}

          {!loadingHome && homeError && (
            <div
              className="rounded-2xl p-6 text-center text-[0.85rem]"
              style={{
                border: '1px solid rgba(147,51,234,0.2)',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Couldn't reach the universes right now. Try again in a moment.
            </div>
          )}

          {!loadingHome &&
            !homeError &&
            explorableUniverses.length === 0 && (
              <div
                className="rounded-2xl p-6 text-center text-[0.85rem]"
                style={{
                  border: '1px solid rgba(147,51,234,0.2)',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                No universes to explore yet.
              </div>
            )}

          {!loadingHome &&
            !homeError &&
            explorableUniverses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {explorableUniverses.map(u => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      setEnterError('');
                      setSelectedUniverse(u);
                    }}
                    className="relative rounded-2xl overflow-hidden min-h-[280px] flex flex-col justify-between p-5 group transition-all duration-300 hover:-translate-y-1 text-left"
                    style={{
                      border: '1px solid rgba(147,51,234,0.25)',
                    }}
                  >
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={PLACEHOLDER_IMAGE}
                        alt={u.universeCode}
                        fill
                        className="object-cover object-center opacity-30 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-40"
                      />

                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(10,2,20,0.85) 60%, rgba(0,0,0,0.95) 100%)',
                        }}
                      />
                    </div>

                    <div className="relative z-10">
                      <span
                        className="text-[0.65rem] font-bold font-mono px-2 py-0.5 rounded-md"
                        style={{
                          background: 'rgba(147,51,234,0.25)',
                          border: '1px solid rgba(147,51,234,0.4)',
                          color: '#a855f7',
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {u.universeCode}
                      </span>
                    </div>

                    <div className="relative z-10 flex flex-col gap-2 mt-auto">
                      <p
                        className="text-[0.75rem] leading-relaxed line-clamp-4"
                        style={{
                          color: 'rgba(255,255,255,0.65)',
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {u.description}
                      </p>

                      <div className="flex items-center justify-end pt-3 mt-1 border-t border-white/10">
                        <span
                          className="text-[0.68rem] font-bold tracking-widest uppercase text-purple-400 group-hover:text-purple-300 flex items-center gap-1"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          Explore

                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* ── ENTER UNIVERSE MODAL ── */}
      {selectedUniverse && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
          style={{
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(6px)',
          }}
          onClick={closeEnterModal}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full sm:max-w-[480px] flex flex-col max-h-[90dvh] sm:max-h-[85dvh] rounded-t-3xl sm:rounded-2xl overflow-hidden"
            style={{
              background:
                'linear-gradient(180deg, #130825 0%, #0a0414 100%)',
              border: '1px solid rgba(147,51,234,0.25)',
            }}
          >

            {/* Drag handle — mobile only */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden flex-shrink-0">
              <div
                className="w-10 h-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              />
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">

              {/* Header */}
              <div className="flex items-start justify-between gap-4 flex-shrink-0">
                <div className="flex flex-col gap-1.5">
                  <span
                    className="text-[0.6rem] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded-md w-fit"
                    style={{
                      background: 'rgba(147,51,234,0.2)',
                      border: '1px solid rgba(147,51,234,0.35)',
                      color: '#a855f7',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {selectedUniverse.universeCode}
                  </span>

                  <h3
                    className="text-[1.2rem] font-bold text-white leading-tight"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    Enter this universe?
                  </h3>
                </div>

                <button
                  onClick={closeEnterModal}
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 mt-0.5"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background =
                      'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background =
                      'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color =
                      'rgba(255,255,255,0.4)';
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full"
                style={{ background: 'rgba(147,51,234,0.12)' }}
              />

              {/* Description */}
              <p
                className="text-[0.88rem] leading-[1.8]"
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {selectedUniverse.description}
              </p>

              {/* Free plan warning */}
              <div
                className="flex items-start gap-3 rounded-xl p-4"
                style={{
                  background: 'rgba(245,158,11,0.07)',
                  border: '1px solid rgba(245,158,11,0.2)',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  className="shrink-0 mt-0.5"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>

                <p
                  className="text-[0.78rem] leading-[1.75]"
                  style={{
                    color: 'rgba(253,230,138,0.85)',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  You're on the{' '}
                  <strong className="text-amber-300">
                    Free Plan
                  </strong>
                  . Entering this universe will lock your other active
                  universes until you upgrade.
                </p>
              </div>

              {/* Error */}
              {enterError && (
                <div
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.2)',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    className="flex-shrink-0"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>

                  <p
                    className="text-[0.78rem]"
                    style={{
                      color: '#fca5a5',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {enterError}
                  </p>
                </div>
              )}
            </div>

            {/* Sticky action buttons */}
            <div
              className="flex-shrink-0 flex items-center gap-3 px-6 py-4"
              style={{
                borderTop: '1px solid rgba(147,51,234,0.1)',
                background: 'rgba(10,4,20,0.9)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <button
                onClick={closeEnterModal}
                disabled={entering}
                className="flex-1 py-3 rounded-xl text-[0.8rem] font-bold uppercase tracking-wider transition-all duration-200 disabled:opacity-50"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor =
                    'rgba(255,255,255,0.2)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor =
                    'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color =
                    'rgba(255,255,255,0.6)';
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmEnter}
                disabled={entering}
                className="flex-1 py-3 rounded-xl text-[0.8rem] font-bold uppercase tracking-wider text-white transition-all duration-200 disabled:opacity-60 hover:enabled:-translate-y-0.5"
                style={{
                  background:
                    'linear-gradient(135deg, #7c3aed, #9333ea)',
                  boxShadow: '0 0 20px rgba(147,51,234,0.3)',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => {
                  if (!entering) {
                    e.currentTarget.style.boxShadow =
                      '0 0 35px rgba(147,51,234,0.55)';
                  }
                }}
                onMouseLeave={e =>
                  (e.currentTarget.style.boxShadow =
                    '0 0 20px rgba(147,51,234,0.3)')
                }
              >
                {entering ? 'Entering...' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}