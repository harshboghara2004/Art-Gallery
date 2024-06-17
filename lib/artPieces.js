import db, { convertedUrlBack } from "./database";
import { getCurrentUser } from "./sessions";
import { getUserById } from "./users";
export function checkArtPieceExits(artPiece) {
  const title = convertedUrlBack(artPiece);
  const query = `
    SELECT COUNT(*)
    FROM ArtPieces
    WHERE title = ?
  `;
  const res = db.prepare(query).get(title);
  const count = res["COUNT(*)"];
  return count > 0;
}
export function getAllArtPieces() {
  const artPiecesQuery = `
        SELECT 
          artPieces.title,
          artPieces.artistId,
          artPieces.yearCreated,
          artPieces.medium,
          artPieces.description,
          artPieces.imageUrl,
          artPieces.gallery,
          artPieces.city,
          artPieces.country,
          artPieces.price,
          artPieces.buyerId,
          artPieces.paymentStatus
        FROM 
          artPieces
      `;

  const tagQuery = `
    SELECT * FROM tags 
    WHERE artTitle = ?
  `;

  let data = db.prepare(artPiecesQuery).all();
  // console.log(data);
  let result = [];
  data.forEach((art) => {
    let tagsData = db.prepare(tagQuery).all(art.title);
    let tags = [];
    tagsData.map((tag) => {
      tags.push(tag.tag);
    });
    result.push({ ...art, tags: tags, artist: getUserById(art.artistId) });
  });

  // console.log(result);
  return result;
}

export function getAllArtsByUserId(Id) {
  const query = `
    SELECT 
      artPieces.title,
      artPieces.artistId,
      artPieces.yearCreated,
      artPieces.medium,
      artPieces.description,
      artPieces.imageUrl,
      artPieces.gallery,
      artPieces.city,
      artPieces.country,
      artPieces.price,
      artPieces.buyerId,
      artPieces.paymentStatus
    FROM 
      artPieces
    WHERE
      artPieces.artistId = ?
`;

  const tagQuery = `
    SELECT * FROM tags 
    WHERE artTitle = ?
`;

  let data = db.prepare(query).all(Id);
  if (data.length == 0) return [];

  if (data[0].title === null) {
    return [];
  }

  let artPieces = [];

  data.forEach((artPiece) => {
    let tagsData = db.prepare(tagQuery).all(artPiece.title);
    let tags = [];
    tagsData.map((tag) => {
      tags.push(tag.tag);
    });
    artPieces.push({
      ...artPiece,
      tags: tags,
      artist: getUserById(artPiece.artistId),
    });
  });

  return artPieces;
}

export function getArtPieceByTitle({ title }) {
  let titleToFind = title.replace(/-/g, " ");

  const query = `
        SELECT 
          artPieces.title,
          artPieces.artistId,
          artPieces.yearCreated,
          artPieces.medium,
          artPieces.description,
          artPieces.imageUrl,
          artPieces.gallery,
          artPieces.city,
          artPieces.country,
          artPieces.price,
          artPieces.buyerId,
          artPieces.paymentStatus
        FROM 
          artPieces
        WHERE
          artPieces.title = ?
      `;

  const tagQuery = `
      SELECT * FROM tags 
      WHERE artTitle = ?
    `;

  const reviewQuery = `
    SELECT * FROM reviews 
    WHERE artTitle = ?
  `;

  let data = db.prepare(query).get(titleToFind);
  let artist = getUserById(data.artistId);
  let tagData = db.prepare(tagQuery).all(titleToFind);
  let tags = [];
  tagData.forEach((tag) => {
    tags.push(tag.tag);
  });

  let reviewsData = db.prepare(reviewQuery).all(titleToFind);
  let reviews = [];
  reviewsData.forEach((review) => {
    reviews.push({ ...review, user: getUserById(review.userId) });
  });

  let artPiece = {
    ...data,
    reviews,
    artist: artist,
    tags: tags,
  };
  // console.log(artPiece);

  return artPiece;
}

export async function saveArtPiece(artPiece) {
  const curruntUser = getCurrentUser();
  console.log(artPiece);
  const query = `INSERT INTO artPieces (title, artistId, yearCreated, medium, description, imageUrl, gallery, city, country, price, buyerId, paymentStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const id = db
    .prepare(query)
    .run(
      artPiece.title,
      curruntUser.id,
      "2024",
      artPiece.medium,
      artPiece.description,
      artPiece.imageUrl,
      artPiece.gallery,
      artPiece.city,
      artPiece.country,
      artPiece.price,
      null,
      0
    );

  console.log(id);
}

export async function updateArtPiece(artPiece) {
  // console.log(artPiece);
  const query = `
    UPDATE ArtPieces
    SET title = ?, medium = ?, description = ?, gallery = ?, city = ?, country = ?, price = ?
    WHERE title = ?
`;

  const id = db
    .prepare(query)
    .run(
      artPiece.title,
      artPiece.medium,
      artPiece.description,
      artPiece.gallery,
      artPiece.city,
      artPiece.country,
      artPiece.price,
      artPiece.title
    );
  console.log(id);
}

export async function updateArtPieceImageUrl(newUrl, title) {
  // console.log(artPiece);
  const query = `
    UPDATE ArtPieces
    SET imageUrl = ?
    WHERE title = ?
`;

  const id = db.prepare(query).run(newUrl, title);
  console.log(id);
}

export async function deleteArtPiece(title) {
  const reviewQuery = `
    DELETE FROM Reviews
    WHERE artTitle = ?;
  `;

  db.prepare(reviewQuery).run(title);

  const tagQuery = `
    DELETE FROM Tags
    WHERE artTitle = ?;
  `;

  db.prepare(tagQuery).run(title);

  const query = `
    DELETE FROM ArtPieces
    WHERE title = ?;
  `;
  // console.log(title);
  db.prepare(query).run(title);
}
