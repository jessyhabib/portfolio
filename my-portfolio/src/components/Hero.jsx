/**
 * Hero.jsx
 *
 * Playful landing section with rich interactions:
 * - Two-column responsive layout (text left, decorative visual right)
 * - Canvas particle network background (ParticleBackground)
 * - Continuous opening-line wave ripple (per-letter)
 * - Bio click explode & reform (per-word)
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import ParticleBackground from './ParticleBackground';

const NAME = 'Jessy Habib';
const OPENING_LINE = "Live life to its fullest, don't worry about tomorrow — live it day by day";
const BIO =
  'A passionate and dedicated individual, eager to continually learn and improve. Thrives in challenging environments that push for growth both technically and personally.';

function Hero() {
  const [isBioExploded, setIsBioExploded] = useState(false);
  const bioTimerRef = useRef(null);

  // Split opening line into letters for infinite ripple animation.
  const openingLetters = useMemo(
    () => OPENING_LINE.split('').map((char, index) => ({ char, id: `${char}-${index}` })),
    []
  );

  // Split bio into words for click explode/reform animation.
  const bioWords = useMemo(() => BIO.split(' '), []);

  // Random word offsets for bio explosion.
  const bioWordOffsets = useMemo(
    () => bioWords.map(() => ({
      x: (Math.random() - 0.5) * 180,
      y: (Math.random() - 0.5) * 140,
      r: (Math.random() - 0.5) * 70,
    })),
    [bioWords]
  );


  const handleBioClick = () => {
    if (bioTimerRef.current) {
      clearTimeout(bioTimerRef.current);
    }

    setIsBioExploded(true);
    bioTimerRef.current = setTimeout(() => {
      setIsBioExploded(false);
      bioTimerRef.current = null;
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (bioTimerRef.current) {
        clearTimeout(bioTimerRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="hero section-reveal visible">
      {/* Canvas particle network with connecting lines */}
      <ParticleBackground />

      <div className="container hero-layout">
        <div className="hero-content">
          <p className="hero-kicker">Computer Engineer &amp; AI Enthusiast</p>

          <h1 className="hero-name">{NAME}</h1>

          <p className="hero-opening" aria-label={OPENING_LINE}>
            {openingLetters.map((item, index) => (
              <span
                key={item.id}
                className="hero-wave-letter"
                style={{ animationDelay: `${index * 45}ms` }}
                aria-hidden="true"
              >
                {item.char === ' ' ? '\u00A0' : item.char}
              </span>
            ))}
          </p>

          <p className="hero-bio" onClick={handleBioClick} role="button" tabIndex={0} onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              handleBioClick();
            }
          }}>
            {bioWords.map((word, index) => {
              const offset = bioWordOffsets[index];
              return (
                <span
                  key={`${word}-${index}`}
                  className="hero-bio-word"
                  style={{
                    transform: isBioExploded
                      ? `translate(${offset.x}px, ${offset.y}px) rotate(${offset.r}deg)`
                      : 'translate(0, 0) rotate(0deg)',
                    transitionDelay: `${index * 16}ms`,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>

          <div className="hero-actions">
            {/* Scrolls to the MyWork section */}
            <a href="#my-work" className="btn btn-primary">
              View My Work
            </a>
            {/* Opens the user’s email client */}
            <a href="mailto:YOUR_EMAIL" className="btn btn-secondary">
              Say Hi 👋
            </a>
          </div>
        </div>

        {/* Right column is intentionally empty — the neural canvas shows through */}
        <div className="hero-visual" aria-hidden="true" />
      </div>
    </section>
  );
}

export default Hero;
