import Link from 'next/link';
import { BackIcon, PanelIcon } from '../components/Icons';

export default function ChatHeader({ universeName, universeDescription, onOpenSidebar }) {
  return (
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
            {universeName}
          </span>

          <h1 className="font-['Cinzel',serif] text-[1.05rem] sm:text-[1.3rem] font-black truncate">
            {universeDescription.slice(0, 60)}
            {universeDescription.length > 60 ? '…' : ''}
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
          onClick={onOpenSidebar}
          aria-label="Show universe panel"
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-150 hover:bg-white/5"
          style={{ border: '1px solid rgba(147,51,234,0.25)', color: 'rgba(216,180,254,0.8)' }}
        >
          <PanelIcon />
        </button>
      </div>
    </div>
  );
}