import type { ElementType, ReactNode } from 'react';

type TechTextProps = { children: ReactNode; className?: string; as?: ElementType };

/** Restrained technical highlight treatment for only a handful of key headings. */
export default function TechText({ children, className = '', as: Tag = 'span' }: TechTextProps) {
  return <Tag className={'tech-text ' + className}>{children}</Tag>;
}
