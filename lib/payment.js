import db from "./database";
import { getCurrentUser } from "./sessions";

// Step 1 to 2

export async function startPayment(title) {
  const currentUser = getCurrentUser();
  const query = `
    UPDATE ArtPieces
    SET buyerId = ?, paymentStatus = ?
    WHERE title = ?
  `;
  db.prepare(query).run(currentUser.id, 2, title);
}

export async function paymentDoneFromBuyer(title) {
  const query = `
    UPDATE ArtPieces
    SET paymentStatus = ?
    WHERE title = ?
  `;
  db.prepare(query).run(3, title);
}

export async function approvalFromArtist(title) {
  const query = `
    UPDATE ArtPieces
    SET paymentStatus = ?
    WHERE title = ?
  `;
  db.prepare(query).run(5, title);
}
