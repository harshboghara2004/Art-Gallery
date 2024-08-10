import React from "react";
import {
  checkUserExists,
  getFirstAndLastName,
  getUserByName,
  getUserByUsername,
} from "@/lib/users";
import { redirect } from "next/navigation";
// import UpdateForm from "@/components/forms/UpdateForm";
import { getCurrentUser } from "@/lib/users";
import NotFoundPage from "@/components/NotFoundPage";
import UpdateForm from "@/components/forms/UpdateForm";

const UpdateProfilePage = async ({ params }) => {
  // check login
  const currentUser = await getCurrentUser();
  if (currentUser === undefined) {
    redirect("/sign-in");
  }

  // check user exits
  const { username } = params;
  const user = await getUserByUsername(username);
  if (user === null) {
    redirect("/");
  }

  // check access
  const access = currentUser.id === user.id;
  if (!access) {
    redirect(`/profile/${username}`);
  }
  return <UpdateForm user={user} />;
};

export default UpdateProfilePage;
