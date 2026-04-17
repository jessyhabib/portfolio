/**
 * FunFacts.jsx
 *
 * Light section with personal interests and one-liners.
 */
import { useInView } from '../hooks/useInView';

const facts = [
  {
    icon: '🎵',
    title: 'Music lover',
    line: 'My playlists are half motivation, half nostalgia.',
  },
  {
    icon: '📸',
    title: 'Photography enthusiast',
    line: 'I enjoy turning ordinary moments into visual stories.',
  },
  {
    icon: '🤖',
    title: 'AI explorer',
    line: 'Currently diving deep into AI.',
  },
];

function FunFacts() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section id="fun-facts" className="content-section">
      <div ref={ref} className={`container section-reveal ${inView ? 'visible' : ''}`}>
        <div className="section-heading">
          <p className="section-label">Fun Facts</p>
          <h2>Beyond Code</h2>
        </div>

        <div className="facts-grid">
          {facts.map((fact) => (
            <article key={fact.title} className="fact-card">
              <span className="fact-icon" aria-hidden="true">
                {fact.icon}
              </span>
              <h3>{fact.title}</h3>
              <p>{fact.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FunFacts;
