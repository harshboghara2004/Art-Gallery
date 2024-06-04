import React from "react";
import MainHeaderClient from "./MainHeaderClient";
import { getCurrentUser } from "@/lib/sessions";

const MainHeader = () => {
  let currentUser = getCurrentUser();

  return <MainHeaderClient user={currentUser} />;
};

export default MainHeader;
