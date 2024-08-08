import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { convertedUrl } from "@/lib/url";
import DeleteReviewForm from "../forms/DeleteReviewForm";
import { getCurrentUser } from "@/lib/users";

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

function ReviewCard({ review, currentUserId, title }) {
  // console.log(review.user);
  return (
    <div key={review.user.id} className="mt-4 border-2 rounded-lg py-4 px-2">
      <div className="flex flex-row justify-between">
        <StarsImage stars={review.rating} />
        <p className="text-sm">
          <span className="italic font-medium">By: </span> {review.user.name}
        </p>
      </div>
      <div className="flex justify-between">
        <div className="mt-4">{review.comment}</div>
        {currentUserId === review.userId && (
          <DeleteReviewForm title={title} reviewId={review.id} />
        )}
      </div>
    </div>
  );
}

const AddReview = ({ title }) => {
  return (
    <Link
      href={convertedUrl(`/arts/${title}/review`)}
      className="px-4 py-2 rounded-lg bg-indigo-600 text-sm font-medium text-white"
    >
      Give a Review
    </Link>
  );
};

const ReviewsGrid = ({ reviews, title, currentUserId }) => {
  // console.log(title);
  return (
    <>
      <div className="flex gap-x-4">
        <h2 className="text-lg font-bold text-gray-900">
          Reviews ({reviews.length})
        </h2>
        <div>
          {currentUserId ? (
            <AddReview title={title} />
          ) : (
            <p className="font-serif text-lg font-light italic">
              {" "}
              Login to Review
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-col">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              title={title}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewsGrid;
