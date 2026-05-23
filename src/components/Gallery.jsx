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

import "./Gallery.css";

export default function Gallery() {

  const [photos,
    setPhotos] =
    useState([]);

  const [selectedImage,
    setSelectedImage] =
    useState(null);

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

  return (

    <div
      id="gallery"

      className="gallery"
    >

      {/* Title */}
      <h1 className="gallery-title">

        Featured Memories 

      </h1>

      {/* Slider */}
      <div className="gallery-slider">

        {

          photos.map(

            (photo) => (

              <img

                key={photo.id}

                src={photo.image}

                alt="memory"

                onClick={() =>

                  setSelectedImage(
                    photo.image
                  )

                }

                className="gallery-image"

              />

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