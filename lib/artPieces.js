import prisma from "./prisma"; // Ensure correct path for Prisma Client instance
import { getCurrentUser } from "./sessions"; // Adjust path if needed
import { getUserById } from "./users"; // Adjust path if needed

// Check if an Art Piece Exists
export async function checkArtPieceExists(title) {
  // console.log(title);
  const count = await prisma.artPiece.count({
    where: { title },
  });
  return count > 0;
}

// Get All Art Pieces
export async function getAllArtPieces() {
  const artPieces = await prisma.artPiece.findMany({
    include: {
      tags: true,
      artist: true,
    },
  });

  return artPieces.map((art) => ({
    ...art,
    tags: art.tags.map((tag) => tag.tag),
  }));
}

// Get All Art Pieces by User ID
export async function getAllArtsByUserId(userId) {
  const artPieces = await prisma.artPiece.findMany({
    where: { artistId: userId },
    include: {
      tags: true,
      artist: true,
    },
  });

  return artPieces.map((art) => ({
    ...art,
    tags: art.tags.map((tag) => tag.tag),
  }));
}

// Get Art Piece by Title
export async function getArtPieceByTitle(title) {
  // console.log(title);
  const artPiece = await prisma.artPiece.findUnique({
    where: { title },
    include: {
      tags: true,
      reviews: {
        include: {
          user: true,
        },
      },
      artist: true,
    },
  });

  if (!artPiece) return null;

  return {
    ...artPiece,
    tags: artPiece.tags.map((tag) => tag.tag),
    reviews: artPiece.reviews.map((review) => ({
      ...review,
      user: getUserById(review.userId),
    })),
  };
}

// Save New Art Piece
export async function saveArtPiece(artPiece) {
  const currentUser = getCurrentUser();

  const newArtPiece = await prisma.artPiece.create({
    data: {
      title: artPiece.title,
      artistId: currentUser.id,
      yearCreated: "2024",
      medium: artPiece.medium,
      description: artPiece.description,
      imageUrl: artPiece.imageUrl,
      gallery: artPiece.gallery,
      city: artPiece.city,
      country: artPiece.country,
      price: artPiece.price,
      buyerId: null,
      paymentStatus: 0,
    },
  });

  return newArtPiece;
}

// Update Existing Art Piece
export async function updateArtPiece(artPiece) {
  const updatedArtPiece = await prisma.artPiece.update({
    where: { title: artPiece.title },
    data: {
      medium: artPiece.medium,
      description: artPiece.description,
      gallery: artPiece.gallery,
      city: artPiece.city,
      country: artPiece.country,
      price: artPiece.price,
    },
  });

  return updatedArtPiece;
}

// Update Art Piece Image URL
export async function updateArtPieceImageUrl(newUrl, title) {
  const updatedArtPiece = await prisma.artPiece.update({
    where: { title },
    data: { imageUrl: newUrl },
  });

  return updatedArtPiece;
}

// Delete Art Piece
export async function deleteArtPiece(title) {
  await prisma.review.deleteMany({
    where: { artTitle: title },
  });

  await prisma.tag.deleteMany({
    where: { artTitle: title },
  });

  await prisma.artPiece.delete({
    where: { title },
  });
}
