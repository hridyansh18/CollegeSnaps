import {
  useState
} from "react";

import {
  ref,
  push
} from "firebase/database";

import {
  database
} from "../firebase";

import "./Quotes.css";

export default function Quotes() {

  const [feedback,
    setFeedback] =
    useState("");

  const quotes = [

    "“Some memories never fade, they just smile back.”",

    "“Friends make ordinary moments unforgettable.”",

    "“A chapter ends, but memories stay forever.”",

    "Moments end, memories stay forever 🌙"

  ];

  /* Submit */
  const submitFeedback =
    async () => {

      if (!feedback) return;

      await push(

        ref(database, "feedbacks"),

        {

          text: feedback,
          createdAt:
          Date.now()

        }

      );

      alert(
        "Feedback Submitted "
      );

      setFeedback("");

    };

  return (

    <div className="quotes-section">

      {/* Title */}
      <h1 className="quotes-title">

        Memory Vibes 

      </h1>

      {/* Quotes */}
      <div className="quotes-container">

        {

          quotes.map(

            (quote, index) => (

              <div

                key={index}

                className="quote-card"

              >

                {quote}

              </div>

            )

          )

        }

      </div>

      {/* Feedback */}
      <div className="feedback-box">

        <h2>

          Share Your Feedback 

        </h2>


        <textarea

          placeholder="
Write your thoughts here...
"

          value={feedback}

          onChange={(e) =>
            setFeedback(
              e.target.value
            )
          }

        />

        <button

          onClick={
            submitFeedback
          }

        >

          Submit Feedback

        </button>

      </div>

    </div>

  );

}