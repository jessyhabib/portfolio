/**
 * Navbar.jsx
 *
 * Sticky top navigation with anchor links for smooth in-page scrolling.
 */
import Logo from './Logo';

// Navigation links — order matches the page section flow
const links = [
  { label: 'About',     href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'My Work',   href: '#my-work' },
  { label: 'Skills',    href: '#skills' },
  { label: 'Languages',  href: '#languages' },
  { label: 'Learning',  href: '#learning' },
  { label: 'Fun Facts', href: '#fun-facts' },
  { label: 'Contact',   href: '#contact' },
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#about" aria-label="Go to top" className="logo-link">
          <Logo />
        </a>

        <nav aria-label="Main navigation">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
