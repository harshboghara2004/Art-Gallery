import ShareForm from "@/components/forms/ShareForm";
import { getCurrentUser } from "@/lib/users";
import { redirect } from "next/navigation";
import React from "react";

export default async function SharePage() {
  // const checkAccess = await verifyAuth();

  // if (!checkAccess.user) {
  //   return redirect("/");
  // }

  const currentUser = await getCurrentUser();

  if (currentUser === undefined) {
    redirect(`/sign-in`);
  }

  return <ShareForm user={currentUse.name} />;
}
