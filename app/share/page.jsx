import ShareForm from "@/components/forms/ShareForm";
import { verifyAuth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/sessions";
import { redirect } from "next/navigation";
import React from "react";

export default async function SharePage() {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  const currentUser = getCurrentUser();

  return <ShareForm user={currentUser} />;
}
