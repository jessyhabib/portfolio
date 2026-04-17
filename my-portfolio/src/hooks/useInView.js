/**
 * useInView.js
 *
 * A custom React hook that wraps the browser's native IntersectionObserver API.
 * Use it to detect when a DOM element enters the viewport — great for triggering
 * "fade in on scroll" animations without a third-party library.
 *
 * HOW IT WORKS:
 *   1. You call useInView() and get back [ref, inView].
 *   2. You attach `ref` to any JSX element: <div ref={ref}>...</div>
 *   3. Once that element scrolls into view, `inView` flips from false → true.
 *   4. The observer is then disconnected (fire-once) — the element stays visible
 *      if you scroll away and back, which feels more natural.
 *
 * USAGE EXAMPLE:
 *   const [ref, inView] = useInView({ threshold: 0.2 });
 *   return <div ref={ref} className={inView ? 'visible' : 'hidden'} />;
 *
 * @param {IntersectionObserverInit} options
 *   threshold  — 0–1, what fraction of the element must be visible to trigger (default 0.15)
 *   rootMargin — CSS-style margin around the viewport root (default '0px')
 */
import { useEffect, useRef, useState } from 'react';

export function useInView(options = {}) {
  // ref is attached to the target DOM element
  const ref = useRef(null);

  // inView starts false; becomes true once the element is seen
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return; // guard: don't run if ref hasn't been attached yet

    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.isIntersecting is true when the element overlaps the viewport
        if (entry.isIntersecting) {
          setInView(true);
          // Disconnect immediately — we only need to fire once
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15, // fire when 15% of the element is visible
        ...options,       // allow callers to override defaults
      }
    );

    observer.observe(el);

    // Cleanup function: runs when the component using this hook unmounts.
    // Always clean up observers/timers in useEffect to prevent memory leaks.
    return () => observer.disconnect();
  }, []); // [] means this effect runs once on mount, never re-runs

  return [ref, inView];
}
