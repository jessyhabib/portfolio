/**
 * ParticleBackground.jsx
 *
 * Animated neural-network canvas background for the Hero section.
 *
 * WHAT IT DRAWS:
 *   - Small lavender filled circles (nodes) that slowly drift around the canvas.
 *   - Thin lines connecting any two nodes that are within LINE_DIST pixels of
 *     each other. Line opacity decreases linearly with distance so nearby nodes
 *     appear most strongly connected \u2014 the classic "brain wiring" look.
 *
 * MOVEMENT MODEL:
 *   Nodes bounce off all four edges (elastic reflection) so they stay inside the
 *   hero area. This is more natural than wrap-around for a contained visual.
 *
 * ANIMATION LOOP:
 *   requestAnimationFrame(draw) runs once per screen repaint (~60\u00d7/s).
 *   Each call: clear \u2192 move nodes \u2192 draw lines \u2192 draw dots \u2192 schedule next frame.
 *
 * CLEANUP:
 *   The useEffect cleanup cancels the rAF loop and removes the resize listener
 *   when the component unmounts, preventing memory leaks.
 */
import { useEffect, useRef } from 'react';

// ── Configuration ─────────────────────────────────────────────────────────────
const NODE_COUNT    = 48;       // number of drifting nodes
const LINE_DIST     = 160;      // px \u2014 max distance to draw a connecting line
const SPEED         = 0.35;     // px/frame \u2014 how fast nodes drift

function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;
    let nodes = [];

    // ── Resize ──────────────────────────────────────────────────────────────
    // Match canvas pixel dimensions to its CSS layout size so drawing is crisp.
    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    };

    // ── Node factory ───────────────────────────────────────────────────────
    // Each node drifts slowly and bounces off the canvas edges.
    const makeNode = () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r:  Math.random() * 2.2 + 1.8, // radius 1.8 \u2013 4 px \u2014 visible but subtle
    });

    // ── Initialise ──────────────────────────────────────────────────────────
    resize();
    nodes = Array.from({ length: NODE_COUNT }, makeNode);

    // ── Draw loop ───────────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Move every node and bounce it off the canvas edges
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x <= 0 || n.x >= W) { n.vx *= -1; n.x = Math.max(0, Math.min(W, n.x)); }
        if (n.y <= 0 || n.y >= H) { n.vy *= -1; n.y = Math.max(0, Math.min(H, n.y)); }
      }

      // Draw lines between nearby node pairs
      // We only compare i < j to draw each pair once and avoid self-connection.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DIST) {
            // Closer nodes get a more opaque line
            const alpha = (1 - dist / LINE_DIST) * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(196, 184, 224, ${alpha})`; // lavender lines
            ctx.lineWidth   = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw dots on top of lines so nodes pop visually
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(180, 148, 210, 0.75)'; // lavender dots
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    // Resize handler: update canvas size and clamp any nodes now outside bounds
    const handleResize = () => {
      resize();
      for (const n of nodes) {
        n.x = Math.min(n.x, W);
        n.y = Math.min(n.y, H);
      }
    };
    window.addEventListener('resize', handleResize);

    // ── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // aria-hidden: purely decorative \u2014 screen readers skip the canvas entirely
  return <canvas ref={canvasRef} className="neural-canvas" aria-hidden="true" />;
}

export default ParticleBackground;
