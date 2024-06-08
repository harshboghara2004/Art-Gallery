"use client";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";
import { convertedUrl } from "../headers/MainHeaderClient";
import { deleteReviewAction } from "@/actions/reviews-actions";

const DeleteReviewForm = ({ reviewId, title }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await deleteReviewAction(reviewId, title);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="mt-2 inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
        Delete
      </button>
    </form>
  );
};

export default DeleteReviewForm;
