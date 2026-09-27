import { renderMessageContent } from '../components/MessageFormatting';

export default function ChatMessages({ chatMessages, sending, messagesEndRef }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
      {chatMessages.length === 0 && (
        <p className="text-[0.78rem] text-center mt-10" style={{ color: 'rgba(255,255,255,0.3)' }}>
          No messages yet. Say something to begin.
        </p>
      )}

      {chatMessages.map((m, i) => {
        const isStreamingPlaceholder =
          sending && i === chatMessages.length - 1 && m.senderRole === 'AI';
        const isAwaitingFirstChunk = isStreamingPlaceholder && !m.content;

        if (m.senderRole === 'AI') {
          return (
            <div key={m.id} className="max-w-[640px]">
              {isAwaitingFirstChunk ? (
                <div className="flex items-center gap-2.5 py-1">
                  <span className="flex items-end gap-1">
                    <span className="typing-dot" style={{ animationDelay: '0ms' }} />
                    <span className="typing-dot" style={{ animationDelay: '150ms' }} />
                    <span className="typing-dot" style={{ animationDelay: '300ms' }} />
                  </span>
                  <span
                    className="text-[0.62rem] tracking-[0.15em] uppercase"
                    style={{ color: 'rgba(216,180,254,0.45)' }}
                  >
                    The universe is responding...
                  </span>
                </div>
              ) : (
                <p
                  className="font-mono text-[0.85rem] sm:text-[0.92rem] leading-[1.8]"
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                  }}
                >
                  {renderMessageContent(m.content)}
                  {isStreamingPlaceholder && (
                    <span
                      className="boot-cursor inline-block w-1.5 h-3.5 align-middle ml-1"
                      style={{ background: 'rgba(216,180,254,0.6)' }}
                    />
                  )}
                </p>
              )}
            </div>
          );
        }

        return (
          <div key={m.id} className="flex justify-end">
            <div
              className="max-w-[85%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-[0.82rem] sm:text-[0.85rem] leading-relaxed"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
              }}
            >
              {m.content}
            </div>
          </div>
        );
      })}

      {/* Scroll anchor — always kept at the bottom of the list */}
      <div ref={messagesEndRef} />
    </div>
  );
}