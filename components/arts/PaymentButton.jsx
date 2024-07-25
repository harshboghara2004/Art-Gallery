"use client";

import React from "react";
import { initiatePayment } from "@/actions/payment-actions";
import { initiatePaymentNotificationAction } from "@/actions/notification-actions";

const PaymentButton = ({ artPiece, currentUserId }) => {
  // console.log(artPiece);

  const handlePaymentButton = async () => {
    await initiatePayment(artPiece.title);
    await initiatePaymentNotificationAction({
      artTitle: artPiece.title,
      from_user: artPiece.artistId,
      to_user: currentUserId,
    });
  };

  return (
    <button
      onClick={handlePaymentButton}
      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Available for Sale
    </button>
  );
};

export default PaymentButton;
