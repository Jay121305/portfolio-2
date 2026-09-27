import type { ReactNode } from 'react';

export default function GradientText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={'gradient-text ' + className}>{children}</span>;
}
