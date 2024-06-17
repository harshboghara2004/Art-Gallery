import { getCurrentUser } from "@/lib/sessions";
import { redirect } from "next/navigation";
import React from "react";
import RegisterForm from "@/components/forms/RegisterForm";

const RegisterPage = () => {
  const currentUser = getCurrentUser();
  if (currentUser !== undefined) {
    redirect("/");
  }
  return <RegisterForm />;
};

export default RegisterPage;
