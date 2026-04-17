/**
 * Projects.jsx
 *
 * Horizontal scroll-snap carousel of 3D flip cards.
 * Front side: project name only.
 * Back side: description, tech stack, and optional GitHub link.
 */
import { useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

const projects = [
  {
    id: 'soccer-tracker',
    name: 'Soccer Ball Tracker',
    description: 'ML-based ball tracking from video',
    tech: ['Python', 'OpenCV', 'Object Detection', 'Image Processing'],
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 'meme-game',
    name: 'What Do You Meme?',
    description: 'Interactive web-based meme game',
    tech: ['JavaScript', 'Node.js', 'React', 'HTML/CSS'],
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
  },
  {
    id: 'task-arithmetic',
    name: 'Task Arithmetic',
    description: 'ML model optimization under bias-variance trade-offs',
    tech: ['Python', 'PyTorch', 'Scikit-Learn'],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 'ezelectronics',
    name: 'EZElectronics',
    description: 'Electronics store management platform',
    tech: ['Node.js', 'SQLite', 'Backend', 'GUI', 'Testing'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
];

function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.2 });
  const toggleFlip = () => setFlipped((current) => !current);

  return (
    <article ref={ref} className={`flip-scene section-reveal ${inView ? 'visible' : ''}`}>
      <div
        className={`flip-inner ${flipped ? 'is-flipped' : ''}`}
        onClick={toggleFlip}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleFlip();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${project.name} ${flipped ? 'front side' : 'details side'}`}
      >
        <div className="flip-face flip-front premium-card" style={{ background: project.gradient }}>
          <div className="project-front-overlay" />
          <div className="project-front-title">{project.name}</div>
        </div>

        <div className="flip-face flip-back premium-card">
          <p className="project-back-text card-body-text">{project.description}</p>

          <div className="tech-tags" aria-label="Tech stack tags">
            {project.tech.map((tag) => (
              <span key={tag} className="tech-tag">
                {tag}
              </span>
            ))}
          </div>

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="project-link"
            >
              GitHub ↗
            </a>
          ) : (
            <span className="project-no-link">No GitHub link</span>
          )}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const [sectionRef, sectionInView] = useInView({ threshold: 0.12 });
  const sliderRef = useRef(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const moveCarousel = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const amount = slider.clientWidth * 0.8;
    slider.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  const onPointerDown = (event) => {
    const slider = sliderRef.current;
    if (!slider) return;
    dragState.current = {
      isDown: true,
      startX: event.clientX,
      scrollLeft: slider.scrollLeft,
    };
    slider.classList.add('is-dragging');
  };

  const onPointerMove = (event) => {
    const slider = sliderRef.current;
    if (!slider || !dragState.current.isDown) return;
    const distance = event.clientX - dragState.current.startX;
    slider.scrollLeft = dragState.current.scrollLeft - distance;
  };

  const onPointerUp = () => {
    dragState.current.isDown = false;
    sliderRef.current?.classList.remove('is-dragging');
  };

  return (
    <section id="projects" className="content-section">
      <div ref={sectionRef} className={`container section-reveal ${sectionInView ? 'visible' : ''}`}>
        <div className="section-heading">
          <p className="section-label">Projects</p>
          <h2>Featured Work</h2>
        </div>

        <div className="carousel-controls" aria-label="Projects carousel controls">
          <button type="button" className="arrow-btn" onClick={() => moveCarousel(-1)} aria-label="Previous project">
            ←
          </button>
          <button type="button" className="arrow-btn" onClick={() => moveCarousel(1)} aria-label="Next project">
            →
          </button>
        </div>

        <div
          ref={sliderRef}
          className="carousel-track"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
