import { useState, useEffect } from "react";
import "./Login.css";

import {
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

import {
  ref,
  set
} from "firebase/database";

import {
  auth,
  database
} from "../firebase";

import {
  useNavigate
} from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    document.title = "CollegeSnaps | Login";

  }, []);

  /* ==========================
      GOOGLE LOGIN
  ========================== */

  const loginWithGoogle = async () => {

    if (loading) return;

    setLoading(true);

    try {

      const result = await signInWithPopup(
        auth,
        provider
      );

      const user = result.user;

      await set(

        ref(database, `users/${user.uid}`),

        {

          name: user.displayName,

          email: user.email,

          photo: user.photoURL,

          joinedAt: Date.now()

        }

      );

      navigate("/");

    }

    catch (error) {

      console.error(error);

      alert("Google Login Failed!");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1 className="login-title">

          <span className="welcome-text">

            Welcome

          </span>

          <br />

          <span className="college-text">

            CollegeSnaps

          </span>

        </h1>

        <p className="login-text">

          Login with your Google account and start creating beautiful college memories. ✨

        </p>

        <button

          className="google-btn"

          onClick={loginWithGoogle}

          disabled={loading}

        >

          {

            loading

              ? "Signing In..."

              : "Continue with Google"

          }

        </button>

      </div>

    </div>

  );

}