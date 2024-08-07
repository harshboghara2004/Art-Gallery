import React from "react";
import MainHeaderClient from "./MainHeaderClient";
import { currentUser } from "@clerk/nextjs/server";
import { checkUserExists, createUser } from "@/lib/users";
import { redirect } from "next/navigation";

const MainHeader = async () => {
  const user = await currentUser();

  let userData;
  if (user) {
    userData = {
      name: `${user.firstName} ${user.lastName}`,
      gender: "Not Specified",
      email: user.emailAddresses[0].emailAddress,
      country: "Not Specified",
      bio: "Not Specified",
      photoUrl: user.imageUrl,
    };
  }

  return <MainHeaderClient user={userData} />;
};

export default MainHeader;
