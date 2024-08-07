import ShareForm from "@/components/forms/ShareForm";
import { currentUser } from "@clerk/nextjs/dist/types/server";
import React from "react";

export default async function SharePage() {
  // const checkAccess = await verifyAuth();

  // if (!checkAccess.user) {
  //   return redirect("/");
  // }

  const currentUse = await currentUser();


  return <ShareForm user={currentUse.name} />;
}
