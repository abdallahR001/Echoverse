'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const greetings = [
  'The universe is waiting.',
  'Welcome back, traveler.',
  'Good to see you again.',
  'The Verse remembers you.',
  'Another echo begins.',
];

const currentUniverse = {
  name: 'The Shattered Meridian',
  description:
    'A fractured city suspended between dimensions. Time moves differently here — an hour inside can mean days outside. You arrived three sessions ago. You still don\'t know why.',
  characters: [
    { name: 'Lyra', color: '#9333ea' },
    { name: 'Kael', color: '#6b21a8' },
    { name: 'The Archivist', color: '#4c1d95' },
    { name: 'Mira', color: '#7c3aed' },
    { name: 'Ghost', color: '#3b0764' },
  ],
};

const pastUniverses = [
  {
    name: 'Echo Station 7',
    tag: 'SCI-FI',
    sessions: 4,
    color: '#1e1b4b',
    accent: '#6366f1',
  },
  {
    name: 'The Hollow Crown',
    tag: 'FANTASY',
    sessions: 7,
    color: '#1c1917',
    accent: '#a16207',
  },
  {
    name: 'Kepler Café',
    tag: 'THRILLER',
    sessions: 2,
    color: '#0f172a',
    accent: '#0ea5e9',
  },
  {
    name: 'The Shattered Meridian',
    tag: 'SURREAL',
    sessions: 3,
    color: '#1a0a2e',
    accent: '#9333ea',
    active: true,
  },
];

const signals = [
  { world: 'Echo Station 7', message: 'An anomaly has been detected near sector 4.', time: '2h ago', urgent: true },
  { world: 'The Hollow Crown', message: 'Someone opened the sealed gate.', time: '5h ago', urgent: false },
  { world: 'Kepler Café', message: 'The stranger returned. He\'s asking about you.', time: '1d ago', urgent: true },
  { world: 'Echo Station 7', message: 'A distress signal was intercepted. Origin unknown.', time: '2d ago', urgent: false },
];

const memories = [
  { world: 'Echo Station 7', memory: 'You found a message written in your own handwriting. You have no memory of writing it.', time: 'Session 4' },
  { world: 'The Hollow Crown', memory: 'The king offered you a crown. You refused. He smiled.', time: 'Session 7' },
  { world: 'Kepler Café', memory: 'You left without paying. The cashier didn\'t stop you. No one did.', time: 'Session 2' },
  { world: 'The Shattered Meridian', memory: 'Lyra disappeared mid-sentence. Her chair was still warm.', time: 'Session 3' },
];

export default function HomePage() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  const visibleChars = currentUniverse.characters.slice(0, 3);
  const extraChars = currentUniverse.characters.length - 3;

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
                  A
                </div>
              </div>
              {/* online dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black" />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-['Cinzel',serif] text-[1rem] font-bold text-white">Abdullah</span>

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
          <h1 className="font-['Cinzel',serif] text-[2.2rem] font-black leading-tight" style={{ color: 'white' }}>
            Hello, Abdullah.
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
              <h2 className="font-['Cinzel',serif] text-[1.5rem] font-black text-white leading-tight">
                {currentUniverse.name}
              </h2>
            </div>

            {/* Active signal */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-emerald-400">
                Active
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="relative z-10 text-[0.88rem] leading-[1.75] mt-3" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '520px' }}>
            {currentUniverse.description}
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
                {currentUniverse.characters.length} characters met
              </span>
            </div>

            {/* Continue button */}
            <button
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
            </button>

          </div>
        </div>

        {/* ── PAST UNIVERSES ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Cinzel',serif] text-[0.95rem] font-bold text-white/70 tracking-wide">
              Your Universes
            </h3>
            <span className="text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {pastUniverses.length} total
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {pastUniverses.map((u, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden p-4 flex flex-col gap-2 transition-all duration-200"
                style={{
                  background: u.active ? `linear-gradient(135deg, ${u.color}, rgba(0,0,0,0.8))` : 'rgba(255,255,255,0.03)',
                  border: u.active ? `1px solid ${u.accent}50` : '1px solid rgba(255,255,255,0.06)',
                  opacity: u.active ? 1 : 0.6,
                }}
              >
                {/* Lock icon for locked universes */}
                {!u.active && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 rounded-xl" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <span className="text-[0.58rem] font-bold tracking-[0.1em] uppercase text-center px-2 leading-tight" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Upgrade to enter
                    </span>
                  </div>
                )}

                <span
                  className="text-[0.58rem] font-bold tracking-[0.18em] uppercase"
                  style={{ color: u.active ? u.accent : 'rgba(255,255,255,0.3)' }}
                >
                  {u.tag}
                </span>
                <span className="font-['Cinzel',serif] text-[0.8rem] font-bold leading-tight" style={{ color: u.active ? 'white' : 'rgba(255,255,255,0.5)' }}>
                  {u.name}
                </span>
                <span className="text-[0.65rem]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {u.sessions} sessions
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── SIGNALS + MEMORIES ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* SIGNALS */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {/* Signal icon */}
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <h3 className="font-['Cinzel',serif] text-[0.9rem] font-bold text-white/70">Signals</h3>
            </div>

            <div className="flex flex-col gap-2">
              {signals.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3.5 flex flex-col gap-1.5 transition-all duration-200"
                  style={{
                    background: s.urgent ? 'rgba(239,68,68,0.05)' : 'rgba(255,255,255,0.03)',
                    border: s.urgent ? '1px solid rgba(239,68,68,0.15)' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[0.62rem] font-bold tracking-[0.15em] uppercase" style={{ color: s.urgent ? 'rgba(239,68,68,0.7)' : 'rgba(255,255,255,0.3)' }}>
                      {s.urgent && '⚠ '}{s.world}
                    </span>
                    <span className="text-[0.6rem]" style={{ color: 'rgba(255,255,255,0.2)' }}>{s.time}</span>
                  </div>
                  <p className="text-[0.8rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {s.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* MEMORIES */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {/* Memory icon */}
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(147,51,234,0.12)', border: '1px solid rgba(147,51,234,0.2)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2.5">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="font-['Cinzel',serif] text-[0.9rem] font-bold text-white/70">Memories</h3>
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

        {/* ── ENTER NEW WORLD ── */}
        <div className="relative rounded-2xl overflow-hidden min-h-[160px] flex items-center justify-center cursor-pointer group" style={{ border: '1px solid rgba(147,51,234,0.2)' }}>

          {/* BG */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/image2.png"
              alt="New world"
              fill
              className="object-cover object-center opacity-20 transition-all duration-500 group-hover:opacity-30 group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(30,5,60,0.7) 100%)' }} />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3 py-10">
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(147,51,234,0.2)', border: '1px solid rgba(147,51,234,0.4)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="font-['Cinzel',serif] text-[1.1rem] font-bold text-white">Enter a New World</p>
              <p className="text-[0.78rem] mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                The Verse will choose for you.
              </p>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}