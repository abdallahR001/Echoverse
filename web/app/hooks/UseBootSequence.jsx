import { useState, useEffect } from 'react';
import { buildBootScript } from '../components/BootScript';

/* ────────────────────────────────────────────────────────────
   BOOT SEQUENCE — يستنى الداتا توصل الأول عشان اسم الكون
   يظهر صح في السطر الأخير، وبعدين يعمل fade → chat
   ──────────────────────────────────────────────────────────── */

export function useBootSequence(loadingSession, universeName) {
  const [phase, setPhase] = useState('boot');
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    if (loadingSession) return;

    let cancelled = false;
    let timer = null;

    const script = buildBootScript(universeName);

    setVisibleLines([]);
    setPhase('boot');

    let index = 0;

    const pushNext = () => {
      if (cancelled) return;

      if (index >= script.length) {
        timer = setTimeout(() => {
          if (!cancelled) {
            setPhase('fading');
          }
        }, 700);

        return;
      }

      const line = script[index];

      index += 1;

      if (line) {
        setVisibleLines((prev) => [...prev, line]);
      }

      const delay = 350 + Math.random() * 450;

      timer = setTimeout(pushNext, delay);
    };

    timer = setTimeout(pushNext, 400);

    return () => {
      cancelled = true;

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [loadingSession, universeName]);

  /* BOOT → CHAT TRANSITION */
  useEffect(() => {
    if (phase !== 'fading') {
      return;
    }

    const timer = setTimeout(() => {
      setPhase('chat');
    }, 1100);

    return () => {
      clearTimeout(timer);
    };
  }, [phase]);

  return { phase, visibleLines };
}