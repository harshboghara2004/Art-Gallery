"use client";

import { useState } from "react";

const StarRating = ({ totalStars = 5, onRatingSelect }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRatingSelect = (ratingValue) => {
    setRating(ratingValue);
    onRatingSelect(ratingValue);
  };

  return (
    <div className="flex flex-row">
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRatingSelect(ratingValue)}
              style={{ display: "none" }}
            />
            <svg
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleRatingSelect(ratingValue)}
              height="25"
              width="23"
              className="star"
              viewBox="0 0 25 23"
              fill={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            >
              <polygon
                strokeWidth="0"
                points="9.9, 1.1 6.3, 6.6 0.8, 7.6 4.6, 12.2 3.6, 18 9.9, 15.6 16.1, 18 15.1, 12.2 18.9, 7.6 13.3, 6.6 "
              />
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
