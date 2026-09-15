'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    let animationId;
    let w = 0;
    let h = 0;
    let offset = 0;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      offset = (offset + 0.3) % 60;

      // Animated grid
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.05)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = offset; x < w; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = offset; y < h; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Glowing scan line
      const scanY = ((Date.now() / 20) % (h + 200)) - 100;

      const gradient = ctx.createLinearGradient(
        0,
        scanY - 80,
        0,
        scanY + 80
      );

      gradient.addColorStop(0, 'rgba(147, 51, 234, 0)');
      gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.06)');
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 80, w, 160);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const bolts = [
    {
      left: '4%',
      top: '5%',
      width: 60,
      height: 140,
      duration: 5,
      delay: 0.3,
    },
    {
      left: '14%',
      top: '55%',
      width: 45,
      height: 110,
      duration: 4.2,
      delay: 2.1,
    },
    {
      left: '30%',
      top: '15%',
      width: 55,
      height: 130,
      duration: 6,
      delay: 1,
    },
    {
      left: '62%',
      top: '8%',
      width: 50,
      height: 120,
      duration: 4.6,
      delay: 2.6,
    },
    {
      left: '78%',
      top: '48%',
      width: 65,
      height: 150,
      duration: 5.4,
      delay: 0.8,
    },
    {
      left: '90%',
      top: '20%',
      width: 42,
      height: 100,
      duration: 3.9,
      delay: 1.7,
    },
  ];

  return (
    <section
      id="explore"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{ paddingTop: '68px' }}
    >
      {/* Animated canvas grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Animated purple lightning streaks */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {bolts.map((bolt, index) => (
          <svg
            key={index}
            width={bolt.width}
            height={bolt.height}
            viewBox="0 0 40 100"
            style={{
              position: 'absolute',
              left: bolt.left,
              top: bolt.top,
              opacity: 0,
              animation: `lightning-flicker-hero ${bolt.duration}s ease-in-out ${bolt.delay}s infinite`,
              filter: 'drop-shadow(0 0 8px rgba(147,51,234,0.7))',
            }}
          >
            <path
              d="M20 0 L8 45 L18 45 L4 100 L34 40 L22 40 L32 0 Z"
              fill="rgba(147,51,234,0.5)"
            />
          </svg>
        ))}
      </div>

      {/* Deep radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(88,28,135,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 45%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[820px] mx-auto gap-8">

        {/* Status pill */}
        <div
          className="flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[0.65rem] font-bold tracking-[0.18em] uppercase"
          style={{
            border: '1px solid rgba(147,51,234,0.3)',
            background: 'rgba(88,28,135,0.12)',
            color: '#c084fc',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-purple-400"
            style={{
              boxShadow: '0 0 6px #a855f7',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />

          AI · Multiverse · Interactive
        </div>

        {/* Main headline */}
        <div className="flex flex-col gap-2">
          <h1
            className="font-black leading-[0.95] tracking-[-0.03em] uppercase"
            style={{
              fontFamily: "'Space Grotesk', 'Syne', sans-serif",
              fontSize: 'clamp(2.4rem, 6.5vw, 5rem)',
              color: 'rgba(255,255,255,0.92)',
            }}
          >
            Every Entry.
          </h1>

          <h1
            className="font-black leading-[0.95] tracking-[-0.03em] uppercase"
            style={{
              fontFamily: "'Space Grotesk', 'Syne', sans-serif",
              fontSize: 'clamp(2.4rem, 6.5vw, 5rem)',
              background:
                'linear-gradient(90deg, #7c3aed 0%, #a855f7 40%, #c084fc 70%, #9333ea 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(147,51,234,0.4))',
            }}
          >
            A New World.
          </h1>
        </div>

        {/* Divider */}
        <div
          className="w-24 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(147,51,234,0.6), transparent)',
          }}
        />

        {/* Description */}
        <p
          className="text-[0.95rem] leading-[1.85] max-w-[560px]"
          style={{
            color: 'rgba(255,255,255,0.45)',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          You don't pick the story. The story picks you. Drop into a
          living AI-generated world — different every time, with no
          maps, no safety net, and characters who remember everything
          you do.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4 flex-wrap justify-center mt-2">

          {/* Primary CTA */}
          <Link
            href="/SignUp"
            className="
              group
              flex items-center gap-2.5
              px-7 py-3.5
              rounded-lg
              font-bold
              text-[0.8rem]
              tracking-[0.06em]
              uppercase
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_0_0_1px_rgba(147,51,234,0.6),0_8px_48px_rgba(88,28,135,0.6)]
            "
            style={{
              background:
                'linear-gradient(135deg, #6d28d9, #9333ea)',
              boxShadow:
                '0 0 0 1px rgba(147,51,234,0.4), 0 8px 32px rgba(88,28,135,0.4)',
            }}
          >
            Enter the Verse

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="#worlds"
            className="
              group
              flex items-center gap-2
              px-7 py-3.5
              rounded-lg
              font-semibold
              text-[0.8rem]
              tracking-[0.06em]
              uppercase
              transition-all
              duration-200
              hover:border-purple-500/40
              hover:text-white
            "
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            See the Worlds
          </Link>

        </div>

        {/* Stats */}
        <div
          className="flex items-center gap-0 mt-6 rounded-xl overflow-hidden"
          style={{
            border: '1px solid rgba(147,51,234,0.12)',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {[
            { num: '∞', label: 'Unique Worlds' },
            { num: '0', label: 'Fixed Stories' },
            { num: '100%', label: 'Your Choices' },
          ].map((stat, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center px-8 py-4 gap-0.5">
                <span
                  className="font-black text-[1.3rem] leading-none"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: '#a855f7',
                  }}
                >
                  {stat.num}
                </span>

                <span
                  className="text-[0.6rem] tracking-[0.14em] uppercase"
                  style={{
                    color: 'rgba(255,255,255,0.3)',
                  }}
                >
                  {stat.label}
                </span>
              </div>

              {index < 2 && (
                <div
                  className="w-px h-10"
                  style={{
                    background: 'rgba(147,51,234,0.15)',
                  }}
                />
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Lightning animation */}
      <style jsx>{`
        @keyframes lightning-flicker-hero {
          0%, 100% {
            opacity: 0;
          }

          5% {
            opacity: 0.85;
          }

          8% {
            opacity: 0.1;
          }

          10% {
            opacity: 0.65;
          }

          13% {
            opacity: 0;
          }

          45% {
            opacity: 0;
          }

          48% {
            opacity: 0.5;
          }

          52% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}