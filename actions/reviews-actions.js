"use server";

import { convertedUrl } from "@/lib/url";
import { createReview, deleteReview } from "@/lib/reviews";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addReview(artTitle, rating, comment) {
  await createReview(artTitle, rating, comment);
  revalidatePath(convertedUrl(`/arts/${artTitle}`));
  redirect(convertedUrl(`/arts/${artTitle}`));
}

export async function deleteReviewAction(reviewId, title) {
  await deleteReview(reviewId);
  revalidatePath(convertedUrl(`/arts/${title}`));
  redirect(convertedUrl(`/arts/${title}`));
}
