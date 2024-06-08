import db, { convertedUrl } from "./database";
import { getUserById } from "./users";
import fs from "node:fs";

export function getAllArtPieces() {
  const artPiecesQuery = `
        SELECT 
          artPieces.title,
          artPieces.artistId,
          artPieces.yearCreated,
          artPieces.medium,
          artPieces.description,
          artPieces.image,
          artPieces.gallery,
          artPieces.city,
          artPieces.country,
          artPieces.price,
          artPieces.availability
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
      artPieces.image,
      artPieces.gallery,
      artPieces.city,
      artPieces.country,
      artPieces.price,
      artPieces.availability
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
          artPieces.image,
          artPieces.gallery,
          artPieces.city,
          artPieces.country,
          artPieces.price,
          artPieces.availability
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
  if (artPiece.image.size > 0) {
    const extenstion = artPiece.image.name.split(".").pop();
    const fileName = `${convertedUrl(artPiece.title)}.${extenstion}`;

    const stream = fs.createWriteStream(`public/assets/art_pieces/${fileName}`);
    const bufferedImage = await artPiece.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error("Saving Image Failed!");
      }
    });
    artPiece.image = `/assets/art_pieces/${fileName}`;
    // user.image = user.oldProfilePhoto;
  } else {
    artPiece.image = "/assets/default.png";
  }

  // console.log(artPiece);
  const query = `INSERT INTO artPieces (title, artistId, yearCreated, medium, description, image, gallery, city, country, price, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const id = db
    .prepare(query)
    .run(
      artPiece.title,
      artPiece.artist.id,
      "2024",
      artPiece.medium,
      artPiece.description,
      artPiece.image,
      artPiece.gallery,
      artPiece.city,
      artPiece.country,
      artPiece.price,
      "For Sale"
    );

  console.log(id);
}

export async function updateArtPiece(artPiece) {
  // console.log(artPiece);
  const query = `
    UPDATE ArtPieces
    SET title = ?, medium = ?, description = ?, image = ?, gallery = ?, city = ?, country = ?, price = ?
    WHERE title = ?
`;

  const id = db
    .prepare(query)
    .run(
      artPiece.title,
      artPiece.medium,
      artPiece.description,
      artPiece.image,
      artPiece.gallery,
      artPiece.city,
      artPiece.country,
      artPiece.price,
      artPiece.title
    );
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
