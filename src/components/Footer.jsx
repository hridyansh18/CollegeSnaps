import "./Footer.css";

export default function Footer() {

  return (

    <footer className="footer">

      {/* Logo */}
      <h1 className="footer-logo">

        CollegeSnaps
        <span> 📸 </span>

      </h1>

      {/* Text */}
      <p className="footer-text">

        Capture memories,
        relive moments,
        and keep your
        college life alive forever ✨

      </p>

      {/* Social Buttons */}
      <div className="footer-socials">

        <a
          href="https://www.instagram.com/unfilterd_harddy"
          target="_blank"

          className="social-btn"
        >

          Instagram

        </a>

        <a
          href="https://github.com/hridyansh18"
          target="_blank"

          className="social-btn"
        >

          GitHub

        </a>

        <a
          href="https://www.linkedin.com/in/hridyanshchuadhary18"
          target="_blank"

          className="social-btn"
        >

          LinkedIn

        </a>

      </div>

      {/* Creator */}
      <p className="creator-text">

        Created By

        <span>

          {" "}Hridyansh Chaudhary

        </span>

      </p>

      {/* Copy */}
      <p className="footer-copy">

        © 2026 CollegeSnaps.
        All Rights Reserved.

      </p>

    </footer>

  );

}