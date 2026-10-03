'use client';

import { useEffect } from 'react';

export default function ModalShell({ onClose, title, children }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col"
        style={{
          background: '#0a0612',
          border: '1px solid rgba(147,51,234,0.2)',
          boxShadow: '0 0 60px rgba(88,28,135,0.3), 0 24px 64px rgba(0,0,0,0.6)',
        }}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(147,51,234,0.1)' }}
        >
          <h2
            className="font-bold text-[1rem] tracking-[-0.01em]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.88)' }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.04)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="px-6 py-6 flex-1">
          {children}
        </div>
      </div>

      {/* Global styles for shared field classes */}
      <style jsx global>{`
        .field-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          font-family: 'DM Sans', sans-serif;
        }
        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 0.88rem;
          color: white;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .field-input::placeholder {
          color: rgba(255,255,255,0.2);
        }
        .field-input:focus {
          border-color: rgba(147,51,234,0.5);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 16px rgba(147,51,234,0.1);
        }
      `}</style>
    </div>
  );
}