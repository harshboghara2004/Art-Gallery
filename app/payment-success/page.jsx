import { paymentFromBuyer } from "@/actions/payment-actions";
import PaymentDetails from "@/components/payment/PaymentDetails";
import React from "react";

const PaymentSuccessPage = async ({ searchParams }) => {
  const { title } = searchParams;
  await paymentFromBuyer(title);
  return <PaymentDetails />;
};

export default PaymentSuccessPage;
