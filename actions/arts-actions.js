"use server";

import { deleteArtPiece, saveArtPiece, updateArtPiece } from "@/lib/artPieces";
import { convertedUrl, uploadImage } from "@/lib/database";
import { getCurrentUser } from "@/lib/sessions";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function shareArt(prevState, formData) {
  console.log("here");
  const image = formData.get("image");
  const title = formData.get("title");
  const gallery = formData.get("gallery");
  const city = formData.get("city");
  const country = formData.get("country");
  const price = formData.get("price");
  const medium = formData.get("medium");
  const description = formData.get("description");

  const artPiece = {
    image,
    title,
    gallery: gallery || "",
    city: city || "",
    country,
    price,
    medium: medium || "Not Specified By Artist.",
    description: description || "Not Specified By Artist.",
    artist: getCurrentUser(),
  };

  await saveArtPiece(artPiece);
  revalidateTag("arts");
  redirect("/arts");
}
export async function editArt(prevState, formData) {
  // console.log("here");
  const oldData = prevState;
  const image = formData.get("image");
  const title = formData.get("title");
  const gallery = formData.get("gallery");
  const city = formData.get("city");
  const country = formData.get("country");
  const price = formData.get("price");
  const medium = formData.get("medium");
  const description = formData.get("description");

  const artPiece = oldData.artPiece;
  if (image.size > 0) {
    const newImagePath = await uploadImage({
      title: artPiece.title,
      image: image,
      location: "/art_pieces",
    });
    artPiece.image = newImagePath;
  }
  artPiece.title = title;
  artPiece.gallery = gallery;
  artPiece.city = city;
  artPiece.country = country;
  artPiece.price = price;

  if (description) {
    artPiece.description = description;
  }
  if (medium) {
    artPiece.medium = medium;
  }

  await updateArtPiece(artPiece);
  revalidatePath(convertedUrl(`/arts/${artPiece.title}`));
  redirect(convertedUrl(`/arts/${artPiece.title}`));
}
export async function deleteArt(prevState, formData) {
  const oldData = prevState;
  await deleteArtPiece(oldData.title);
  revalidateTag("arts");
  redirect("/arts");
}
