/**
 * Footer.jsx
 *
 * Minimal footer with fixed year and clickable social icons.
 */
function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon">
      <path
        fill="currentColor"
        d="M12 .5A11.5 11.5 0 0 0 .5 12.2c0 5.2 3.4 9.6 8 11.1.6.1.8-.2.8-.6v-2.1c-3.3.8-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4C17.7 4 18.7 4.3 18.7 4.3c.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1 .8 2.1v3.1c0 .4.2.8.8.6 4.6-1.5 8-5.9 8-11.1A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon">
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.6h4v11.9H3V9.6Zm7 0h3.8v1.7h.1c.5-1 1.9-2.1 4-2.1 4.2 0 5 2.8 5 6.3v6H19v-5.4c0-1.3 0-3-1.8-3-1.9 0-2.1 1.4-2.1 2.9v5.5H11V9.6Z"
      />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon">
      <path
        fill="currentColor"
        d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Zm2 1.2v.2l7 4.8 7-4.8v-.2h-14Zm14 2.6-6.4 4.4a1 1 0 0 1-1.2 0L5 9.3v9.2c0 .3.2.5.5.5h13c.3 0 .5-.2.5-.5V9.3Z"
      />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <p>© 2026 Jessy Habib</p>
        <div className="footer-links" aria-label="Social links">
          <a href="https://github.com/jessyhabib" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <IconGithub />
          </a>
          <a href="https://www.linkedin.com/in/jessy-habib-911233266/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <IconLinkedIn />
          </a>
          <a href="mailto:jessyhabib74@gmail.com" aria-label="Email">
            <IconEmail />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
