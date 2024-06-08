"use server";

import { convertedUrl } from "@/lib/database";
import { addTag } from "@/lib/tags";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addTagAction(tag, title) {
  await addTag(tag, title);
  revalidatePath("/arts");
  redirect(convertedUrl(`/arts/${title}`));
}
