import { useState } from 'react';

// Streaming send-message endpoint — plain text chunks (text/plain, chunked transfer)
// NOTE: adjust this path if the real route isn't /api/messages
const SEND_MESSAGE_URL = 'http://localhost:4000/api/messages';

/* ────────────────────────────────────────────────────────────
   SEND MESSAGE — POSTs to the streaming endpoint and appends
   the AI's text chunk by chunk as it arrives
   ──────────────────────────────────────────────────────────── */

export function useSendMessage({ universeId, setChatMessages }) {
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

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

        if (chunkText) {
          setChatMessages((prev) =>
            prev.map((m) =>
              m.id === aiMsgId ? { ...m, content: m.content + chunkText } : m
            )
          );
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

  return { inputValue, setInputValue, sending, sendError, handleSend, handleInputKeyDown };
}