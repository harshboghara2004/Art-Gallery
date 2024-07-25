import {
  approvalNotificationAction,
  cancelPaymentNotificationAction,
} from "@/actions/notification-actions";
import { paymentFromBuyer } from "@/actions/payment-actions";
import PaymentDetails from "@/components/payment/PaymentDetails";
import { convertedUrlBack } from "@/lib/database";
import React from "react";

const PaymentSuccessPage = async ({ searchParams }) => {
  const { title } = searchParams;
  await paymentFromBuyer(title);
  await cancelPaymentNotificationAction({
    artTitle: convertedUrlBack(title),
    newPath: false,
  });
  await approvalNotificationAction({ artTitle: convertedUrlBack(title) });
  return <PaymentDetails />;
  d;
};

export default PaymentSuccessPage;
