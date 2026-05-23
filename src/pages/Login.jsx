import {
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

import {
  auth
} from "../firebase";

import {
  useNavigate
} from "react-router-dom";

import "./Login.css";

export default function Login() {

  const navigate =
    useNavigate();

  const provider =
    new GoogleAuthProvider();

  /* Google Login */
  const handleGoogleLogin =
    async () => {

      try {

        await signInWithPopup(
          auth,
          provider
        );

        navigate("/");

      }

      catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="login-page">

      {/* Card */}
      <div className="login-card">

        {/* Title */}
<h1 className="login-title">

  <span className="welcome-text">

    Welcome

  </span>

  {" "}

  <span className="college-text">

    CollegeSnaps

  </span>

  <span className="camera-icon">

    📸

  </span>

</h1>

        {/* Text */}
        <p className="login-text">

          Login to continue
          your memory journey ✨

        </p>

        {/* Button */}
        <button

          onClick={
            handleGoogleLogin
          }

          className="google-btn"

        >

          Continue with Google

        </button>

      </div>

    </div>

  );

}