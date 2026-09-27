import type { CSSProperties } from 'react';

type TextLoopProps = {
  items: string[];
  className?: string;
};

/** A light-weight ambient ticker adapted for the portfolio's non-essential background copy. */
export default function TextLoop({ items, className = '' }: TextLoopProps) {
  const sequence = [...items, ...items];
  return (
    <div className={'text-loop ' + className} aria-label={items.join(', ')}>
      <div className="text-loop-track" style={{ '--loop-items': items.length } as CSSProperties}>
        {sequence.map((item, index) => <span key={item + index}>{item}<i aria-hidden="true">•</i></span>)}
      </div>
    </div>
  );
}
