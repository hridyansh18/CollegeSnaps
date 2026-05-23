import "./Upload.css";

import { useRef } from "react";

import {
  ref,
  push
} from "firebase/database";

import {
  database,
  auth
} from "../firebase";

export default function Upload() {

  const fileInputRef =
    useRef(null);

  /* Open Gallery */
  const openFilePicker = () => {

    fileInputRef.current.click();

  };

  /* Upload Image */
  const handleFileChange =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onloadend =
        async () => {

          const imageUrl =
            reader.result;

          await push(
            ref(database, "photos"),
            {

              image: imageUrl,

              userId:
                auth.currentUser?.uid

            }
          );

          alert(
            "Memory Uploaded 🚀"
          );

        };

      reader.readAsDataURL(file);

    };

  return (

    <div className="upload-container">

      {/* Hidden Input */}
      <input

        type="file"

        accept="image/*"

        ref={fileInputRef}

        onChange={handleFileChange}

        className="hidden-input"

      />

      {/* Upload Button */}
      <button

        className="upload-btn"

        onClick={openFilePicker}

      >

        Upload Memory 

      </button>

    </div>

  );

}