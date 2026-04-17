/**
 * Experience.jsx
 *
 * Horizontal carousel for project-based work experience.
 * Each card includes:
 * - Large gradient header
 * - Bold project/course title
 * - University badge
 * - Date range pill
 * - Rich bullet-point details
 */
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';

const experiences = [
  {
    id: 'soccer-tracker-thesis',
    title: 'Soccer Ball Tracker (Bachelor Thesis)',
    university: 'University of Balamand',
    dateRange: 'Bachelor Phase',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    points: [
      'Built an ML-based approach to track a soccer ball in video streams.',
      'Handled core image processing and object detection pipelines.',
      'Focused on reliable tracking under fast motion and scene changes.',
    ],
  },
  {
    id: 'meme-coursework',
    title: 'What Do You Meme?',
    university: 'Politecnico di Torino',
    dateRange: 'June 2024',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    points: [
      'Developed an interactive meme game with frontend and backend layers.',
      'Designed user flows and integrated game logic with API endpoints.',
      'Focused on smooth interaction and responsive UI behavior.',
    ],
  },
  {
    id: 'task-arithmetic-coursework',
    title: 'Task Arithmetic Under Bias-Variance Trade-offs',
    university: 'Politecnico di Torino',
    dateRange: 'Dec 2024 – Jan 2025',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    points: [
      'Analyzed optimization strategies for balancing bias and variance.',
      'Explored model behavior across different task-composition settings.',
      'Evaluated practical trade-offs with experiment-driven iteration.',
    ],
  },
  {
    id: 'ezelectronics-coursework',
    title: 'EZElectronics',
    university: 'Politecnico di Torino',
    dateRange: 'March 2024 – June 2024',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    points: [
      'Implemented backend services and structured database architecture.',
      'Contributed to GUI building and end-to-end testing workflows.',
      'Collaborated on software engineering practices and delivery quality.',
    ],
  },
];

function ExperienceCard({ item }) {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <article ref={ref} className={`carousel-card premium-card section-reveal ${inView ? 'visible' : ''}`}>
      <div className="card-gradient-header" style={{ background: item.gradient }} aria-hidden="true" />
      <div className="experience-body">
        <h3 className="card-title">{item.title}</h3>

        <div className="experience-meta">
          <span className="university-badge">{item.university}</span>
          <span className="date-pill">{item.dateRange}</span>
        </div>

        <ul className="experience-points">
          {item.points.map((point) => (
            <li key={point} className="card-body-text">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Experience() {
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
    const slider = sliderRef.current;
    dragState.current.isDown = false;
    slider?.classList.remove('is-dragging');
  };

  return (
    <section id="experience" className="content-section">
      <div ref={sectionRef} className={`container section-reveal ${sectionInView ? 'visible' : ''}`}>
        <div className="section-heading">
          <p className="section-label">Experience</p>
          <h2>Project-Based Experience</h2>
        </div>

        <div className="carousel-controls" aria-label="Experience carousel controls">
          <button type="button" className="arrow-btn" onClick={() => moveCarousel(-1)} aria-label="Previous experience">
            ←
          </button>
          <button type="button" className="arrow-btn" onClick={() => moveCarousel(1)} aria-label="Next experience">
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
          {experiences.map((item) => (
            <ExperienceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
