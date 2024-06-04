"use server";

import { saveArtPiece } from "@/lib/artPieces";
import { getCurrentUser } from "@/lib/sessions";

export async function shareArt(prevState, formData) {
  // console.log("here");
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

  saveArtPiece(artPiece);

}
