import { ShieldIcon, AlertTriangleIcon, CloseIcon, TargetIcon } from '../components/Icons';

/* ────────────────────────────────────────────────────────────
   Fallback stats — لحد ما الباك اند يرجع danger/stability،
   بنستخدم قيم افتراضية بدل الكراش
   ──────────────────────────────────────────────────────────── */

const fallbackStats = {
  danger: 50,
  stability: 50,
};

/* ────────────────────────────────────────────────────────────
   Current Objective — HARD-CODED لحد ما الباك اند يرجعه
   ──────────────────────────────────────────────────────────── */

const currentObjective = {
  title: 'Find the Source of the Signal',
  status: 'ACTIVE',
};

export default function UniverseSidebar({ sidebarOpen, onClose, universeDescription }) {
  return (
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
          onClick={onClose}
          aria-label="Close panel"
          className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-150 hover:bg-white/5"
          style={{ border: '1px solid rgba(147,51,234,0.25)', color: 'rgba(216,180,254,0.8)' }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Universe description */}
      <div className="flex flex-col gap-2">
        <h3 className="font-['Cinzel',serif] text-[0.8rem] font-bold text-white/70">
          About this Universe
        </h3>
        <p className="text-[0.75rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {universeDescription || 'No description available.'}
        </p>
      </div>

      {/* Reality Stability — placeholder until backend provides it */}
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
            {fallbackStats.stability}%
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
              width: `${fallbackStats.stability}%`,
              background: 'linear-gradient(90deg, #7c3aed, #c084fc)',
            }}
          />
        </div>
      </div>

      {/* Danger Level — placeholder until backend provides it */}
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
            {fallbackStats.danger}%
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
              width: `${fallbackStats.danger}%`,
              background: 'linear-gradient(90deg, #b91c1c, #f87171)',
            }}
          />
        </div>
      </div>

      {/* Current Objective — hard-coded for now */}
      <div className="flex flex-col gap-3">
        <span
          className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.15em] uppercase"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <TargetIcon color="rgba(216,180,254,0.8)" />
          Current Objective
        </span>

        <div
          className="flex items-center justify-between gap-2 rounded-xl p-3"
          style={{
            background: 'rgba(147,51,234,0.08)',
            border: '1px solid rgba(147,51,234,0.2)',
          }}
        >
          <h4 className="font-['Cinzel',serif] text-[0.85rem] font-bold text-white/85">
            {currentObjective.title}
          </h4>

          <span
            className="shrink-0 text-[0.6rem] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
            style={{
              color: '#c084fc',
              background: 'rgba(147,51,234,0.15)',
              border: '1px solid rgba(147,51,234,0.35)',
            }}
          >
            {currentObjective.status}
          </span>
        </div>
      </div>
    </aside>
  );
}