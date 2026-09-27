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

// لسه مش جاية من الباك اند — سايبها زي ما هي لحد ما الـ endpoint يرجعها
const mockCharacters = [
  { name: 'Lyra', color: '#9333ea' },
  { name: 'Kael', color: '#6b21a8' },
  { name: 'The Archivist', color: '#4c1d95' },
  { name: 'Mira', color: '#7c3aed' },
  { name: 'Ghost', color: '#3b0764' },
];

// الأهداف الرئيسية داخل الكون الحالي (بديل الـ Signals) — لسه mock
const objectives = [
  {
    title: 'Locate the Meridian Core',
    world: 'The Shattered Meridian',
    progress: '2 / 3 Steps',
    urgent: true,
  },
  {
    title: 'Decipher Lyra\'s Last Message',
    world: 'The Shattered Meridian',
    progress: 'Pending',
    urgent: false,
  },
  {
    title: 'Restore Sector 4 Gravity Field',
    world: 'Echo Station 7',
    progress: '1 / 4 Steps',
    urgent: true,
  },
];

// لسه mock
const memories = [
  { world: 'Echo Station 7', memory: 'You found a message written in your own handwriting. You have no memory of writing it.', time: 'Session 4' },
  { world: 'The Hollow Crown', memory: 'The king offered you a crown. You refused. He smiled.', time: 'Session 7' },
  { world: 'Kepler Café', memory: 'You left without paying. The cashier didn\'t stop you. No one did.', time: 'Session 2' },
  { world: 'The Shattered Meridian', memory: 'Lyra disappeared mid-sentence. Her chair was still warm.', time: 'Session 3' },
];

// Placeholder image used until the backend returns real cover art
const PLACEHOLDER_IMAGE = '/image1.png';

const API_URL = 'http://localhost:4000/api/home';
const ENTER_UNIVERSE_URL = 'http://localhost:4000/api/universes/enter';

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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

  // Popup shown before entering a new universe from "Universes You May Explore"
  const [selectedUniverse, setSelectedUniverse] = useState(null);
  const [entering, setEntering] = useState(false);
  const [enterError, setEnterError] = useState('');

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchHome() {
      try {
        setLoadingHome(true);
        setHomeError(false);
        const res = await fetch(API_URL, { credentials: 'include' });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const data = await res.json();
        if (!cancelled) setHomeData(data);
      } catch (err) {
        console.error('Failed to fetch home data:', err);
        if (!cancelled) setHomeError(true);
      } finally {
        if (!cancelled) setLoadingHome(false);
      }
    }

    fetchHome();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ────────────────────────────────────────────────────────────
     ENTER UNIVERSE — confirms via popup, POSTs to /api/enter/:id,
     then takes the user straight into the chat
     ──────────────────────────────────────────────────────────── */

  async function handleConfirmEnter() {
    if (!selectedUniverse || entering) return;

    setEntering(true);
    setEnterError('');

    try {
      const res = await fetch(`${ENTER_UNIVERSE_URL}/${selectedUniverse.id}`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || `Request failed with status ${res.status}`);
      }

      router.push(`/universe/${selectedUniverse.id}`);
    } catch (err) {
      console.error('Failed to enter universe:', err);
      setEnterError(err.message || 'Something went wrong entering this universe.');
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

  const visibleChars = mockCharacters.slice(0, 3);
  const extraChars = mockCharacters.length - 3;

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* BG ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px]" style={{ background: 'rgba(88,28,135,0.12)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: 'rgba(109,40,217,0.08)' }} />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-5 py-10 flex flex-col gap-10">

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between">

          {/* User info */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2" style={{ borderColor: 'rgba(147,51,234,0.4)' }}>
                <div
                  className="w-full h-full flex items-center justify-center text-xl font-black"
                  style={{ background: 'linear-gradient(135deg, #4c1d95, #7c3aed)' }}
                >
                  {userName[0]?.toUpperCase() ?? 'A'}
                </div>
              </div>
              {/* online dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black" />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-sans text-[1rem] font-bold text-white">{userName}</span>

              {/* Plan badge */}
              <div className="flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="rgba(147,51,234,0.6)" stroke="rgba(147,51,234,0.8)" strokeWidth="1.5"/>
                </svg>
                <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase" style={{ color: 'rgba(147,51,234,0.7)' }}>
                  Free Plan
                </span>
              </div>
            </div>
          </div>

          {/* Logo */}
          <Link href="/">
            <Image src="/logo.svg" alt="Echoverse" width={90} height={55} className="object-contain opacity-80" />
          </Link>
        </div>

        {/* ── GREETING ── */}
        <div className="flex flex-col gap-1">
          <p className="text-[0.78rem] font-semibold tracking-[0.2em] uppercase" style={{ color: 'rgba(147,51,234,0.6)' }}>
            {greeting}
          </p>
          <h1 className="font-sans text-[2.2rem] font-black leading-tight" style={{ color: 'white' }}>
            Hello, {userName}.
          </h1>
        </div>

        {/* ── CURRENT UNIVERSE CARD ── */}
        <div className="relative rounded-2xl overflow-hidden min-h-[260px] flex flex-col justify-between p-6" style={{ border: '1px solid rgba(147,51,234,0.2)' }}>

          {/* BG image layer */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/image1.png"
              alt="Current universe"
              fill
              className="object-cover object-center opacity-25"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(20,5,40,0.75) 100%)' }} />
          </div>

          {/* TOP ROW */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Current Universe
              </span>
              <h2 className="font-sans text-[1.5rem] font-black text-white leading-tight">
                {current?.universe?.universeCode ?? (loadingHome ? '...' : 'No active universe')}
              </h2>
            </div>

            {/* Active signal */}
            {current && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-emerald-400">
                  Active
                </span>
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="relative z-10 text-[0.88rem] leading-[1.75] mt-3" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '520px' }}>
            {current?.universe?.description ?? (loadingHome ? '' : 'Explore a universe to start your journey.')}
          </p>

          {/* BOTTOM ROW */}
          <div className="relative z-10 flex items-center justify-between mt-5">

            {/* Characters */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {visibleChars.map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-[0.65rem] font-black text-white"
                    style={{ background: `linear-gradient(135deg, ${c.color}, #000)`, zIndex: 3 - i }}
                    title={c.name}
                  >
                    {c.name[0]}
                  </div>
                ))}
                {extraChars > 0 && (
                  <div
                    className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-[0.6rem] font-bold"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', zIndex: 0 }}
                  >
                    +{extraChars}
                  </div>
                )}
              </div>
              <span className="text-[0.72rem]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {mockCharacters.length} characters met
              </span>
            </div>

            {/* Continue button */}
            {current ? (
              <Link
                href={`/universe/${current.universe.id}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.8rem] font-bold tracking-[0.08em] uppercase text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
                  boxShadow: '0 0 20px rgba(147,51,234,0.3)',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 35px rgba(147,51,234,0.55)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(147,51,234,0.3)'}
              >
                Continue
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <button
                disabled
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.8rem] font-bold tracking-[0.08em] uppercase text-white/40 cursor-not-allowed"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                No Universe Yet
              </button>
            )}

          </div>
        </div>

        {/* ── OBJECTIVES + MEMORIES ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* OBJECTIVES (Replacement for Signals) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(147,51,234,0.12)', border: '1px solid rgba(147,51,234,0.25)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className="font-sans text-[0.9rem] font-bold text-white/70">Objectives</h3>
            </div>

            <div className="flex flex-col gap-2">
              {objectives.map((o, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3.5 flex flex-col gap-1.5 transition-all duration-200"
                  style={{
                    background: o.urgent ? 'rgba(147,51,234,0.06)' : 'rgba(255,255,255,0.03)',
                    border: o.urgent ? '1px solid rgba(147,51,234,0.2)' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[0.62rem] font-bold tracking-[0.15em] uppercase" style={{ color: o.urgent ? 'rgba(168,85,247,0.85)' : 'rgba(255,255,255,0.3)' }}>
                      {o.world}
                    </span>
                    <span className="text-[0.62rem] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{o.progress}</span>
                  </div>
                  <p className="text-[0.82rem] font-semibold text-white/90 leading-snug">
                    {o.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* MEMORIES */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(147,51,234,0.12)', border: '1px solid rgba(147,51,234,0.2)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2.5">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="font-sans text-[0.9rem] font-bold text-white/70">Memories</h3>
            </div>

            <div className="flex flex-col gap-2">
              {memories.map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3.5 flex flex-col gap-1.5"
                  style={{
                    background: 'rgba(147,51,234,0.04)',
                    border: '1px solid rgba(147,51,234,0.1)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[0.62rem] font-bold tracking-[0.15em] uppercase" style={{ color: 'rgba(147,51,234,0.6)' }}>
                      {m.world}
                    </span>
                    <span className="text-[0.6rem]" style={{ color: 'rgba(255,255,255,0.2)' }}>{m.time}</span>
                  </div>
                  <p className="text-[0.8rem] leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    "{m.memory}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── YOUR UNIVERSES (fetched from API) ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-sans text-[0.95rem] font-bold text-white/70 tracking-wide">
              Your Universes
            </h3>
            <span className="text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {enteredUniverses.length} total
            </span>
          </div>

          {loadingHome && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden min-h-[92px] animate-pulse"
                  style={{ border: '1px solid rgba(147,51,234,0.1)', background: 'rgba(147,51,234,0.04)' }}
                />
              ))}
            </div>
          )}

          {!loadingHome && enteredUniverses.length === 0 && !homeError && (
            <div
              className="rounded-xl p-5 text-center text-[0.8rem]"
              style={{ border: '1px solid rgba(147,51,234,0.15)', color: 'rgba(255,255,255,0.35)' }}
            >
              You haven't entered any universes yet.
            </div>
          )}

          {!loadingHome && enteredUniverses.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {enteredUniverses.map((u) => {
                const isActive = current?.id === u.id;
                return (
                  <Link
                    key={u.id}
                    href={`/universe/${u.universe.id}`}
                    className="relative rounded-xl overflow-hidden p-4 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: isActive ? 'linear-gradient(135deg, #1a0a2e, rgba(0,0,0,0.8))' : 'rgba(255,255,255,0.03)',
                      border: isActive ? '1px solid rgba(147,51,234,0.5)' : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <span
                      className="text-[0.58rem] font-bold tracking-[0.18em] uppercase"
                      style={{ color: isActive ? '#9333ea' : 'rgba(255,255,255,0.3)' }}
                    >
                      {u.status}
                    </span>
                    <span className="font-sans text-[0.8rem] font-bold leading-tight text-white">
                      {u.universe.universeCode}
                    </span>
                    <span className="text-[0.65rem]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      Since {formatDate(u.created_at)}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* ── UNIVERSES YOU MAY EXPLORE (fetched from API) ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-sans text-[0.95rem] font-bold text-white/70 tracking-wide">
              Universes You May Explore
            </h3>
            <span className="text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: 'rgba(147,51,234,0.6)' }}>
              Discover
            </span>
          </div>

          {/* Loading state */}
          {loadingHome && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden min-h-[320px] animate-pulse"
                  style={{ border: '1px solid rgba(147,51,234,0.15)', background: 'rgba(147,51,234,0.05)' }}
                />
              ))}
            </div>
          )}

          {/* Error state */}
          {!loadingHome && homeError && (
            <div
              className="rounded-2xl p-6 text-center text-[0.85rem]"
              style={{ border: '1px solid rgba(147,51,234,0.2)', color: 'rgba(255,255,255,0.4)' }}
            >
              Couldn't reach the universes right now. Try again in a moment.
            </div>
          )}

          {/* Empty state */}
          {!loadingHome && !homeError && explorableUniverses.length === 0 && (
            <div
              className="rounded-2xl p-6 text-center text-[0.85rem]"
              style={{ border: '1px solid rgba(147,51,234,0.2)', color: 'rgba(255,255,255,0.4)' }}
            >
              No universes to explore yet.
            </div>
          )}

          {/* Loaded universes */}
          {!loadingHome && !homeError && explorableUniverses.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {explorableUniverses.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => {
                    setEnterError('');
                    setSelectedUniverse(u);
                  }}
                  className="relative rounded-2xl overflow-hidden min-h-[320px] flex flex-col justify-between p-5 group transition-all duration-300 hover:-translate-y-1 text-left"
                  style={{ border: '1px solid rgba(147,51,234,0.25)' }}
                >
                  {/* Background Image Layer */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={PLACEHOLDER_IMAGE}
                      alt={u.universeCode}
                      fill
                      className="object-cover object-center opacity-30 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-40"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(10,2,20,0.85) 60%, rgba(0,0,0,0.95) 100%)' }} />
                  </div>

                  {/* Top Header inside Card */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[0.65rem] font-bold font-mono px-2 py-0.5 rounded-md" style={{ background: 'rgba(147,51,234,0.25)', border: '1px solid rgba(147,51,234,0.4)', color: '#a855f7' }}>
                      {u.universeCode}
                    </span>
                  </div>

                  {/* Bottom Content inside Card */}
                  <div className="relative z-10 flex flex-col gap-2 mt-auto pt-10">
                    <p className="text-[0.75rem] leading-relaxed line-clamp-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {u.description}
                    </p>

                    <div className="flex items-center justify-end pt-3 mt-1 border-t border-white/10">
                      <span className="text-[0.68rem] font-bold tracking-widest uppercase text-purple-400 group-hover:text-purple-300 flex items-center gap-1">
                        Explore
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
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

      {/* ══════════ ENTER UNIVERSE CONFIRMATION POPUP ══════════ */}

      {selectedUniverse && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-6"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
          onClick={closeEnterModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[460px] rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: '#0f0620', border: '1px solid rgba(147,51,234,0.3)' }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[0.6rem] font-bold font-mono tracking-[0.15em] uppercase" style={{ color: '#a855f7' }}>
                  {selectedUniverse.universeCode}
                </span>
                <h3 className="font-sans text-[1.15rem] font-bold text-white leading-tight">
                  Enter this universe?
                </h3>
              </div>
              <button
                onClick={closeEnterModal}
                aria-label="Close"
                className="text-[0.9rem] shrink-0"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                ✕
              </button>
            </div>

            <p className="text-[0.82rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {selectedUniverse.description}
            </p>

            {/* Free plan warning */}
            <div
              className="flex items-start gap-2.5 rounded-xl p-3.5"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <p className="text-[0.75rem] leading-relaxed" style={{ color: 'rgba(253,230,138,0.9)' }}>
                You're on the <strong>Free Plan</strong>. Entering this universe will lock the
                universes you've already entered — you won't be able to continue them until you
                upgrade.
              </p>
            </div>

            {enterError && (
              <p className="text-[0.75rem]" style={{ color: '#f87171' }}>
                {enterError}
              </p>
            )}

            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={closeEnterModal}
                disabled={entering}
                className="flex-1 px-4 py-2.5 rounded-xl text-[0.78rem] font-bold uppercase tracking-wider transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmEnter}
                disabled={entering}
                className="flex-1 px-4 py-2.5 rounded-xl text-[0.78rem] font-bold uppercase tracking-wider text-white disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)' }}
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