import prisma from "./prisma"; // Ensure correct path for Prisma Client instance
import { getCurrentUser } from "./users"; // Adjust path if needed

// Get Unique Reviews
export async function getUniqueReviews(artTitle) {
  const reviews = await prisma.review.findMany({
    where: { artTitle },
    include: { user: true },
  });

  const uniqueUsers = new Set();
  const uniqueReviews = reviews.filter((review) => {
    if (!uniqueUsers.has(review.userId)) {
      uniqueUsers.add(review.userId);
      return true;
    }
    return false;
  });

  return uniqueReviews;
}

// Create a New Review
export async function createReview(artTitle, rating, comment) {
  const user = await getCurrentUser();

  const newReview = await prisma.review.create({
    data: {
      artTitle,
      userId: user.id,
      rating,
      comment,
    },
  });

  console.log(newReview);
  return newReview;
}

// Delete a Review
export async function deleteReview(reviewId) {
  const deletedReview = await prisma.review.delete({
    where: { id: reviewId },
  });

  console.log(deletedReview);
  return deletedReview;
}
