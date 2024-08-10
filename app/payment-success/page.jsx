import { paymentFromBuyer } from "@/actions/payment-actions";
import PaymentDetails from "@/components/payment/PaymentDetails";
import { convertedUrlBack } from "@/lib/url";
import { getCurrentUser } from "@/lib/users";
import { redirect } from "next/navigation";
import React from "react";

const PaymentSuccessPage = async ({ searchParams }) => {
  const currentUser = await getCurrentUser();
  if (currentUser === undefined) {
    redirect(`/sign-in`);
  }

  const { title } = searchParams;
  if (title === undefined) {
    redirect("/");
  }
  await paymentFromBuyer(title);
  return <PaymentDetails />;
};

export default PaymentSuccessPage;
