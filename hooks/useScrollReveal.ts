
import { useEffect } from 'react';

/**
 * Global scroll-reveal hook.
 * Call once in the root component (App / PublicSite).
 * It watches every element with a `.reveal`, `.reveal-left`,
 * `.reveal-right`, or `.reveal-scale` class and adds `.revealed`
 * when it enters the viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Respect user preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const selector = '.reveal, .reveal-left, .reveal-right, .reveal-scale';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Once revealed, stop watching (one-shot animation)
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe all current reveal targets
    const targets = document.querySelectorAll(selector);
    targets.forEach((el) => observer.observe(el));

    // MutationObserver to catch dynamically added elements
    const mutationObs = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            // Check the node itself
            if (node.matches?.(selector)) observer.observe(node);
            // Check descendants
            node.querySelectorAll?.(selector).forEach((el) => observer.observe(el));
          }
        });
      });
    });

    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObs.disconnect();
    };
  }, []);
}
