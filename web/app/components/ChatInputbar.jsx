import { SendIcon } from '../components/Icons';

export default function ChatInputBar({
  inputValue,
  setInputValue,
  onSend,
  onKeyDown,
  sending,
  sendError,
}) {
  return (
    <div
      className="px-4 sm:px-6 py-4"
      style={{
        borderTop: '1px solid rgba(147,51,234,0.15)',
      }}
    >
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-shadow duration-200"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(147,51,234,0.2)',
          opacity: sending ? 0.7 : 1,
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={sending}
          placeholder={sending ? 'The universe is answering...' : 'What do you do?'}
          className="flex-1 min-w-0 bg-transparent outline-none text-[0.82rem] sm:text-[0.85rem] placeholder:text-white/30 disabled:cursor-not-allowed"
        />

        <button
          onClick={onSend}
          disabled={sending || !inputValue.trim()}
          aria-label="Send message"
          className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed disabled:scale-100 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
            boxShadow:
              sending || !inputValue.trim()
                ? 'none'
                : '0 0 18px rgba(147,51,234,0.45)',
          }}
        >
          {sending ? (
            <span
              className="w-3.5 h-3.5 rounded-full animate-spin"
              style={{
                border: '2px solid rgba(255,255,255,0.25)',
                borderTopColor: '#fff',
              }}
            />
          ) : (
            <SendIcon />
          )}
        </button>
      </div>

      {sendError && (
        <p className="text-[0.65rem] mt-2" style={{ color: '#f87171' }}>
          Couldn't reach the universe. Try sending again.
        </p>
      )}
    </div>
  );
}