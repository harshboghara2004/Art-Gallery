import { paymentFromBuyer } from "@/actions/payment-actions";
import PaymentDetails from "@/components/payment/PaymentDetails";
import { convertedUrlBack } from "@/lib/url";
import React from "react";

const PaymentSuccessPage = async ({ searchParams }) => {
  const { title } = searchParams;
  await paymentFromBuyer(title);
  return <PaymentDetails />;
  d;
};

export default PaymentSuccessPage;
