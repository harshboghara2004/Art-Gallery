import { getCurrentUser } from "@/lib/sessions";
import { redirect } from "next/navigation";
import React from "react";
import LoginForm from "@/components/forms/LoginForm";

const LoginPage = () => {
  const currentUser = getCurrentUser();
  if (currentUser !== undefined) {
    redirect("/");
  }
  return <LoginForm />;
};

export default LoginPage;
