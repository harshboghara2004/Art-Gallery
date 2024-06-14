import { redirect } from "next/navigation";
import React from "react";

const PaymentCancelPage = () => {
  console.log("payment-cancel");
  redirect("/");
  return <div>PaymentCancelPage</div>;
};

export default PaymentCancelPage;
