import { convertedUrl } from "@/lib/url";
import { getCurrentUser } from "@/lib/sessions";
import { redirect } from "next/navigation";
import React, { use } from "react";

const ProfilePage = () => {
  let user = getCurrentUser();
  if (user === undefined) {
    redirect("/login");
  }
  redirect(convertedUrl(`/profile/${user.name}`));
  return <div>ProfilePage of Current User</div>;
};

export default ProfilePage;
