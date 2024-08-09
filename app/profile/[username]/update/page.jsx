import React from "react";
import {
  checkUserExists,
  getFirstAndLastName,
  getUserByName,
} from "@/lib/users";
import { redirect } from "next/navigation";
// import UpdateForm from "@/components/forms/UpdateForm";
import { getCurrentUser } from "@/lib/users";
import NotFoundPage from "@/components/NotFoundPage";

const UpdateProfilePage = async ({ params }) => {
  const { username } = params;
  let convertedUsername = username.replace(/-/g, " ");

  const currentUser = await getCurrentUser();
  if (currentUser === undefined) {
    return redirect("/login");
  }

  // const checkExists = checkUserExits(convertedUsername);
  // if (!checkExists) {
  //   return <NotFoundPage url={"/profile"} />;
  // }

  // const checkAccess = await verifyAccessOfUpdateUser(convertedUsername);
  // if (!checkAccess) {
  //   redirect(`/profile/${username}`);
  // }

  let user = getUserByName(convertedUsername);
  let [firstName, lastName] = getFirstAndLastName(convertedUsername);
  user = { ...user, firstName, lastName };
  return <p>In Development</p>;
  // return <UpdateForm user={user} />;
};

export default UpdateProfilePage;
