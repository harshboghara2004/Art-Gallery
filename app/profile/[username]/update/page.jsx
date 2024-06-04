import React from "react";
import { getFirstAndLastName, getUserByName } from "@/lib/users";
import UpdateForm from "@/components/forms/UpdateForm";

const UpdateProfilePage = ({ params }) => {
  const { username } = params;
  let convertedUsername = username.replace(/-/g, " ");
  let user = getUserByName(convertedUsername);
  let [firstName, lastName] = getFirstAndLastName(convertedUsername);
  user = { ...user, firstName, lastName };
  return <UpdateForm user={user} />;
};

export default UpdateProfilePage;
