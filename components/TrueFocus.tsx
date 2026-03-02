import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = 'green',
  glowColor = 'rgba(0, 255, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const updateFocusRect = useCallback(() => {
    const wordEl = wordRefs.current[currentIndex];
    const containerEl = containerRef.current;
    if (wordEl && containerEl) {
      const wordRect = wordEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      setFocusRect({
        x: wordRect.left - containerRect.left,
        y: wordRect.top - containerRect.top,
        width: wordRect.width,
        height: wordRect.height,
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    updateFocusRect();
    window.addEventListener('resize', updateFocusRect);
    return () => window.removeEventListener('resize', updateFocusRect);
  }, [updateFocusRect]);

  useEffect(() => {
    if (manualMode) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, words.length, animationDuration, pauseBetweenAnimations]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setCurrentIndex(index);
    }
  };

  return (
    <div ref={containerRef} className="relative inline-flex flex-wrap items-center" style={{ gap: '0.25em' }}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          ref={(el: HTMLSpanElement | null) => { wordRefs.current[index] = el; }}
          className="relative inline-block px-1 py-0.5"
          animate={{
            filter: index === currentIndex ? 'blur(0px)' : `blur(${blurAmount}px)`,
            opacity: index === currentIndex ? 1 : 0.6,
          }}
          transition={{ duration: animationDuration }}
          onMouseEnter={() => handleMouseEnter(index)}
        >
          {word}
        </motion.span>
      ))}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: focusRect.x - 4,
          y: focusRect.y - 2,
          width: focusRect.width + 8,
          height: focusRect.height + 4,
        }}
        transition={{ duration: animationDuration, ease: 'easeInOut' }}
        style={{
          border: `2px solid ${borderColor}`,
          borderRadius: '4px',
          boxShadow: `0 0 10px ${glowColor}`,
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default TrueFocus;
