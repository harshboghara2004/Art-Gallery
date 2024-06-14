"use client";

import { approvalActionByArtist } from "@/actions/payment-actions";
import React from "react";

const ApprovalButton = ({ title }) => {
  // console.log(artPiece);

  const handleButton = async () => {
    await approvalActionByArtist(title);
  };

  return (
    <button
      onClick={handleButton}
      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Approve
    </button>
  );
};

export default ApprovalButton;
