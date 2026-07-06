
// Updated AlbumDetails.jsx (Partially optimized)
// NOTE: This file keeps your existing functionality while adding
// listener cleanup, delete confirmation, upload validation,
// loading state and fullscreen close improvements.

import { useEffect, useState } from "react";
import { ref, onValue, push, update, remove } from "firebase/database";
import { auth, database } from "../firebase";
import { useParams } from "react-router-dom";
import "./AlbumDetails.css";

export default function AlbumDetails() {
  const { id } = useParams();

  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const adminEmail = "hridyanshchaudhary18@gmail.com";

  useEffect(() => {
    const albumRef = ref(database, `albums/${id}`);
    const photosRef = ref(database, `albums/${id}/photos`);

    const unsubAlbum = onValue(albumRef, (snap) => {
      setAlbum(snap.val());
    });

    const unsubPhotos = onValue(photosRef, (snap) => {
      const data = snap.val();

      if (!data) {
        setPhotos([]);
        return;
      }

      const list = Object.entries(data).map(([photoId, value]) => ({
        photoId,
        ...value,
      }));

      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      setPhotos(list);
    });

    const esc = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", esc);

    return () => {
      unsubAlbum();
      unsubPhotos();
      window.removeEventListener("keydown", esc);
    };
  }, [id]);

  const uploadPhotos = async (e) => {
    const files = [...e.target.files];
    if (!files.length) return;

    setUploading(true);

    try {
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;

        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", "collegesnaps");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/djex692ld/image/upload",
          {
            method: "POST",
            body: form,
          }
        );

        const data = await res.json();

        await push(ref(database, `albums/${id}/photos`), {
          image: data.secure_url,
          createdAt: Date.now(),
          uploadedBy: auth.currentUser?.uid,
        });

        await update(ref(database, `albums/${id}`), {
          coverImage: data.secure_url,
        });
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const deletePhoto = async (photoId) => {
    if (!window.confirm("Delete this photo?")) return;
    await remove(ref(database, `albums/${id}/photos/${photoId}`));
  };

  return (
    <div className="details-page">
      <div className="details-header">
        <h1>{album?.title}</h1>
        <p>
          {album?.createdAt
            ? new Date(album.createdAt).toLocaleDateString()
            : ""}
        </p>
      </div>

      <div className="upload-section">
        <label className="upload-box">
          {uploading ? "Uploading..." : "Add Photos"}
          <input hidden multiple type="file" onChange={uploadPhotos} />
        </label>
      </div>

      <div className="details-grid">
        {photos.map((photo) => (
          <div className="photo-card" key={photo.photoId}>
            <img
              src={photo.image}
              alt=""
              loading="lazy"
              onClick={() => setSelectedImage(photo.image)}
            />

            <div className="photo-actions">
              <a
                href={photo.image}
                target="_blank"
                rel="noreferrer"
                className="download-btn"
              >
                ↓
              </a>

              {(auth.currentUser?.email === adminEmail ||
                auth.currentUser?.uid === photo.uploadedBy) && (
                <button
                  className="delete-btn"
                  onClick={() => deletePhoto(photo.photoId)}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fullscreen"
          onClick={() => setSelectedImage(null)}
        >
          <img
            className="fullscreen-image"
            src={selectedImage}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
