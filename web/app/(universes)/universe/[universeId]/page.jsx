'use client';

import Link from 'next/link';
import { use, useState, useEffect, useRef } from 'react';

import BootScreen from '../../../components/Bootscreen';
import ChatHeader from '../../../components/Chatheader';
import ChatMessages from '../../../components/ChatMessages';
import ChatInputBar from '../../../components/ChatInputbar';
import UniverseSidebar from '../../../components/UniverseSidebar';
import MemoryPopup from '../../../components/MemoryPopup';

import { useUniverseSession } from '../../../hooks/Useuniversesession';
import { useBootSequence } from '../../../hooks/UseBootSequence';
import { useSendMessage } from '../../../hooks/UseSendMessage';


export default function UniversePage({ params }) {
  /*
    Next.js 16:
    params is a Promise in Client Components,
    so we unwrap it with React's use().
  */
  const { universeId } = use(params);

  const { session, loadingSession, sessionError, chatMessages, setChatMessages } =
    useUniverseSession(universeId);

  const universeName = session?.universe?.universeCode ?? 'Unknown Universe';
  const universeDescription = session?.universe?.description ?? '';

  const { phase, visibleLines } = useBootSequence(loadingSession, universeName);

  const [activeMemory, setActiveMemory] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Anchor element at the bottom of the message list — scrolled into
  // view whenever the chat grows or the AI's streamed reply updates.
  const messagesEndRef = useRef(null);

  const { inputValue, setInputValue, sending, sendError, handleSend, handleInputKeyDown, stats } =
    useSendMessage({ universeId, setChatMessages });

  /* AUTO-SCROLL — follows the conversation on every new message
     and on every streamed chunk while the AI reply is arriving */
  useEffect(() => {
    if (phase !== 'chat') return;
    messagesEndRef.current?.scrollIntoView({
      behavior: sending ? 'auto' : 'smooth',
      block: 'end',
    });
  }, [chatMessages, sending, phase]);

  const showBoot = (phase === 'boot' || phase === 'fading') && !loadingSession && !sessionError;

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <style>{`
        @keyframes crt-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.82; }
          94% { opacity: 1; }
          96% { opacity: 0.88; }
          97% { opacity: 1; }
        }

        @keyframes scan-move {
          0% { background-position: 0 0; }
          100% { background-position: 0 60px; }
        }

        @keyframes line-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes chat-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typing-bounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.35;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }

        .boot-line {
          animation: line-in 0.35s ease-out both;
        }

        .boot-cursor {
          animation: cursor-blink 1s step-start infinite;
        }

        .chat-fade-in {
          animation: chat-in 0.6s ease-out both;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: rgba(216, 180, 254, 0.85);
          display: inline-block;
          animation: typing-bounce 1.1s ease-in-out infinite;
        }
      `}</style>

      {/* ══════════ LOADING STATE (fetching session) ══════════ */}

      {loadingSession && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <span className="font-mono text-[0.8rem]" style={{ color: 'rgba(216,180,254,0.6)' }}>
            Reconnecting to the universe...
          </span>
        </div>
      )}

      {/* ══════════ ERROR STATE ══════════ */}

      {!loadingSession && sessionError && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-4 px-6 text-center">
          <span className="font-mono text-[0.85rem]" style={{ color: '#f87171' }}>
            Connection to this universe failed.
          </span>
          <Link
            href="/Home"
            className="text-[0.75rem] font-bold uppercase tracking-wider px-4 py-2 rounded-lg"
            style={{ border: '1px solid rgba(147,51,234,0.3)', color: 'rgba(216,180,254,0.8)' }}
          >
            Back to Home
          </Link>
        </div>
      )}

      {/* ══════════ BOOT / CRT SCREEN ══════════ */}

      {showBoot && <BootScreen phase={phase} visibleLines={visibleLines} />}

      {/* ══════════ CHAT + SIDEBAR ══════════ */}

      {phase === 'chat' && !sessionError && (
        <div className="chat-fade-in flex h-screen">
          {/* BG ambient */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div
              className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px]"
              style={{
                background: 'rgba(88,28,135,0.1)',
              }}
            />
          </div>

          {/* ── CHAT COLUMN ── */}
          <div className="relative z-10 flex-1 flex flex-col min-w-0">
            <ChatHeader
              universeName={universeName}
              universeDescription={universeDescription}
              onOpenSidebar={() => setSidebarOpen(true)}
            />

            <ChatMessages
              chatMessages={chatMessages}
              sending={sending}
              messagesEndRef={messagesEndRef}
            />

            <ChatInputBar
              inputValue={inputValue}
              setInputValue={setInputValue}
              onSend={handleSend}
              onKeyDown={handleInputKeyDown}
              sending={sending}
              sendError={sendError}
            />
          </div>

          {/* Backdrop — mobile/tablet only, shown while the panel is open */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-30"
              style={{ background: 'rgba(0,0,0,0.6)' }}
            />
          )}

          {/* ── SIDEBAR ── */}
          <UniverseSidebar
            sidebarOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            universeDescription={universeDescription}
            dangerLevel={stats.dangerLevel}
            realityStability={stats.realityStability}
            objective={stats.objective}
          />
        </div>
      )}

      {/* ══════════ MEMORY POPUP ══════════ */}

      <MemoryPopup activeMemory={activeMemory} onClose={() => setActiveMemory(null)} />
    </main>
  );
}