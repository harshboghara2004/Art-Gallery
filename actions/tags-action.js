"use server";

import { convertedUrl } from "@/lib/database";
import { addTag, deleteTag } from "@/lib/tags";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addTagAction(tag, title) {
  await addTag(tag, title);
  revalidatePath("/arts");
  redirect(convertedUrl(`/arts/${title}`));
}

export async function deleteTagAction(tag, title) {
  // console.log(tag, title);
  await deleteTag(tag, title);
  revalidatePath("/arts");
  redirect(convertedUrl(`/arts/${title}`));
}
