import prisma from "./prisma"; // Ensure correct path for Prisma Client instance

// Add a Tag to an Art Piece
export async function addTag(tag, title) {
  const newTag = await prisma.tag.create({
    data: {
      artTitle: title,
      tag,
    },
  });
  console.log(newTag);
  return newTag;
}

// Delete a Tag from an Art Piece
export async function deleteTag(tag, title) {
  const deletedTag = await prisma.tag.deleteMany({
    where: {
      artTitle: title,
      tag,
    },
  });
  console.log(deletedTag);
  return deletedTag;
}
