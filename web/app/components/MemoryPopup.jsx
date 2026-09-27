export default function MemoryPopup({ activeMemory, onClose }) {
  if (!activeMemory) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-6"
      style={{
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(3px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[440px] rounded-2xl p-6 flex flex-col gap-3"
        style={{
          background: '#0f0620',
          border: '1px solid rgba(147,51,234,0.3)',
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-[0.65rem] font-bold tracking-[0.15em] uppercase"
            style={{
              color: 'rgba(147,51,234,0.7)',
            }}
          >
            {activeMemory.time}
          </span>

          <button
            onClick={onClose}
            className="text-[0.75rem]"
            style={{
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            ✕
          </button>
        </div>

        <h4 className="font-['Cinzel',serif] text-[1.05rem] font-bold">
          {activeMemory.title}
        </h4>

        <p
          className="text-[0.85rem] leading-relaxed italic"
          style={{
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          "{activeMemory.content}"
        </p>
      </div>
    </div>
  );
}