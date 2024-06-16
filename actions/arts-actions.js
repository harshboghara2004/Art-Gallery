"use server";

import {
  deleteArtPiece,
  saveArtPiece,
  updateArtPiece,
  updateArtPieceImageUrl,
} from "@/lib/artPieces";
import { convertedUrl } from "@/lib/database";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function shareArt({ artData, urls }) {
  // console.log(artData);
  // console.log(urls);

  const artPiece = {
    title: artData.title,
    gallery: artData.gallery,
    city: artData.city,
    price: artData.price,
    country: artData.country,
    medium: artData.medium,
    description: artData.description || "Not Specified By Artist.",
    imageUrl: urls.url,
  };

  await saveArtPiece(artPiece);
  revalidateTag("arts");
  redirect("/arts");
}
export async function editArt({ artData }) {
  const artPiece = {
    title: artData.title,
    gallery: artData.gallery,
    city: artData.city,
    price: artData.price,
    country: artData.country,
    medium: artData.medium,
    description: artData.description,
  };

  await updateArtPiece(artPiece);
  revalidatePath(`/arts`);
  redirect(`/arts`);
}

export async function editArtImage(newImageUrl, title) {
  await updateArtPieceImageUrl(newImageUrl, title);
  revalidatePath(`/arts`);
  redirect(`/arts`);
}

export async function deleteArt(prevState, formData) {
  const oldData = prevState;
  await deleteArtPiece(oldData.title);
  revalidateTag("arts");
  redirect("/arts");
}
