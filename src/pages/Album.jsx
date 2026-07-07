import { useState, useEffect } from "react";
import { ref, push, onValue, remove } from "firebase/database";
import { auth, database } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Album.css";

export default function Albums() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  /* CHANGE THIS */
  const adminEmail = "hridyanshchaudhary18@gmail.com";

  const defaultCover =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=80";

  /* ===============================
        CREATE ALBUM
  =============================== */

  const createAlbum = async () => {

    const albumTitle = title.trim();

    if (!albumTitle) {
      alert("Please enter album name.");
      return;
    }

    await push(ref(database, "albums"), {

      title: albumTitle,

      userName:
        auth.currentUser?.displayName || "Unknown",

      userId:
        auth.currentUser?.uid,

      createdAt:
        Date.now(),

      coverImage:
        defaultCover,

      photos: {}

    });

    setTitle("");

  };

  /* Enter Key */

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      createAlbum();

    }

  };

  /* ===============================
          DELETE
  =============================== */

  const deleteAlbum = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this album?"
    );

    if (!confirmDelete) return;

    await remove(ref(database, `albums/${id}`));

  };

  /* ===============================
          LOAD
  =============================== */

  useEffect(() => {

    const albumsRef = ref(database, "albums");

    const unsubscribe = onValue(albumsRef, (snapshot) => {

      const data = snapshot.val();

      if (!data) {

        setAlbums([]);
        setLoading(false);
        return;

      }

      const loadedAlbums = Object.entries(data).map(
        ([id, value]) => ({

          id,

          ...value

        })
      );

      loadedAlbums.sort(
        (a, b) =>
          (b.createdAt || 0) -
          (a.createdAt || 0)
      );

      setAlbums(loadedAlbums);

      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

  return (

    <div className="albums-page">

      {/* TITLE */}

      <h1 className="albums-title">

         Album Memories

      </h1>

      {/* CREATE */}

      <div className="create-album">

        <input

          type="text"

          placeholder="Create new album..."

          value={title}

          onChange={(e) =>
            setTitle(e.target.value)
          }

          onKeyDown={handleKeyDown}

          maxLength={40}

        />

        <button onClick={createAlbum}>

          Create

        </button>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="album-empty">

          Loading albums...

        </div>

      )}

      {/* EMPTY */}

      {!loading && albums.length === 0 && (

        <div className="album-empty">

          📂 No albums found

        </div>

      )}

      {/* GRID */}

      <div className="albums-grid">

        {albums.map((album) => {

          const photoCount = album.photos
            ? Object.keys(album.photos).length
            : 0;

          const cover = album.coverImage
            ? album.coverImage.includes("cloudinary")
              ? album.coverImage.replace(
                  "/upload/",
                  "/upload/f_auto,q_auto/"
                )
              : album.coverImage
            : defaultCover;

          return (

            <div
              key={album.id}
              className="album-folder"
            >

              {/* COVER */}

              <img

                loading="lazy"

                src={cover}

                alt={album.title}

                onClick={() =>
                  navigate(`/album/${album.id}`)
                }

              />

              {/* INFO */}

              <div className="album-info">

                <h2>

                  {album.title}

                </h2>

                <p>

                  {album.createdAt
                    ? new Date(
                        album.createdAt
                      ).toLocaleDateString()
                    : "-"}

                </p>

                <span>

                  📸 {photoCount} Photos

                </span>

              </div>

              {/* DELETE */}

              {(auth.currentUser?.email === adminEmail ||

                auth.currentUser?.uid === album.userId) && (

                <button

                  className="album-delete"

                  onClick={() =>
                    deleteAlbum(album.id)
                  }

                >

                  ✕

                </button>

              )}

            </div>

          );

        })}

      </div>

    </div>

  );

}