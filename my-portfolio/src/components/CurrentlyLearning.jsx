/**
 * CurrentlyLearning.jsx
 *
 * Pulsing animated cards for active learning focus areas.
 * Three topic cards + a personal note banner about the hands-on LLM project.
 */
import { useInView } from '../hooks/useInView';

// Each topic has a title and a short description.
const learningTopics = [
  {
    id: 'gen-ai',
    title: 'Generative AI & Prompt Engineering',
    description:
      'Exploring the foundations of generative models and crafting effective prompts for real-world tasks.',
  },
  {
    id: 'nlp-llm',
    title: 'NLP & LLM Models',
    description:
      'Studying natural language processing techniques and large language model architectures in depth.',
  },
  {
    id: 'chatbot',
    title: 'Chatbot Implementation',
    description:
      'Building a hands-on system that applies LLMs to create a working conversational AI experience.',
  },
];

function CurrentlyLearning() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section id="learning" className="content-section">
      <div ref={ref} className={`container section-reveal${inView ? ' visible' : ''}`}>
        <div className="section-heading">
          <p className="section-label">Currently Learning</p>
          <h2>Growing Every Day</h2>
        </div>

        {/* Pulsing topic cards */}
        <div className="learning-grid">
          {learningTopics.map((topic, index) => (
            // animationDelay staggers the pulse so all three don't pulse in sync
            <article
              key={topic.id}
              className="learning-card"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <h3 className="learning-card-title">{topic.title}</h3>
              <p>{topic.description}</p>
            </article>
          ))}
        </div>

        {/* Personal note about real-world application */}
        <p className="learning-note">
          🚀 Currently working on a hands-on project that applies LLMs in real use cases —
          bridging theory with practical implementation.
        </p>
      </div>
    </section>
  );
}

export default CurrentlyLearning;
