import {
  useEffect,
  useState
} from "react";

import {
  ref,
  onValue
} from "firebase/database";

import {
  database
} from "../firebase";

import "./Stats.css";

export default function Stats() {

  const [photoCount,
    setPhotoCount] =
    useState(0);

  const [userCount,
    setUserCount] =
    useState(0);

  /* Website Launch Date */
  const launchDate =
    new Date("2026-05-20");

  const currentDate =
    new Date();

  const diffTime =
    Math.abs(
      currentDate -
      launchDate
    );

  const daysRunning =
    Math.ceil(

      diffTime /

      (1000 * 60 * 60 * 24)

    );

  useEffect(() => {

    /* Photos Count */
    const photosRef =
      ref(database, "photos");

    onValue(

      photosRef,

      (snapshot) => {

        const data =
          snapshot.val();

        if (data) {

          setPhotoCount(

            Object.keys(data)
            .length

          );

        }

      }

    );

    /* Users Count */
    const usersRef =
      ref(database, "users");

    onValue(

      usersRef,

      (snapshot) => {

        const data =
          snapshot.val();

        if (data) {

          setUserCount(

            Object.keys(data)
            .length

          );

        }

      }

    );

  }, []);

  return (

    <div className="stats-section">

      {/* Photos */}
      <div className="stats-card">

        <h1>

          {photoCount}+

        </h1>

        <p>

          Photos Uploaded 📸

        </p>

      </div>

      {/* Users */}
      <div className="stats-card">

        <h1>

          {userCount}+

        </h1>

        <p>

          Students Joined 👥

        </p>

      </div>

      {/* Running */}
      <div className="stats-card">

        <h1>

          {daysRunning}

        </h1>

        <p>

          Active Since Launch 🚀

        </p>

      </div>

    </div>

  );

}