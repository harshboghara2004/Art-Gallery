import prisma from "./prisma"; // Ensure correct path for Prisma Client instance
import { getCurrentUser } from "./users"; // Adjust path if needed

// Start Payment
export async function startPayment(title) {
  const currentUser = getCurrentUser();

  const updatedArtPiece = await prisma.artPiece.update({
    where: { title },
    data: {
      buyerId: currentUser.id,
      paymentStatus: 2, // Assuming 2 indicates payment started
    },
  });

  console.log(updatedArtPiece);
  return updatedArtPiece;
}

// Mark Payment as Done from Buyer
export async function paymentDoneFromBuyer(title) {
  const updatedArtPiece = await prisma.artPiece.update({
    where: { title },
    data: {
      paymentStatus: 3, // Assuming 3 indicates payment done
    },
  });

  console.log(updatedArtPiece);
  return updatedArtPiece;
}

// Approval from Artist
export async function approvalFromArtist(title) {
  const updatedArtPiece = await prisma.artPiece.update({
    where: { title },
    data: {
      paymentStatus: 5, // Assuming 5 indicates payment approved by artist
    },
  });

  console.log(updatedArtPiece);
  return updatedArtPiece;
}

// Cancel Payment
export async function cancelPayment(title) {
  const updatedArtPiece = await prisma.artPiece.update({
    where: { title },
    data: {
      buyerId: null,
      paymentStatus: 0, // Assuming 0 indicates payment cancelled
    },
  });

  console.log(updatedArtPiece);
  return updatedArtPiece;
}
