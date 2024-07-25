import { getArtPieceByTitle } from "./artPieces";
import db from "./database";
import { getUserById } from "./users";

// CREATE TABLE notifications (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   type TEXT NOT NULL CHECK (type IN ('Approval', 'Payment', 'Refund')),
//   description TEXT NOT NULL,
//   from_user INT NOT NULL,
//   to_user INT NOT NULL,
//   artTitle TEXT NOT NULL,
//   e1 TEXT,
//   e2 TEXT,
//   e3 TEXT,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

export async function initiatePaymentNotification({ artTitle }) {
  const artPiece = getArtPieceByTitle({ title: artTitle });
  // console.log(artPiece);
  const query = `
    INSERT INTO notifications (type, description, from_user, to_user, artTitle, e1, e2, e3)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;
  db.prepare(query).run(
    "Payment",
    `You have initiated Payment of $${artPiece.price} for artPiece: ${artPiece.title}`,
    artPiece.artistId,
    artPiece.buyerId,
    artPiece.title,
    null,
    null,
    null
  );
}

export async function approvalNotification({ artTitle }) {
  const artPiece = getArtPieceByTitle({ title: artTitle });
  const buyer = getUserById(artPiece.buyerId);
  // console.log(artPiece);
  const query = `
    INSERT INTO notifications (type, description, from_user, to_user, artTitle, e1, e2, e3)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;
  db.prepare(query).run(
    "Approval",
    `Payment of $${artPiece.price} for artPiece: ${artPiece.title} is done By ${buyer.name}`,
    artPiece.buyerId,
    artPiece.artistId,
    artPiece.title,
    null,
    null,
    null
  );
}

export async function deleteNotification({ artTitle }) {
  console.log("here-to-delete");
  const query = `
    DELETE FROM notifications
    WHERE artTitle = ?;
  `;
  db.prepare(query).run(artTitle);
}
