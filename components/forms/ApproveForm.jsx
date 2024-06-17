"use client";
import {
  approvalActionByArtist,
  cancelPaymentAction,
} from "@/actions/payment-actions";
import React from "react";

const ApproveForm = ({ title }) => {
  const handleApprove = async () => {
    console.log("approve");
    await approvalActionByArtist(title);
  };

  const handleDecline = async () => {
    console.log("decline");
    await cancelPaymentAction(title);
  };

  return (
    <div className="flex flex-row gap-x-4 mt-10 ml-4 px-4 py-3 sm:px-6">
      <button
        onClick={handleApprove}
        className="mt-3 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-700 sm:mt-0 sm:w-auto"
        data-autofocus
      >
        Approve
      </button>
      <button
        onClick={handleDecline}
        className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-700 sm:mt-0 sm:w-auto"
        data-autofocus
      >
        Decline
      </button>
    </div>
  );
};

export default ApproveForm;
