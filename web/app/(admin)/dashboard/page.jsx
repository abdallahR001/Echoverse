'use client';

import { useState } from 'react';
import UniverseCard from '../../components/AdminPageUniverseCard';
import AddUniverseModal from '../../components/AddUniverseModal';
import EditUniverseModal from '../../components/EditUniverseModal';

const FAKE_UNIVERSES = [
  {
    id: 1,
    name: 'The Shattered Meridian',
    description: 'A fractured city suspended between dimensions. Time moves differently here.',
    cover: '/image1.png',
    players: 312,
    infos: [
      { id: 1, content: 'Time loops every 48 hours inside the city walls.' },
      { id: 2, content: 'The northern district has been completely erased from all maps.' },
    ],
  },
  {
    id: 2,
    name: 'Echo Station 7',
    description: 'An abandoned orbital station where the AI crew never powered down.',
    cover: '/image2.png',
    players: 198,
    infos: [
      { id: 1, content: 'The AI known as VELA controls all airlocks.' },
    ],
  },
  {
    id: 3,
    name: 'The Hollow Crown',
    description: 'A medieval kingdom where the king died three years ago — nobody told the court.',
    cover: '/image1.png',
    players: 87,
    infos: [],
  },
];

const FAKE_STATS = {
  players: 1204,
  universes: 3,
  activeSessions: 47,
};

export default function AdminDashboard() {
  const [universes, setUniverses] = useState(FAKE_UNIVERSES);
  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const handleAdd = (newUniverse) => {
    setUniverses(prev => [...prev, { ...newUniverse, id: Date.now(), players: 0, infos: [] }]);
    setShowAdd(false);
  };

  const handleEdit = (updated) => {
    setUniverses(prev => prev.map(u => u.id === updated.id ? updated : u));
    setEditTarget(null);
  };

  const handleDelete = (id) => {
    setUniverses(prev => prev.filter(u => u.id !== id));
    setEditTarget(null);
  };

  return (
    <main className="min-h-screen bg-[#020204] text-white">

      {/* Header */}
      <header
        className="sticky top-0 z-40 px-8 h-16 flex items-center justify-between"
        style={{
          background: 'rgba(2,2,4,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(147,51,234,0.12)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6d28d9, #9333ea)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/>
            </svg>
          </div>
          <span
            className="font-black text-[0.9rem] tracking-[0.15em] uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.85)' }}
          >
            Echoverse <span style={{ color: 'rgba(147,51,234,0.7)' }}>Admin</span>
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'pulse 2s ease-in-out infinite', boxShadow: '0 0 6px rgba(52,211,153,0.6)' }} />
          <span className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-emerald-400">Live</span>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-8 py-10 flex flex-col gap-10">

        {/* Page title */}
        <div className="flex flex-col gap-1">
          <h1
            className="font-black text-[1.8rem] tracking-[-0.02em]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.9)' }}
          >
            Dashboard
          </h1>
          <p className="text-[0.85rem]" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'DM Sans', sans-serif" }}>
            Manage your universes, players, and lore.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: 'Total Players',
              value: FAKE_STATS.players.toLocaleString(),
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              ),
              color: '#9333ea',
              bg: 'rgba(147,51,234,0.08)',
              border: 'rgba(147,51,234,0.15)',
            },
            {
              label: 'Universes',
              value: universes.length,
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" opacity="0.5"/>
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" opacity="0.5"/>
                </svg>
              ),
              color: '#a855f7',
              bg: 'rgba(168,85,247,0.08)',
              border: 'rgba(168,85,247,0.15)',
            },
            {
              label: 'Active Sessions',
              value: FAKE_STATS.activeSessions,
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              ),
              color: '#34d399',
              bg: 'rgba(52,211,153,0.08)',
              border: 'rgba(52,211,153,0.15)',
            },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-4 px-6 py-5 rounded-xl"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${s.color}18`, color: s.color }}
              >
                {s.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-black text-[1.6rem] leading-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: s.color }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[0.7rem] tracking-[0.12em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Universes section */}
        <div className="flex flex-col gap-5">

          <div className="flex items-center justify-between">
            <h2
              className="font-bold text-[1rem] tracking-[-0.01em]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.7)' }}
            >
              Universes
            </h2>

            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[0.78rem] font-bold tracking-[0.08em] uppercase text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #6d28d9, #9333ea)',
                boxShadow: '0 0 20px rgba(88,28,135,0.35)',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(147,51,234,0.55)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(88,28,135,0.35)'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
              </svg>
              Add Universe
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {universes.map(u => (
              <UniverseCard key={u.id} universe={u} onClick={() => setEditTarget(u)} />
            ))}
          </div>

        </div>
      </div>

      {/* Modals */}
      {showAdd && (
        <AddUniverseModal onClose={() => setShowAdd(false)} onSave={handleAdd} />
      )}
      {editTarget && (
        <EditUniverseModal
          universe={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleEdit}
          onDelete={() => handleDelete(editTarget.id)}
        />
      )}
    </main>
  );
}