import { useEffect, useState } from 'react';

const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+-';

export default function LetterGlitch({ text, className = '' }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const index = Math.floor(Math.random() * text.length);
      if (text[index] === ' ') return;
      const replacement = glyphs[Math.floor(Math.random() * glyphs.length)];
      setDisplay(text.slice(0, index) + replacement + text.slice(index + 1));
      window.setTimeout(() => setDisplay(text), 115);
    }, 5800);
    return () => window.clearInterval(interval);
  }, [text]);

  return <span className={'letter-glitch ' + className} aria-hidden="true">{display}</span>;
}
