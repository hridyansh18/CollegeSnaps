import "./Footer.css";

export default function Footer() {

  const currentYear = new Date().getFullYear();

  return (

    <footer className="footer">

      {/* Logo */}
      <a href="/" className="footer-logo">

        <span className="logo-highlight">C</span>ollege
        <span className="logo-highlight">S</span>naps
        <span className="logo-highlight">IT</span>

      </a>

      {/* Description */}
      <p className="footer-text">

        📸 Capture memories, relive unforgettable moments,
        and preserve your college journey forever.

      </p>

      {/* Social Links */}
      <div className="footer-socials">

        <a
          href="https://www.instagram.com/unfilterd_harddy"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
        >
          📷 Instagram
        </a>

        <a
          href="https://github.com/hridyansh18"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
        >
          💻 GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/hridyanshchuadhary18"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
        >
          💼 LinkedIn
        </a>

      </div>

      {/* Creator */}
      <p className="creator-text">

        Made with ❤️ by

        <span> Hridyansh Chaudhary</span>

      </p>

      {/* Copyright */}
      <p className="footer-copy">

        © {currentYear} CollegeSnaps.
        All Rights Reserved.

      </p>

    </footer>

  );

}