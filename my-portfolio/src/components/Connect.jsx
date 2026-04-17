/**
 * Connect.jsx
 *
 * Minimal "Let's Connect" section — no contact form.
 *
 * CONTENT:
 *   - Heading: "Let's Connect"
 *   - Subtext: invite message
 *   - Pill button: "Send me an email" → mailto link
 *   - Icon links: GitHub + LinkedIn
 *
 * Replace [YOUR GITHUB URL] and [YOUR LINKEDIN URL] with your actual profile URLs.
 * Replace YOUR_EMAIL with your real email address.
 */

// ── SVG icon components ───────────────────────────────────────────────────────
// Inline SVGs keep the footer self-contained (no external icon library needed).

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="connect-icon">
      <path
        fill="currentColor"
        d="M12 .5A11.5 11.5 0 0 0 .5 12.2c0 5.2 3.4 9.6 8 11.1.6.1.8-.2.8-.6v-2.1c-3.3.8-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4C17.7 4 18.7 4.3 18.7 4.3c.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1 .8 2.1v3.1c0 .4.2.8.8.6 4.6-1.5 8-5.9 8-11.1A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="connect-icon">
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.6h4v11.9H3V9.6Zm7 0h3.8v1.7h.1c.5-1 1.9-2.1 4-2.1 4.2 0 5 2.8 5 6.3v6H19v-5.4c0-1.3 0-3-1.8-3-1.9 0-2.1 1.4-2.1 2.9v5.5H11V9.6Z"
      />
    </svg>
  );
}

// ── Section component ─────────────────────────────────────────────────────────
function Connect() {
  return (
    // id="contact" keeps the navbar "Contact" anchor link working
    <section id="contact" className="content-section">
      <div className="container">
        <div className="connect-card">
          <h2 className="connect-title">Let&apos;s Connect</h2>
          <p className="connect-sub">
            Have a question or just want to say hi? My inbox is always open.
          </p>

          {/* Primary CTA: opens the user's default email client */}
          <a href="mailto:jessyhabib74@gmail.com" className="connect-mail-btn">
            Send me an email
          </a>

          {/* Secondary links: GitHub and LinkedIn */}
          <div className="connect-links" aria-label="Social links">
            <a
              href="https://github.com/jessyhabib"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <IconGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/jessy-habib-911233266/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <IconLinkedIn />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Connect;
