import {
  useEffect,
  useState
} from "react";

import {
  ref,
  onValue,
  remove
} from "firebase/database";

import {
  auth,
  database
} from "../firebase";

import "./Album.css";

export default function Album() {

  const [photos,
    setPhotos] =
    useState([]);

  const [selectedImage,
    setSelectedImage] =
    useState(null);

  /* Admin Email */
  const adminEmail =
  "hridyanshchaudhary18@gmail.com";

  /* Load Photos */
  useEffect(() => {

    const photosRef =
      ref(database, "photos");

    onValue(

      photosRef,

      (snapshot) => {

        const data =
          snapshot.val();

        if (data) {

          const loadedPhotos =

            Object.entries(data)
            .map(

              ([id, value]) => ({

                id,
                ...value

              })

            );

          setPhotos(
            loadedPhotos.reverse()
          );

        }

      }

    );

  }, []);

  /* Delete */
  const deletePhoto =
    (id) => {

      remove(

        ref(
          database,
          `photos/${id}`
        )

      );

    };

  /* Download */
  const downloadPhoto =
    async (
      image,
      id
    ) => {

      const response =
        await fetch(image);

      const blob =
        await response.blob();

      const url =
        window.URL
        .createObjectURL(blob);

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        `memory-${id}.jpg`;

      document.body
      .appendChild(link);

      link.click();

      document.body
      .removeChild(link);

      window.URL
      .revokeObjectURL(url);

    };

  return (

    <div className="album-page">

      {/* Title */}
      <h1 className="album-title">

        Memory Album 

      </h1>

      {/* Grid */}
      <div className="album-grid">

        {

          photos.map(

            (photo) => (

              <div

                key={photo.id}

                className="album-card"

              >

                {/* Image */}
                <img

                  src={photo.image}

                  alt="memory"

                  className="album-image"

                  onClick={() =>
                    setSelectedImage(
                      photo.image
                    )
                  }

                />

                {/* Icons */}
                <div className="album-actions">

                  {/* Download */}
                  <button

                    onClick={() =>
                      downloadPhoto(
                        photo.image,
                        photo.id
                      )
                    }

                    className="download-btn"

                  >

                    ⬇

                  </button>

                  {/* Delete */}

                  {

                    (

                      auth.currentUser?.email ===
                      adminEmail

                    ||

                      auth.currentUser?.uid ===
                      photo.userId

                    ) && (

                      <button

                        onClick={() =>
                          deletePhoto(
                            photo.id
                          )
                        }

                        className="delete-btn"

                      >

                        🗑

                      </button>

                    )

                  }

                </div>

              </div>

            )

          )

        }

      </div>

      {/* Fullscreen */}
      {

        selectedImage && (

          <div

            className="fullscreen"

            onClick={() =>
              setSelectedImage(
                null
              )
            }

          >

            <img

              src={selectedImage}

              alt="fullscreen"

              className="fullscreen-image"

            />

          </div>

        )

      }

    </div>

  );

}