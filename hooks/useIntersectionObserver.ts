
import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const elements = useRef<Record<string, IntersectionObserverEntry>>({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        elements.current[entry.target.id] = entry;
      });

      // Fix: Cast Object.values results to IntersectionObserverEntry[] to prevent property access errors on 'unknown' type
      const visibleEntries = (Object.values(elements.current) as IntersectionObserverEntry[]).filter(
        (e) => e.isIntersecting
      );

      if (visibleEntries.length > 0) {
        // Find the one with highest intersection ratio
        const bestEntry = visibleEntries.reduce((prev, current) =>
          prev.intersectionRatio > current.intersectionRatio ? prev : current
        );
        setActiveId(bestEntry.target.id);
      }
    }, options);

    const sectionElements = document.querySelectorAll('section[id]');
    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [options]);

  return activeId;
};
