/* ────────────────────────────────────────────────────────────
   نصوص الـ boot sequence — عادي / أخطاء وميض بيتختاروا عشوائي
   ──────────────────────────────────────────────────────────── */

export const NORMAL_LINES = [
  'Initializing reality fabric...',
  'Calibrating dimensional anchors...',
  'Synchronizing narrative threads...',
  'Loading universe parameters...',
  'Establishing consciousness link...',
  'Rendering causal framework...',
  'Compiling memory archive...',
  'Awakening resident entities...',
  'Aligning timeline branches...',
];

export const GLITCH_LINES = [
  'WARNING: Spacetime fabric disturbance detected.',
  'ERROR: Memory thread desynchronization.',
  'ANOMALY: Unauthorized presence detected.',
  'CRITICAL: Reality bleed exceeding safe threshold.',
  'ERROR: Signal lost... reacquiring...',
  'WARNING: Timeline integrity fluctuating.',
];

export function buildBootScript(universeName) {
  const pool = [...NORMAL_LINES];
  const lines = [];
  const total = 7;

  for (let i = 0; i < total; i++) {
    const isGlitch = Math.random() < 0.28;

    if (isGlitch) {
      lines.push({
        text: GLITCH_LINES[Math.floor(Math.random() * GLITCH_LINES.length)],
        glitch: true,
      });
    } else {
      const idx = Math.floor(Math.random() * pool.length);

      lines.push({
        text: pool[idx],
        glitch: false,
      });

      pool.splice(idx, 1);

      if (pool.length === 0) {
        pool.push(...NORMAL_LINES);
      }
    }
  }

  lines.push({
    text: `Entry granted. Welcome back to ${universeName}.`,
    glitch: false,
    final: true,
  });

  return lines;
}