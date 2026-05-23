import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";

import {
  ref,
  set
} from "firebase/database";

import { useNavigate }
from "react-router-dom";

import {
  auth,
  database
} from "../firebase";

export default function Signup() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleSignup =
    async () => {

      if (
        !email ||
        !password
      ) {

        setError(
          "Please fill all fields"
        );

        return;

      }

      try {

        setLoading(true);

        const userCredential =
          await createUserWithEmailAndPassword(

            auth,
            email,
            password

          );

        /* Save User Database */
        await set(

          ref(

            database,

            "users/" +
            userCredential.user.uid

          ),

          {

            email: email

          }

        );

        /* Verification Email */
        await sendEmailVerification(

          userCredential.user

        );

        alert(
          "Verification Email Sent 📩"
        );

        navigate("/login");

      } catch (err) {

        setError(
          err.message
        );

      }

      setLoading(false);

    };

  return (

    <div className="
    min-h-screen
    bg-gradient-to-br
    from-black
    via-slate-900
    to-zinc-950
    flex
    items-center
    justify-center
    px-6
    ">

      <div className="
      w-full
      max-w-md
      bg-white/5
      border
      border-white/10
      backdrop-blur-xl
      rounded-[40px]
      p-10
      shadow-2xl
      ">

        {/* Logo */}
        <div className="
        flex
        justify-center
        mb-10
        ">

          <h1 className="
          text-3xl
          font-extrabold
          text-white
          ">

            College
            <span className="
            text-pink-500
            ">

              Snaps

            </span> 📸

          </h1>

        </div>

        {/* Title */}
        <h1 className="
        text-4xl
        font-bold
        text-white
        text-center
        ">

          Create Account ✨

        </h1>

        <p className="
        text-gray-400
        text-center
        mt-4
        ">

          Join the memory world 📸

        </p>

        {/* Inputs */}
        <div className="
        mt-10
        space-y-6
        ">

          {/* Email */}
          <input

            type="email"

            placeholder="Enter Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            className="
            w-full
            bg-white/10
            border
            border-white/10
            text-white
            p-4
            rounded-2xl
            outline-none
            "

          />

          {/* Password */}
          <input

            type="password"

            placeholder="Create Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="
            w-full
            bg-white/10
            border
            border-white/10
            text-white
            p-4
            rounded-2xl
            outline-none
            "

          />

          {/* Error */}
          {

            error && (

              <p className="
              text-red-400
              text-sm
              ">

                {error}

              </p>

            )

          }

          {/* Button */}
          <button

            onClick={handleSignup}

            className="
            w-full
            bg-pink-500
            text-white
            py-4
            rounded-2xl
            font-bold
            hover:scale-105
            duration-300
            "

          >

            {

              loading

                ? "Creating..."

                : "Create Account"

            }

          </button>

          {/* Bottom */}
          <p className="
          text-center
          text-gray-400
          ">

            Already have account?

            <a

              href="/login"

              className="
              text-pink-400
              ml-2
              hover:underline
              "

            >

              Login

            </a>

          </p>

        </div>

      </div>

    </div>

  );
}