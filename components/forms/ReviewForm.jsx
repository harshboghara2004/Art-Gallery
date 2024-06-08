"use client";

import React, { useRef, useState } from "react";
import StarRating from "./StarRating";
import { addReview } from "@/actions/reviews-actions";

const ReviewForm = ({ artTitle }) => {
  const [rating, setRating] = useState(0);
  const comment = useRef();

  const handleData = async (e) => {
    e.preventDefault();
    await addReview(artTitle, rating, comment.current.value);
  };

  const handleRatingSelect = (ratingValue) => {
    setRating(ratingValue);
  };

  return (
    <form className="space-y-6 px-10 w-2/5" onSubmit={handleData}>
      <div className="mt-10 flex flex-col justify-center w-full">
        {/* Star Rating */}
        <div>
          <p className="block text-sm font-medium leading-6 text-gray-900">
            Star Rating
          </p>
          <div id="star-rating"></div>
          <StarRating onRatingSelect={handleRatingSelect} />
        </div>
        {/* Comment */}
        <div className="col-span-full mt-2">
          <label
            htmlFor="comment"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="comment"
              name="comment"
              rows={2}
              ref={comment}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p className="mt-1 mb-3 text-sm leading-6 text-gray-600">
            Write a few sentences about your thoughts on art.
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Done
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
