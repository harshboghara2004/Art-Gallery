import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const StarsImage = ({ stars }) => {
  return (
    <div className="flex flex-row">
      {[0, 1, 2, 3, 4].map((rating) => (
        <StarIcon
          key={rating}
          className={classNames(
            stars > rating ? "text-gold-dark" : "text-gray-200",
            "h-5 w-5 flex-shrink-0"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

function ReviewCard({ review }) {
  // console.log("time");
  return (
    <div key={review.user.id} className="mt-4 border-2 rounded-lg py-4 px-2">
      <div className="flex flex-row justify-between">
        <StarsImage stars={review.rating} />
        <p className="text-sm">
          <span className="italic font-medium">By: </span> {review.user.name}
        </p>
      </div>
      <div className="mt-4">{review.comment}</div>
    </div>
  );
}

const ReviewsGrid = ({ reviews }) => {
  // console.log(reviews);
  return (
    <>
      <h2 className="text-lg font-bold text-gray-900">
        Reviews ({reviews.length})
      </h2>
      <div className="mt-6">
        <div className="flex flex-col">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewsGrid;
