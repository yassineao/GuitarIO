import React from "react";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "Learn", href: "/options" },
  { label: "Notes", href: "/notes" },
  { label: "Play", href: "/play-song" },
];

const practiceLinks = [
  { label: "Chapters", href: "/Chapters" },
  { label: "Major Notes", href: "/majorNotes" },
  { label: "Protected", href: "/protected" },
];

const Footer = () => {
  return (
    <footer id="site-footer">
      <div className="footer__scanline"></div>

      <div className="footer__container container">
        <div className="footer__brand">
          <Link href="/#home" className="footer__logo">
            GuitarIO
          </Link>
          <p className="footer__description">
            Neon lessons, song tools, and practice paths for players who want to keep moving.
          </p>
        </div>

        <nav className="footer__group" aria-label="Footer navigation">
          <h3 className="footer__title">Explore</h3>
          <div className="footer__links">
            {quickLinks.map((link) => (
              <Link href={link.href} className="footer__link" key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <nav className="footer__group" aria-label="Practice navigation">
          <h3 className="footer__title">Practice</h3>
          <div className="footer__links">
            {practiceLinks.map((link) => (
              <Link href={link.href} className="footer__link" key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="footer__panel">
          <span className="footer__panel-label">next session</span>
          <strong>15 min riff loop</strong>
          <Link href="/options" className="footer__button">
            Start
          </Link>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>&copy; 2026 GuitarIO. All rights reserved.</p>
        <span>Built for loud practice and tiny screens.</span>
      </div>
    </footer>
  );
};

export default Footer;
