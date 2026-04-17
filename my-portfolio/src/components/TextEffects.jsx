/**
 * TextEffects.jsx
 *
 * Three reusable per-letter (or per-word) text animation components:
 *
 *   ScatterText    — hover to scatter letters outward, release to spring back
 *   WaveText       — letters bob up and down continuously like a water ripple
 *   ExplodeText    — click to burst letters outward, spring back automatically
 *
 * SHARED PATTERN — all three work the same way:
 *   1. Split the text string into individual characters
 *   2. Render each as its own <span> with `display: inline-block`
 *      (inline-block is required for CSS `transform` to work on inline elements)
 *   3. Control animation via inline `style` (JS-driven) or CSS class (keyframe)
 *   4. `aria-label` on the container + `aria-hidden` on each letter span
 *      → screen readers hear the full word, not individual letters
 *
 * GPU PERFORMANCE NOTE:
 *   `transform` is the only CSS property that the browser can animate entirely
 *   on the GPU compositor thread — no layout, no paint. `will-change: transform`
 *   promotes the element to its own GPU layer BEFORE animation begins, eliminating
 *   the one-time "promotion" cost mid-animation. For ExplodeText, we apply
 *   will-change dynamically (only during the animation) to avoid permanently
 *   holding GPU memory for every letter span when at rest.
 */

import { useState, useRef } from 'react';

// ── Shared helper ──────────────────────────────────────────────────────────────

/**
 * splitToLetters(text)
 * Returns [{ char, key }, ...] for each character in the string.
 * Spaces become non-breaking spaces (\u00A0) so inline-block spans
 * preserve their width — regular spaces inside inline-block collapse to nothing.
 */
function splitToLetters(text) {
  return text.split('').map((char, i) => ({
    char: char === ' ' ? '\u00A0' : char,
    key: `${char}-${i}`,
  }));
}


// ═══════════════════════════════════════════════════════════════════════════════
// ScatterText
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * Letters scatter on hover and spring back with elastic overshoot on release.
 *
 * HOW IT WORKS:
 *   mouseenter → generate random {x, y, r} offsets → set isScattered=true
 *               → each letter animates to its offset via CSS transition
 *   mouseleave → set isScattered=false → transitions animate back to origin
 *
 * DUAL TRANSITION TRICK:
 *   • Scatter  : fast (0.25s), staggered left→right (delay = i × 18ms)
 *   • Reassemble: spring easing (cubic-bezier with y > 1 = overshoot),
 *                 staggered RIGHT→LEFT so the last letter lands first,
 *                 giving a "gathering" feel
 *
 * @param {string} text
 * @param {string} [className]
 */
export function ScatterText({ text, className = '' }) {
  const [isScattered, setIsScattered] = useState(false);
  const [offsets, setOffsets] = useState(
    () => text.split('').map(() => ({ x: 0, y: 0, r: 0 }))
  );

  const scatter = () => {
    setOffsets(text.split('').map(() => ({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 160,
      r: (Math.random() - 0.5) * 90,
    })));
    setIsScattered(true);
  };

  // Keep offsets; CSS transition will animate FROM scattered position back to origin
  const reassemble = () => setIsScattered(false);

  const chars = splitToLetters(text);

  return (
    <span
      className={`scatter-text ${className}`}
      onMouseEnter={scatter}
      onMouseLeave={reassemble}
      aria-label={text}
    >
      {chars.map(({ char, key }, i) => {
        const off = offsets[i] || { x: 0, y: 0, r: 0 };
        const n   = chars.length;
        return (
          <span
            key={key}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              willChange: 'transform',
              transition: isScattered
                ? `transform 0.25s ease ${i * 18}ms`
                // spring: cubic-bezier y>1 → overshoots then settles = elastic snap
                : `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${(n - i) * 22}ms`,
              transform: isScattered
                ? `translate(${off.x}px, ${off.y}px) rotate(${off.r}deg)`
                : 'translate(0,0) rotate(0deg)',
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// WaveText
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * Each letter bobs up and down continuously with a staggered delay that creates
 * a left-to-right ripple — like characters floating on the surface of water.
 *
 * HOW IT WORKS:
 *   Each letter gets CSS class `wave-letter` (keyframe animation in index.css).
 *   The `animation-delay` is proportional to position: `(i / n) * spread` seconds.
 *   Using a PROPORTIONAL delay (not fixed per-character) keeps the wave consistent
 *   regardless of text length — the wave always takes `spread` seconds to cross
 *   the full text, whether it has 10 letters or 70.
 *
 * @param {string} text
 * @param {string} [className]
 * @param {number} [spread=2.4]  Total seconds for the wave to travel full text width.
 *                                Shorter = faster/tighter wave, longer = slower/looser.
 */
export function WaveText({ text, className = '', spread = 2.4 }) {
  const chars = splitToLetters(text);
  const n = chars.length;

  return (
    <span className={`wave-text ${className}`} aria-label={text}>
      {chars.map(({ char, key }, i) => (
        <span
          key={key}
          aria-hidden="true"
          className="wave-letter"
          // Proportional stagger: first letter at 0s, last letter at `spread` seconds
          style={{ animationDelay: `${(i / n) * spread}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// ExplodeText
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * Click to burst letters outward; they spring back automatically.
 *
 * STATE MACHINE: idle → exploding → reforming → idle
 *
 *   idle      Letters at natural position. Click enabled.
 *   exploding Letters animate to random scatter positions (0.45s fast ease-out).
 *             Click disabled.
 *   reforming Letters spring from scattered positions back to origin (0.85s spring).
 *             Uses one of two stagger strategies (see `reformStagger`).
 *   idle      Done. onAnimationEnd fires.
 *
 * reformStagger STRATEGIES:
 *   'middle-out' (default) — centre letters return first, edges last.
 *                            Great for short labels (button text).
 *                            Formula: delay = |i - n/2| × 45ms
 *   'random'               — each letter springs back at a random time (0–600ms).
 *                            Great for long bio text — avoids a 3-second wave sweep.
 *                            Delays are generated once per click via a ref (not on render)
 *                            to prevent React re-renders from scrambling the timings.
 *
 * WILL-CHANGE STRATEGY:
 *   We only set will-change: transform during animation. Setting it permanently
 *   on hundreds of spans (long bio text) would create hundreds of GPU layers
 *   and waste VRAM. Auto-releasing them in the `idle` state keeps memory lean.
 *
 * @param {string}   text
 * @param {Function} [onAnimationEnd]    Called after the full cycle completes.
 * @param {string}   [className]
 * @param {'middle-out'|'random'} [reformStagger='middle-out']
 */
export function ExplodeText({
  text,
  onAnimationEnd,
  className = '',
  reformStagger = 'middle-out',
}) {
  const [phase, setPhase]     = useState('idle');
  const [offsets, setOffsets] = useState(
    () => text.split('').map(() => ({ x: 0, y: 0, r: 0 }))
  );

  // Memoised random reform delays — generated once per click (not per render)
  // Using a ref avoids triggering a re-render when we write to it
  const reformDelaysRef = useRef([]);

  const handleClick = (e) => {
    e.stopPropagation(); // prevent event bubbling to parent elements
    if (phase !== 'idle') return;

    // Pre-compute reform delays BEFORE setting state to avoid race conditions
    if (reformStagger === 'random') {
      reformDelaysRef.current = text.split('').map(
        () => Math.floor(Math.random() * 600) // each letter: random 0–600ms
      );
    }

    setOffsets(text.split('').map(() => ({
      x: (Math.random() - 0.5) * 480,
      y: (Math.random() - 0.5) * 380,
      r: (Math.random() - 0.5) * 360,
    })));
    setPhase('exploding');

    // After explosion (550ms), start reforming
    setTimeout(() => {
      setPhase('reforming');

      // Duration until the last letter finishes returning
      // random: max delay (600ms) + spring duration (850ms) = 1450ms
      // middle-out: max delay + spring duration, based on text length
      const maxDelay = reformStagger === 'random'
        ? 600
        : (Math.floor(text.length / 2)) * 45;
      const reformDone = maxDelay + 900; // add 900ms for the spring itself

      setTimeout(() => {
        setPhase('idle');
        setOffsets(text.split('').map(() => ({ x: 0, y: 0, r: 0 })));
        onAnimationEnd?.();
      }, reformDone);
    }, 550);
  };

  const chars = splitToLetters(text);
  const n = chars.length;

  return (
    <span
      className={`explode-text ${className}`}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e); }}
      role="button"
      tabIndex={0}
      aria-label={`${text} — click for a surprise`}
      style={{ cursor: phase === 'idle' ? 'pointer' : 'default' }}
    >
      {chars.map(({ char, key }, i) => {
        const off = offsets[i] || { x: 0, y: 0, r: 0 };

        // Stagger delay for the reform animation
        const reformDelay = reformStagger === 'random'
          ? (reformDelaysRef.current[i] ?? 0)
          : Math.abs(i - n / 2) * 45; // middle-out: centre first

        const transform = phase === 'exploding'
          ? `translate(${off.x}px, ${off.y}px) rotate(${off.r}deg)`
          : 'translate(0,0) rotate(0deg)';

        const transition = phase === 'exploding'
          ? `transform 0.45s cubic-bezier(0.2, 0, 0.8, 0.2) ${i * 12}ms`
          : phase === 'reforming'
          ? `transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) ${reformDelay}ms`
          : 'none';

        return (
          <span
            key={key}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              // Only promote to GPU layer during animation to conserve VRAM
              willChange: phase !== 'idle' ? 'transform' : 'auto',
              transition,
              transform,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
