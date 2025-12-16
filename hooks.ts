import { useState, useEffect, useRef } from 'react';

export function useScrollSpy(ids: string[], options: { offset?: number } = {}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { offset = 0 } = options;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      let currentActiveId: string | null = null;
      
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const elementTop = element.offsetTop - offset;
          if (scrollPosition >= elementTop) {
            currentActiveId = id;
          }
        }
      }
      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return activeId;
}

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (ref.current) {
            observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isIntersecting];
}
