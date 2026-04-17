/**
 * Skills.jsx
 *
 * Displays skill categories using grouped pastel chips.
 */
import { useInView } from '../hooks/useInView';

const skillGroups = [
  {
    title: 'AI & LLMs',
    items: ['LLM Fine-tuning (LoRA, SFT, DPO)', 'Retrieval Augmented Generation (RAG)', 'Prompt Engineering', 'Multi-node Orchestration', 'Evaluation Frameworks'],
  },
  {
    title: 'Backend',
    items: ['FastAPI', 'SQLAlchemy (async)', 'Alembic', 'REST APIs', 'JWT Authentication', 'PostgreSQL', 'pgvector'],
  },
  {
    title: 'ML Frameworks',
    items: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Hugging Face'],
  },
  {
    title: 'Programming Languages',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C', 'C++', 'SQL'],
  },
  {
    title: 'Web Development',
    items: ['React', 'Bootstrap', 'HTML', 'CSS'],
  },
  {
    title: 'Cloud & Infrastructure',
    items: ['Supabase', 'Render', 'Vercel', 'Modal', 'Together AI', 'Docker', 'Git'],
  },
  {
    title: 'Databases & Tools',
    items: ['PostgreSQL', 'SQLite', 'MongoDB', 'pgvector', 'Wireshark', 'MATLAB'],
  },
  {
    title: 'Microsoft Office',
    items: ['Word', 'Excel', 'PowerPoint', 'Access'],
  },
];

const spokenLanguages = ['English (fluent)', 'Arabic (mother tongue)', 'Italian (basic)'];

function Skills() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section id="skills" className="content-section">
      <div ref={ref} className={`container section-reveal ${inView ? 'visible' : ''}`}>
        <div className="section-heading">
          <p className="section-label">Skills</p>
          <h2>What I Work With</h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article key={group.title} className="skills-group-card">
              <h3>{group.title}</h3>
              <div className="skills-chip-wrap">
                {group.items.map((item) => (
                  <span key={item} className="skill-chip">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div id="languages" className="skills-languages">
          <div className="section-heading">
            <h2>Languages</h2>
          </div>
          <div className="skills-group-card premium-card">
            <div className="skills-chip-wrap">
              {spokenLanguages.map((lang) => (
                <span key={lang} className="skill-chip">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
