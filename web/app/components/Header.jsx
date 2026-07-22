'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#explore', label: 'Explore' },
    { href: '#worlds', label: 'Worlds' },
    { href: '#characters', label: 'Characters' },
    { href: '#multiverse', label: 'Multiverse' },
    { href: '#how', label: 'How It Works' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[68px] px-6 bg-black/70 backdrop-blur-xl border-b border-purple-900/20">
      <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.svg"
            alt="Echoverse"
            width={120}
            height={80}
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="relative px-4 py-2 text-[0.78rem] font-semibold tracking-[0.08em] uppercase text-white/50 transition-colors duration-200 hover:text-white group"
            >
              {label}

              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-purple-500 transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <Link
            href="/SignIn"
            className="px-4 py-2 text-[0.78rem] font-semibold tracking-[0.06em] uppercase text-white/50 border border-white/10 rounded-lg transition-all duration-200 hover:text-white hover:border-purple-600/50 hover:bg-purple-950/30"
          >
            Sign In
          </Link>

          <Link
            href="/SignUp"
            className="px-4 py-2 text-[0.78rem] font-bold tracking-[0.08em] uppercase text-white rounded-lg transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] flex-shrink-0"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 bg-white/70 transition-all duration-300 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[6px]' : ''
            }`}
          />

          <span
            className={`block h-px w-6 bg-white/70 transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />

          <span
            className={`block h-px w-6 bg-white/70 transition-all duration-300 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-[68px] left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-purple-900/20 transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-[0.82rem] font-semibold tracking-[0.1em] uppercase text-white/50 border-b border-white/5 hover:text-white transition-colors duration-200"
            >
              {label}
            </a>
          ))}

          <div className="flex gap-3 pt-4 pb-2">
            <Link
              href="/auth/SignIn"
              className="flex-1 text-center py-3 text-[0.82rem] font-semibold tracking-[0.06em] uppercase text-white/60 border border-white/10 rounded-lg hover:border-purple-600/50 hover:text-white transition-all duration-200"
            >
              Sign In
            </Link>

            <Link
              href="/auth/SignUp"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-3 text-[0.82rem] font-bold tracking-[0.08em] uppercase text-white rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
              }}
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}