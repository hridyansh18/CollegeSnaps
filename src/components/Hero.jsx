import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-tag">
          📸 Your Digital College Memory Album
        </p>

        <h1 className="hero-title">
          Capture Every <br />
          College Moment <br />
          Forever
        </h1>

        <p className="hero-desc">
          Upload photos, create albums, and relive your unforgettable
          college memories anytime, anywhere. ✨
        </p>

        <div className="hero-buttons">
          <a href="/albums" className="hero-btn">
            📂 Open Albums
          </a>

          <a href="#gallery" className="hero-btn-outline">
            🖼️ Explore Gallery
          </a>
        </div>
      </div>
    </section>
  );
}