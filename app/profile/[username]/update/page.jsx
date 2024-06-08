import React from "react";
import { getFirstAndLastName, getUserByName } from "@/lib/users";
import UpdateForm from "@/components/forms/UpdateForm";
import { verifyAccessOfUpdateUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const UpdateProfilePage = async ({ params }) => {
  const { username } = params;
  let convertedUsername = username.replace(/-/g, " ");
  const checkAccess = await verifyAccessOfUpdateUser(convertedUsername);
  if (!checkAccess) {
    redirect("/artists");
  }
  let user = getUserByName(convertedUsername);
  let [firstName, lastName] = getFirstAndLastName(convertedUsername);
  user = { ...user, firstName, lastName };
  return <UpdateForm user={user} />;
};

export default UpdateProfilePage;
