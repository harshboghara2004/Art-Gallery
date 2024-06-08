import { convertedUrl } from "@/lib/database";
import { getCurrentUser } from "@/lib/sessions";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  let user = getCurrentUser();
  redirect(convertedUrl(`/profile/${user.name}`));
  return <div>ProfilePage of Current User</div>;
};

export default ProfilePage;
