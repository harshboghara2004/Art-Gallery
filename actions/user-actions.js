"use server";
import { getCurrentUser, updateUser, updateUserPhoto } from "@/lib/users";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfileDetails({ data }) {
  const currentUser = await getCurrentUser();
  const user = {
    name: `${data["first-name"]} ${data["last-name"]}`,
    gender: data.gender,
    country: data.country,
    bio: data.about,
  };
  // console.log(user);
  await updateUser(currentUser.id, user);
  console.log("update-successfully");
  revalidatePath("/profile");
  redirect(`/profile/${currentUser.username}`);
}

export async function updateProfilePhoto(currentUserId, username, newUrl) {
  await updateUserPhoto(newUrl, currentUserId);
  console.log("update-successfully");
  revalidatePath("/profile");
  redirect(`/profile/${username}`);
}
