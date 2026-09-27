/* ────────────────────────────────────────────────────────────
   QUOTE HIGHLIGHTING — يلوّن أي كلام جوه علامات تنصيص ببنفسجي
   يغطي " " العادية، والـ curly quotes “ ”، والـ guillemets « »
   ──────────────────────────────────────────────────────────── */

const QUOTE_SPLIT_REGEX = /("[^"]*"|“[^”]*”|«[^»]*»)/g;
const QUOTE_TEST_REGEX = /^("[^"]*"|“[^”]*”|«[^»]*»)$/;

export function renderMessageContent(text) {
  if (!text) return text;

  return text.split(QUOTE_SPLIT_REGEX).map((part, i) => {
    if (!part) return null;

    if (QUOTE_TEST_REGEX.test(part)) {
      return (
        <span key={i} style={{ color: '#c084fc', fontWeight: 600 }}>
          {part}
        </span>
      );
    }

    return <span key={i}>{part}</span>;
  });
}