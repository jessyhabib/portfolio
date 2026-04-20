/**
 * Education.jsx
 *
 * Vertical timeline for academic progression.
 *
 * LAYOUT:
 *   Each entry is a two-column row:
 *     - Left column (46 px): timeline line + circular dot
 *     - Right column: white card with a 4 px colored left border
 *
 * CARD CONTENT:
 *   University name + status badge | degree | location pill + date pill | description
 *
 * STATUS BADGES:
 *   "Graduated ✓" (green)  — .status-badge--graduated
 *
 * PILLS:
 *   Plain text only — no emojis, no icons.
 *   Styled as soft lavender chips: bg #ede9f6, color #9c7bb5, radius 20px.
 *
 * ANIMATION:
 *   Cards fade in from the right on scroll via useInView hook.
 */
import { useInView } from '../hooks/useInView';

// Education entries — each card's left border color is set inline.
const educationEntries = [
  {
    id: 'bachelor',
    university: 'University of Balamand',
    // Plain text only — no emoji prefix
    location: 'Koura, Lebanon',
    degree: 'Bachelor in Computer Engineering',
    // Em-dash date range, no emoji
    dateRange: '2019 – 2022',
    status: 'graduated',
    statusLabel: 'Graduated \u2713', // ✓ is a standard ASCII-adjacent character, not an emoji
    borderColor: '#fda085',
    description: "Completed my bachelor\u2019s degree in Computer Engineering with a focus on software and hardware fundamentals.",
    thesis: "Bachelor\u2019s Thesis: Ball Tracking in Soccer Videos using Machine Learning",
  },
  {
    id: 'master',
    university: 'Politecnico di Torino',
    location: 'Torino, Italy',
    degree: 'Master in Computer Engineering \u2014 AI & Data Analysis',
    dateRange: '2023 – 2026',
    status: 'graduated',
    statusLabel: 'Graduated \u2713',
    borderColor: '#b39ddb',
    description:
      "Completed my Master\u2019s degree specialising in Artificial Intelligence and Data Analytics, " +
      "with courses in Web Applications, Advanced Machine Learning, and Software Engineering \u2014 each with a hands-on project.",
    thesis: "Master\u2019s Thesis: Design and Evaluation of an AI System for Mental Health Coaching.",
  },
];

// ── Individual card component ─────────────────────────────────────────────────
// Each card independently tracks its own inView state for the staggered
// scroll-in animation.
function EducationCard({ entry }) {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <article
      ref={ref}
      className={`education-card section-reveal-right ${inView ? 'visible' : ''}`}
      // Accent color applied inline so each card can have its own left border.
      style={{ borderLeft: `4px solid ${entry.borderColor}` }}
    >
      <div className="education-content">
        {/* University name and status badge share the same row */}
        <div className="education-header-row">
          <h3 className="card-title">{entry.university}</h3>
          {/*
           * CSS modifier class drives the badge color:
           *   .status-badge--graduated  → green bg/text
           */}
          <span className={`status-badge status-badge--${entry.status}`}>
            {entry.statusLabel}
          </span>
        </div>

        <p className="education-degree">{entry.degree}</p>

        {/*
         * Location and date pills — plain text, no emoji prefix.
         * Styled via .location-chip and .date-pill in index.css:
         *   background: #ede9f6, color: #9c7bb5, border-radius: 20px,
         *   padding: 4px 12px, font-size: 0.8rem
         */}
        <div className="education-meta">
          <span className="location-chip">{entry.location}</span>
          <span className="date-pill">{entry.dateRange}</span>
        </div>

        <p className="card-body-text">{entry.description}</p>
        {entry.thesis && (
          <p className="education-thesis">{entry.thesis}</p>
        )}
      </div>
    </article>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Education() {
  const [sectionRef, sectionInView] = useInView({ threshold: 0.15 });

  return (
    <section id="education" className="content-section">
      <div ref={sectionRef} className={`container section-reveal ${sectionInView ? 'visible' : ''}`}>
        <div className="section-heading">
          <p className="section-label">Education</p>
          <h2>Academic Progression</h2>
        </div>

        <div className="education-timeline">
          {educationEntries.map((entry) => (
            <div key={entry.id} className="education-row">
              {/* Vertical line + circular dot */}
              <div className="timeline-rail" aria-hidden="true">
                <span className="timeline-dot" />
              </div>
              <EducationCard entry={entry} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
