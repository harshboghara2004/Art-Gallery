export function getUniqueReviews(reviews) {
  const uniqueUsers = new Set();
  return reviews.filter((review) => {
    if (!uniqueUsers.has(review.user)) {
      uniqueUsers.add(review.user);
      return true;
    }
    return false;
  });
}
