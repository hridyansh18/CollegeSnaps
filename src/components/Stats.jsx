import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import "./Stats.css";

export default function Stats() {

  const [photoCount, setPhotoCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  /* Website Launch Date */
  const launchDate = new Date("2026-05-20");
  const currentDate = new Date();

  let years =
    currentDate.getFullYear() -
    launchDate.getFullYear();

  let months =
    currentDate.getMonth() -
    launchDate.getMonth();

  let days =
    currentDate.getDate() -
    launchDate.getDate();

  if (days < 0) {
    months--;

    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  let runningTime = "";

  if (years > 0)
    runningTime += `${years}Y `;

  if (months > 0)
    runningTime += `${months}M `;

  runningTime += `${days}D`;

  useEffect(() => {

    /* Albums */
    const albumsRef = ref(database, "albums");

    const unsubscribeAlbums = onValue(
      albumsRef,
      (snapshot) => {

        const data = snapshot.val();

        if (!data) {
          setPhotoCount(0);
          return;
        }

        let totalPhotos = 0;

        Object.values(data).forEach((album) => {

          if (album.photos) {

            totalPhotos += Object.values(album.photos)
              .filter(
                (photo) =>
                  photo &&
                  photo.image
              ).length;

          }

        });

        setPhotoCount(totalPhotos);

      }
    );

    /* Users */
    const usersRef = ref(database, "users");

    const unsubscribeUsers = onValue(
      usersRef,
      (snapshot) => {

        const data = snapshot.val();

        if (data) {
          setUserCount(
            Object.keys(data).length
          );
        } else {
          setUserCount(0);
        }

      }
    );

    return () => {
      unsubscribeAlbums();
      unsubscribeUsers();
    };

  }, []);

  return (

    <section className="stats-section">

      <div className="stats-card">

        <h1>{photoCount}+</h1>

        <p>📸 Photos Uploaded</p>

      </div>

      <div className="stats-card">

        <h1>{userCount}+</h1>

        <p>👥 Students Joined</p>

      </div>

      <div className="stats-card">

        <h1>{runningTime}</h1>

        <p>🚀 Active Since</p>

      </div>

    </section>

  );

}