import { deleteArt } from "@/lib/artPieces";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const { title } = await request.json();
  // console.log(title);
  try {
    const deletedArtPiece = await deleteArt(title);
    // revalidateTag("arts");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const revalidationResponse = await fetch(
      `${siteUrl}/api/revalidate?path=/arts`,
      {
        method: "POST",
      }
    );

    if (!revalidationResponse.ok) {
      throw new Error("Revalidation request failed");
    }

    return NextResponse.json(
      { message: "Art piece deleted", deletedArtPiece },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete art piece" },
      { status: 500 }
    );
  }
}
