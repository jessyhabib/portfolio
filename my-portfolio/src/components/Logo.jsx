/**
 * Logo.jsx
 *
 * SVG monogram logo using the Great Vibes font.
 */
function Logo() {
  return (
    <svg
      className="logo-svg"
      viewBox="0 0 120 120"
      role="img"
      aria-label="JH logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="60" r="54" className="logo-circle-fill" />
      <text x="60" y="72" textAnchor="middle" className="logo-monogram">
        JH
      </text>
    </svg>
  );
}

export default Logo;
