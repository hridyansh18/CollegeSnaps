import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-page">
      <div className="loader-box">

        <h1 className="loader-title">
          <span className="gold">S</span>
          <span className="gold">C</span>ollege
          <span className="gold">S</span>naps
          <span className="gold">IT</span>
        </h1>

        <p className="loader-text">
           Loading your memories...
        </p>

        <div className="loader-ring"></div>

      </div>
    </div>
  );
}