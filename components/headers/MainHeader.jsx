import React from "react";
import MainHeaderClient from "./MainHeaderClient";
import { getCurrentUser } from "@/lib/users";

const MainHeader = async () => {
  const user = await getCurrentUser();
  return <MainHeaderClient user={user} />;
};

export default MainHeader;
