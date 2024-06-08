import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");
  console.log(`Revalidation requested for path: ${path}`);

  try {
    // Revalidate the specified path
    console.log("revalidate");
    revalidatePath(path);
    console.log(`Revalidated path: ${path}`);
    return NextResponse.json({ message: "Path revalidated" }, { status: 200 });
  } catch (error) {
    console.error(`Failed to revalidate path: ${path}`, error);
    return NextResponse.json(
      { error: "Failed to revalidate path" },
      { status: 500 }
    );
  }
}
