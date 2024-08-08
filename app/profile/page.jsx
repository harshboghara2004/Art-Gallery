import React from "react";
import { getCurrentUser } from "@/lib/users";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  let user = await getCurrentUser();
  if (user === undefined) {
    redirect("/sign-in");
  }
  redirect(`/profile/${user.username}`);
  return <div>ProfilePage of Current User</div>;
};

export default ProfilePage;
