"use client";

import {
  approvalActionByArtist,
  cancelPaymentAction,
} from "@/actions/payment-actions";
import React from "react";

const ApprovalButton = ({ title }) => {
  // console.log(artPiece);

  const handleButton = async () => {
    await approvalActionByArtist(title);
  };

  const handleCancelButton = async () => {
    await cancelPaymentAction(title);
  };

  return (
    <div className="flex gap-x-4">
      <button
        onClick={handleButton}
        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Approve
      </button>
      <button
        onClick={handleCancelButton}
        className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Cancel
      </button>
    </div>
  );
};

export default ApprovalButton;
