import db from "./database";
import { getCurrentUser } from "./sessions";

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

export async function createReview(artTitle, rating, comment) {
  const user = getCurrentUser();
  // console.log(artTitle);
  const query = `
    INSERT INTO Reviews (artTitle, userId, rating, comment)
    VALUES (?, ?, ?, ?)
  `;

  const id = db.prepare(query).run(artTitle, user.id, rating, comment);
  console.log(id);
}

export async function deleteReview(reviewId) {
  const query = `
  DELETE FROM Reviews
  WHERE id = ?;
`;
  db.prepare(query).run(reviewId);
}
