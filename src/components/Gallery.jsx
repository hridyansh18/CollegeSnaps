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

  useEffect(() => {

    const albumsRef =
      ref(database, "albums");

    onValue(

      albumsRef,

      (snapshot) => {

        const data =
          snapshot.val();

        if (!data) {

          setPhotos([]);

          return;

        }

        let allPhotos = [];

        /* ALL ALBUMS */
        Object.values(data)
        .forEach(

          (album) => {

            if (
              album.photos
            ) {

              /* ALL PHOTOS */
              Object.values(
                album.photos
              )
              .forEach(

                (photo) => {

                  if (
                    photo &&
                    photo.image
                  ) {

                    allPhotos.push({

                      image:
                      photo.image,

                      createdAt:
                      Number(
                        photo.createdAt
                      ) || 0

                    });

                  }

                }

              );

            }

          }

        );

        /* NEWEST FIRST */
        allPhotos.sort(

          (a, b) =>

            b.createdAt -
            a.createdAt

        );

        setPhotos(
          [...allPhotos]
        );

      }

    );

  }, []);

  return (

    <section
      className="
      gallery-section
      "
      id="gallery"
    >

      {/* Heading */}
      <div className="
      gallery-heading
      ">

        <h1 className="
        gallery-title
        ">

          Gallery

        </h1>

        <p className="
        gallery-subtitle
        ">

          Recent Uploads

        </p>

      </div>

      {/* Slider */}
      <div className="
      gallery-slider
      ">

        {

          photos.map(

            (photo, index) => (

              <div

                key={index}

                className="
                gallery-card
                "

                onClick={() =>
                  setSelectedImage(
                    photo.image
                  )
                }

              >

                <img

                  loading="lazy"

                  src={

                    photo.image?.includes(
                      "cloudinary"
                    )

                    ?

                    photo.image.replace(

                      "/upload/",

                      "/upload/f_auto,q_auto/"

                    )

                    :

                    photo.image

                  }

                  alt="gallery"

                />

              </div>

            )

          )

        }

      </div>

      {/* Fullscreen */}
      {

        selectedImage && (

          <div

            className="
            fullscreen
            "

            onClick={() =>
              setSelectedImage(
                null
              )
            }

          >

            <img

              src={

                selectedImage?.includes(
                  "cloudinary"
                )

                ?

                selectedImage.replace(

                  "/upload/",

                  "/upload/f_auto,q_auto/"

                )

                :

                selectedImage

              }

              alt="fullscreen"

              className="
              fullscreen-image
              "

            />

          </div>

        )

      }

    </section>

  );

}