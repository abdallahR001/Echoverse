'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const navLinks = [
    { href: '#explore', label: 'Explore' },
    { href: '#worlds', label: 'Worlds' },
    { href: '#characters', label: 'Characters' },
    { href: '#multiverse', label: 'Multiverse' },
    { href: '#how', label: 'How It Works' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-[68px] px-6 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(2,2,4,0.9)'
          : 'rgba(2,2,4,0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(147,51,234,0.15)'
          : '1px solid transparent',
      }}
    >
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
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative px-4 py-2 text-[0.75rem] font-semibold tracking-[0.1em] uppercase transition-colors duration-200 group"
              style={{
                color: 'rgba(255,255,255,0.45)',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
              }}
            >
              {label}

              <span
                className="absolute bottom-0.5 left-4 right-4 h-px scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"
                style={{
                  background: 'rgba(147,51,234,0.6)',
                }}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">

          {/* Sign In */}
          <Link
            href="/SignIn"
            className="px-4 py-2 text-[0.75rem] font-semibold tracking-[0.08em] uppercase transition-all duration-200 rounded-lg"
            style={{
              color: 'rgba(255,255,255,0.45)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderColor =
                'rgba(147,51,234,0.4)';
              e.currentTarget.style.background =
                'rgba(88,28,135,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color =
                'rgba(255,255,255,0.45)';
              e.currentTarget.style.borderColor =
                'rgba(255,255,255,0.08)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Sign In
          </Link>

          {/* Get Started */}
          <Link
            href="/SignUp"
            className="px-4 py-2 text-[0.75rem] font-bold tracking-[0.08em] uppercase text-white rounded-lg transition-all duration-200"
            style={{
              background:
                'linear-gradient(135deg, #6d28d9, #9333ea)',
              boxShadow:
                '0 0 20px rgba(88,28,135,0.35)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                '0 0 30px rgba(147,51,234,0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                '0 0 20px rgba(88,28,135,0.35)';
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] flex-shrink-0"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-px w-5 bg-white/60 transition-all duration-300 origin-center ${
              menuOpen
                ? 'rotate-45 translate-y-[6px]'
                : ''
            }`}
          />

          <span
            className={`block h-px w-5 bg-white/60 transition-all duration-300 ${
              menuOpen
                ? 'opacity-0 scale-x-0'
                : ''
            }`}
          />

          <span
            className={`block h-px w-5 bg-white/60 transition-all duration-300 origin-center ${
              menuOpen
                ? '-rotate-45 -translate-y-[6px]'
                : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden absolute top-[68px] left-0 right-0 transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          opacity: menuOpen ? 1 : 0,
          background: 'rgba(2,2,4,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: menuOpen
            ? '1px solid rgba(147,51,234,0.15)'
            : 'none',
        }}
      >
        <nav className="flex flex-col px-6 py-4 gap-0.5">

          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-[0.8rem] font-semibold tracking-[0.1em] uppercase transition-colors duration-200"
              style={{
                color: 'rgba(255,255,255,0.45)',
                borderBottom:
                  '1px solid rgba(255,255,255,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  'rgba(255,255,255,0.45)';
              }}
            >
              {label}
            </Link>
          ))}

          {/* Mobile Auth */}
          <div className="flex gap-3 pt-4 pb-2">

            <Link
              href="/SignIn"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-3 text-[0.8rem] font-semibold tracking-[0.06em] uppercase rounded-lg transition-all duration-200"
              style={{
                color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              Sign In
            </Link>

            <Link
              href="/SignUp"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-3 text-[0.8rem] font-bold tracking-[0.08em] uppercase text-white rounded-lg"
              style={{
                background:
                  'linear-gradient(135deg, #6d28d9, #9333ea)',
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