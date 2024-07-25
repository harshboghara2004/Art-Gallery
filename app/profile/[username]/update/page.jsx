import React from "react";
import {
  checkUserExits,
  getFirstAndLastName,
  getUserByName,
} from "@/lib/users";
import { verifyAccessOfUpdateUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import UpdateForm from "@/components/forms/UpdateForm";
import { getCurrentUser } from "@/lib/sessions";
import NotFoundPage from "@/components/NotFoundPage";

const UpdateProfilePage = async ({ params }) => {
  const { username } = params;
  let convertedUsername = username.replace(/-/g, " ");

  const currentUser = getCurrentUser();
  if (currentUser === undefined) {
    return redirect("/login");
  }

  const checkExists = checkUserExits(convertedUsername);
  if (!checkExists) {
    return <NotFoundPage url={"/profile"} />;
  }

  const checkAccess = await verifyAccessOfUpdateUser(convertedUsername);
  if (!checkAccess) {
    redirect(`/profile/${username}`);
  }

  let user = getUserByName(convertedUsername);
  let [firstName, lastName] = getFirstAndLastName(convertedUsername);
  user = { ...user, firstName, lastName };
  return <UpdateForm user={user} />;
};

export default UpdateProfilePage;
