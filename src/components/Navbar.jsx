import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import {
  auth
} from "../firebase";

import "./Navbar.css";

export default function Navbar() {

  const navigate =
    useNavigate();

  const [menuOpen,
    setMenuOpen] =
    useState(false);

  const [user,
    setUser] =
    useState(null);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        (currentUser) => {

          setUser(
            currentUser
          );

        }

      );

    return () =>
      unsubscribe();

  }, []);

  const handleLogout =
    async () => {

      await signOut(auth);

      navigate("/login");

    };

  return (

    <>

      {/* Navbar */}
      <nav className="navbar">

        {/* Logo */}
        <h1 className="navbar-logo">

          CollegeSnaps 📸

        </h1>

        {/* Desktop */}
        <div className="navbar-links">

          <a
            href="#gallery"

            className="explore-btn"
          >

            Explore

          </a>

          {

            user && (

              <div className="user-box">

                {/* Profile */}
                <img

                  src={
                    user.photoURL
                  }

                  alt="profile"

                  className="user-pic"

                />

                {/* Info */}
                <div className="user-info">

                  <h4>

                    {user.displayName}

                  </h4>

                  <p>

                    {user.email}

                  </p>

                </div>

              </div>

            )

          }

          {

            user ? (

              <button

                onClick={
                  handleLogout
                }

                className="logout-btn"

              >

                Logout

              </button>

            ) : (

              <a
                href="/login"

                className="login-btn"
              >

                Login

              </a>

            )

          }

        </div>

        {/* Mobile */}
        <button

          className="menu-btn"

          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }

        >

          ☰

        </button>

      </nav>

      {/* Mobile Menu */}
      {

        menuOpen && (

          <div className="mobile-menu">

            <a href="#gallery">

              Gallery

            </a>

            {

              user && (

                <div className="mobile-user-box">

                  <img

                    src={
                      user.photoURL
                    }

                    alt="profile"

                    className="mobile-user-pic"

                  />

                  <h4>

                    {user.displayName}

                  </h4>

                  <p>

                    {user.email}

                  </p>

                </div>

              )

            }

            {

              user ? (

                <button
                  onClick={
                    handleLogout
                  }
                >

                  Logout

                </button>

              ) : (

                <a href="/login">

                  Login

                </a>

              )

            }

          </div>

        )

      }

    </>

  );

}