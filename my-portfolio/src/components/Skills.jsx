/**
 * Skills.jsx
 *
 * Displays skill categories using grouped pastel chips.
 */
import { useInView } from '../hooks/useInView';

const skillGroups = [
  {
    title: 'Microsoft Office',
    items: ['Word', 'Excel', 'PowerPoint', 'Access'],
  },
  {
    title: 'Software & Tools',
    items: ['VS Code', 'SQLite', 'MongoDB', 'Quartus', 'MATLAB', 'Wireshark', 'Keil', 'Docker', 'Git'],
  },
  {
    title: 'Programming Languages',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C', 'C++', 'HTML', 'CSS'],
  },
  {
    title: 'Web Development',
    items: ['React', 'Bootstrap'],
  },
  {
    title: 'ML Frameworks',
    items: ['TensorFlow', 'PyTorch', 'Scikit-Learn'],
  },
  {
    title: 'Languages',
    items: ['English (fluent)', 'Arabic (fluent)'],
  },
];

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
      </div>
    </section>
  );
}

export default Skills;
