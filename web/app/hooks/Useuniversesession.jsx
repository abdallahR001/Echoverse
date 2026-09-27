import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:4000/api/universes/universe';

/* ────────────────────────────────────────────────────────────
   FETCH UNIVERSE + MESSAGES FROM BACKEND
   ──────────────────────────────────────────────────────────── */

export function useUniverseSession(universeId) {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [sessionError, setSessionError] = useState(false);

  // Local, mutable copy of the chat — seeded from the fetched session,
  // then appended to as the user sends messages / the AI streams back.
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchSession() {
      try {
        setLoadingSession(true);
        setSessionError(false);
        const res = await fetch(`${API_BASE}?universeId=${universeId}`, { credentials: 'include' });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const data = await res.json();
        if (!cancelled) setSession(data);
      } catch (err) {
        console.error('Failed to fetch universe session:', err);
        if (!cancelled) setSessionError(true);
      } finally {
        if (!cancelled) setLoadingSession(false);
      }
    }

    fetchSession();
    return () => {
      cancelled = true;
    };
  }, [universeId]);

  // Once the session arrives, seed the local chat state with its messages
  useEffect(() => {
    if (session?.messages) {
      setChatMessages(session.messages);
    }
  }, [session]);

  return { session, loadingSession, sessionError, chatMessages, setChatMessages };
}