import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setMenuOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          <span className="logo-highlight">S</span>
          <span className="logo-highlight">C</span>
          ollege
          <span className="logo-highlight">S</span>
          naps
          <span className="logo-highlight">IT</span>
        </a>

        {/* Desktop Links */}
        <div className="navbar-links">
          <a href="/">Home</a>

          <a href="/albums">Albums</a>

          {user ? (
            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`menu-overlay ${
          menuOpen ? "show-overlay" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${
          menuOpen ? "show-menu" : ""
        }`}
      >
        {user && (
          <div className="mobile-user">
            <img
              src={
                user.photoURL ||
                "https://ui-avatars.com/api/?name=User&background=8b5cf6&color=fff"
              }
              alt="User"
            />

            <h3>
              {user.displayName || "User"}
            </h3>

            <p>{user.email}</p>
          </div>
        )}

        <a
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          🏠 Home
        </a>

        <a
          href="/albums"
          onClick={() => setMenuOpen(false)}
        >
          📸 Albums
        </a>

        {user ? (
          <button onClick={logout}>
            🚪 Logout
          </button>
        ) : (
          <a
            href="/login"
            onClick={() => setMenuOpen(false)}
          >
            🔑 Login
          </a>
        )}
      </div>
    </>
  );
}