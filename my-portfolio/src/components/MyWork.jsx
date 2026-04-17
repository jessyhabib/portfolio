import { useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

const workItems = [
  {
    id: 'masters-thesis',
    title: 'Design and Evaluation of an AI System for Mental Health Coaching',
    teaser: 'Safety-first LLM backend for a mental health coaching system.',
    description:
      'Backend for a mental health coaching chatbot. Multi-node LLM pipeline with RAG, ' +
      'fine-tuning, and evaluation. In collaboration with Bmind S.R.L.',
    tech: ['FastAPI', 'Python', 'pgvector', 'RAG', 'LoRA', 'OpenRouter'],
    github: null,
    university: 'Politecnico di Torino · Bmind S.R.L.',
    dateRange: 'October 2025 – Present',
  },
  {
    id: 'soccer-tracker',
    title: 'Soccer Ball Tracker',
    teaser: 'ML-based video tracking of a soccer ball using image processing.',
    description:
      'Built an ML-based approach to track a soccer ball in video streams. ' +
      'Handled core image processing and object detection pipelines.',
    tech: ['Python', 'OpenCV', 'Object Detection', 'Image Processing'],
    github: null,
    university: 'University of Balamand',
    dateRange: 'Bachelor Thesis',
  },
  {
    id: 'meme-game',
    title: 'What Do You Meme?',
    teaser: 'Interactive web meme game with full-stack implementation.',
    description:
      'Developed an interactive web-based meme game with frontend and backend. ' +
      'Designed user flows and integrated game logic with API endpoints.',
    tech: ['JavaScript', 'Node.js', 'React', 'HTML/CSS'],
    github: null,
    university: 'Politecnico di Torino',
    dateRange: 'June 2024',
  },
  {
    id: 'task-arithmetic',
    title: 'Task Arithmetic',
    teaser: 'Analyzing bias-variance trade-offs in model task composition.',
    description:
      'Analyzed optimization strategies for balancing bias and variance. ' +
      'Explored model behavior across different task-composition settings.',
    tech: ['Python', 'PyTorch', 'Scikit-Learn'],
    github: null,
    university: 'Politecnico di Torino',
    dateRange: 'Dec 2024 – Jan 2025',
  },
  {
    id: 'ezelectronics',
    title: 'EZElectronics',
    teaser: 'Full backend, database, and GUI for an electronics store platform.',
    description:
      'Implemented backend services and structured database architecture. ' +
      'Contributed to GUI design and end-to-end testing workflows.',
    tech: ['Node.js', 'SQLite', 'Backend', 'GUI', 'Testing'],
    github: null,
    university: 'Politecnico di Torino',
    dateRange: 'March – June 2024',
  },
];

const faceBase = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: 'var(--card-radius)',
  overflow: 'hidden',
};

function ProjectCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const toggle = () => setIsFlipped((f) => !f);

  return (
    <div
      className="flip-scene"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${item.title} — click to flip`}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease',
          position: 'relative',
          width: '100%',
          height: '100%',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── FRONT FACE ── */}
        <div
          style={{
            ...faceBase,
            background: 'linear-gradient(135deg, #9b7fd4 0%, #c8b8e8 55%, #e0d5f5 100%)',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              width: '100%',
              padding: '20px',
              background: 'linear-gradient(to top, rgba(50,30,80,0.65), transparent)',
              borderRadius: '0 0 var(--card-radius) var(--card-radius)',
            }}
          >
            <h3
              style={{
                margin: '0 0 6px',
                color: '#fff',
                fontSize: '1.25rem',
                fontWeight: 800,
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                margin: '0 0 10px',
                color: 'rgba(255,255,255,0.88)',
                fontSize: '0.9rem',
                lineHeight: 1.5,
              }}
            >
              {item.teaser}
            </p>
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
              click to flip →
            </span>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div
          style={{
            ...faceBase,
            transform: 'rotateY(180deg)',
            background: '#fff',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            border: '1px solid rgba(156,123,181,0.15)',
            overflow: 'hidden auto',
          }}
        >
          <h3 className="card-title" style={{ margin: 0, color: '#2d1f3d' }}>
            {item.title}
          </h3>
          <p style={{ margin: 0, color: '#4a3b58', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>
            {item.description}
          </p>
          <div className="tech-tags">
            {item.tech.map((t) => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const DRAG_THRESHOLD = 6;

function Carousel({ children }) {
  const trackRef    = useRef(null);
  const isDown      = useRef(false);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const scrollStart = useRef(0);

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const cardW = track.firstElementChild?.offsetWidth ?? 300;
    track.scrollBy({ left: dir * (cardW + 20), behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    isDown.current      = true;
    isDragging.current  = false;
    startX.current      = e.clientX;
    scrollStart.current = trackRef.current.scrollLeft;
  };

  const onPointerMove = (e) => {
    if (!isDown.current) return;
    const dx = e.clientX - startX.current;
    if (!isDragging.current && Math.abs(dx) > DRAG_THRESHOLD) {
      isDragging.current = true;
      trackRef.current.classList.add('is-dragging');
      trackRef.current.setPointerCapture(e.pointerId);
    }
    if (isDragging.current) {
      trackRef.current.scrollLeft = scrollStart.current - dx;
    }
  };

  const onPointerUp = () => {
    isDown.current     = false;
    isDragging.current = false;
    trackRef.current?.classList.remove('is-dragging');
  };

  return (
    <div className="carousel-wrap">
      <div className="carousel-controls">
        <button className="arrow-btn" onClick={() => scroll(-1)} aria-label="Scroll left">&#8249;</button>
        <button className="arrow-btn" onClick={() => scroll(1)} aria-label="Scroll right">&#8250;</button>
      </div>
      <div
        ref={trackRef}
        className="carousel-track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {children}
      </div>
    </div>
  );
}

function MyWork() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="my-work" className="content-section">
      <div ref={ref} className={`container section-reveal${inView ? ' visible' : ''}`}>
        <div className="section-heading">
          <p className="section-label">My Work</p>
          <h2>Projects &amp; Experience</h2>
        </div>
        <Carousel>
          {workItems.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default MyWork;
