import { getAllArtPieces } from "@/lib/artPieces";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const arts = getAllArtPieces();
    return NextResponse.json({ data: arts }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete art piece" },
      { status: 500 }
    );
  }
}
