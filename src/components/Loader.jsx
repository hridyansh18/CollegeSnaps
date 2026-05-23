import "./Loader.css";

export default function Loader() {

  return (

    <div className="loader-container">

      {/* Glow */}
      <div className="loader-glow"></div>

      {/* Spinner */}
      <div className="loader-circle"></div>

      {/* Text */}
      <h1 className="loader-text">

        CollegeSnaps

        <span>

          📸

        </span>

      </h1>

      {/* Subtitle */}
      <p className="loader-subtext">

        Loading your memories...

      </p>

    </div>

  );

}