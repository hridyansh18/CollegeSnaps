import "./Hero.css";

export default function Hero() {

  return (

    <div className="hero">

      {/* Badge */}
      <div className="hero-badge">

        ✨ Your Digital Memory Album

      </div>

      {/* Heading */}
      <h1 className="hero-title">

        Capture Every

        <span>

          {" "}College Moment{" "}

        </span>

        Forever 📸

      </h1>

      {/* Description */}
      <p className="hero-desc">

        Upload memories,
        relive events,
        and keep your college
        life alive forever ✨

      </p>

      {/* Buttons */}
      <div className="hero-buttons">

        <a
          href="#gallery"

          className="hero-btn"

        >

          Explore Gallery

        </a>

        <a
          href="/album"

          className="hero-btn-outline"

        >

          Open Album

        </a>

      </div>

    </div>

  );

}

