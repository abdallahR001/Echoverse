import { useState } from 'react';

// Streaming send-message endpoint — plain text chunks (text/plain, chunked transfer)
// NOTE: adjust this path if the real route isn't /api/messages
const SEND_MESSAGE_URL = 'http://localhost:4000/api/messages';

// The backend appends this marker once the visible reply is done, followed
// by a JSON blob: { dangerLevel, realityStability, objective }
const METADATA_MARKER = '\n\n__METADATA__';

/* ────────────────────────────────────────────────────────────
   SEND MESSAGE — POSTs to the streaming endpoint, appends the
   AI's text chunk by chunk as it arrives, and pulls out the
   trailing __METADATA__ block (danger/stability/objective)
   ──────────────────────────────────────────────────────────── */

export function useSendMessage({ universeId, setChatMessages }) {
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  // Latest values pulled from the __METADATA__ block. Starts empty —
  // the sidebar falls back to its own defaults until the first reply.
  const [stats, setStats] = useState({
    dangerLevel: null,
    realityStability: null,
    objective: null,
  });

  async function handleSend() {
    const trimmed = inputValue.trim();
    if (!trimmed || sending) return;

    const userMsg = {
      id: `local-user-${Date.now()}`,
      senderRole: 'USER',
      content: trimmed,
      created_at: new Date().toISOString(),
    };

    const aiMsgId = `local-ai-${Date.now()}`;
    const aiPlaceholder = {
      id: aiMsgId,
      senderRole: 'AI',
      content: '',
      created_at: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, userMsg, aiPlaceholder]);
    setInputValue('');
    setSending(true);
    setSendError(false);

    const appendToAiMessage = (text) => {
      if (!text) return;
      setChatMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsgId ? { ...m, content: m.content + text } : m
        )
      );
    };

    // 'content' — still streaming the visible reply.
    // 'metadata' — marker was found, everything after it is JSON.
    let mode = 'content';
    // Holds up to (METADATA_MARKER.length - 1) trailing chars we can't
    // yet confirm are plain text, in case the marker is split across
    // two chunks.
    let carry = '';
    let metadataBuffer = '';

    try {
      const res = await fetch(SEND_MESSAGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // sendMessage() reads req.user.id server-side, so the session/auth
        // cookie needs to ride along with the request
        credentials: 'include',
        body: JSON.stringify({ universeId, userMessage: trimmed }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        if (!chunkText) continue;

        if (mode === 'metadata') {
          metadataBuffer += chunkText;
          continue;
        }

        const combined = carry + chunkText;
        const markerIndex = combined.indexOf(METADATA_MARKER);

        if (markerIndex !== -1) {
          appendToAiMessage(combined.slice(0, markerIndex));
          mode = 'metadata';
          metadataBuffer = combined.slice(markerIndex + METADATA_MARKER.length);
          carry = '';
        } else {
          // Keep back only enough characters to still catch a marker
          // that got split across this chunk and the next one.
          const safeLength = Math.max(0, combined.length - (METADATA_MARKER.length - 1));
          appendToAiMessage(combined.slice(0, safeLength));
          carry = combined.slice(safeLength);
        }
      }

      // Stream finished — flush whatever's left over.
      if (mode === 'content') {
        appendToAiMessage(carry);
      } else if (metadataBuffer.trim()) {
        try {
          const parsed = JSON.parse(metadataBuffer.trim());
          setStats((prev) => ({
            dangerLevel: parsed.dangerLevel ?? prev.dangerLevel,
            realityStability: parsed.realityStability ?? prev.realityStability,
            objective: parsed.objective ?? prev.objective,
          }));
        } catch (err) {
          console.error('Failed to parse message metadata:', err);
        }
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      setSendError(true);
      setChatMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsgId
            ? {
                ...m,
                content:
                  m.content || 'The signal dropped before a reply came through.',
              }
            : m
        )
      );
    } finally {
      setSending(false);
    }
  }

  function handleInputKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return {
    inputValue,
    setInputValue,
    sending,
    sendError,
    handleSend,
    handleInputKeyDown,
    stats,
  };
}