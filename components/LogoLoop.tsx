import React, { useRef, useEffect, useState, useCallback } from 'react';

export interface LogoItem {
  name: string;
  imgSrc?: string;
  node?: React.ReactNode;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

const LogoLoop: React.FC<LogoLoopProps> = ({
  logos,
  speed = 120,
  direction = 'left',
  logoHeight = 28,
  gap = 32,
  hoverSpeed = 0,
  fadeOut = false,
  fadeOutColor = '#0a0a0a',
  scaleOnHover = false,
  className = '',
  style,
  ariaLabel = 'Tech logos',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const positionRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const currentSpeed = isHovering ? hoverSpeed : speed;
  const currentSpeedRef = useRef(currentSpeed);
  currentSpeedRef.current = currentSpeed;

  const animate = useCallback((time: number) => {
    if (!innerRef.current) return;
    if (lastTimeRef.current === 0) lastTimeRef.current = time;

    const delta = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;

    const dirMultiplier = direction === 'left' ? -1 : 1;
    positionRef.current += currentSpeedRef.current * delta * dirMultiplier;

    const totalWidth = innerRef.current.scrollWidth / 2;
    if (Math.abs(positionRef.current) >= totalWidth) {
      positionRef.current = positionRef.current % totalWidth;
    }

    innerRef.current.style.transform = `translateX(${positionRef.current}px)`;
    rafRef.current = requestAnimationFrame(animate);
  }, [direction]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  // Duplicate logos enough to fill the screen seamlessly
  const renderLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full ${className}`}
      style={style}
      role="marquee"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {fadeOut && (
        <>
          <div
            className="absolute left-0 top-0 bottom-0 z-10 w-16 pointer-events-none"
            style={{ background: `linear-gradient(to right, ${fadeOutColor}, transparent)` }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 z-10 w-16 pointer-events-none"
            style={{ background: `linear-gradient(to left, ${fadeOutColor}, transparent)` }}
          />
        </>
      )}
      <div
        ref={innerRef}
        className="flex items-center whitespace-nowrap"
        style={{ gap: `${gap}px`, willChange: 'transform' }}
      >
        {renderLogos.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className={`flex-shrink-0 flex items-center transition-transform duration-300 ${
              scaleOnHover ? 'hover:scale-110' : ''
            }`}
            style={{ height: `${logoHeight}px` }}
          >
            {logo.node ? (
              logo.node
            ) : logo.imgSrc ? (
              <img
                src={logo.imgSrc}
                alt={logo.name}
                style={{ height: `${logoHeight}px`, width: 'auto' }}
                className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            ) : (
              <span className="text-neutral-500 text-xs font-mono tracking-widest uppercase hover:text-green-accent transition-colors duration-300">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
