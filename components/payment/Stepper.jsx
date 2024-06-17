"use client";

import React, { useState } from "react";
import "./stepper.css";
import { TiTick } from "react-icons/ti";
import StripeCheckOut from "./StripeCheckOut";
import ApprovalButton from "./ApprovalButton";
import Link from "next/link";

export const convertedUrl = (url) => {
  return url.replace(/ /g, "-");
};

const Stepper = ({ currentUser, buyer, artPiece }) => {
  // console.log(artPiece);
  const steps = [
    "Payment Initiated",
    `Payment By ${buyer.name}`,
    `Approval By ${artPiece.artist.name}`,
    `Sold Out`,
  ];
  const [currentStep, setCurrentStep] = useState(artPiece.paymentStatus);
  const [complete, setComplete] = useState(false);
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between">
        {steps?.map((step, i) => (
          // <div>
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="mt-4 text-black font-medium">{step}</p>
          </div>
          // </div>
        ))}
      </div>
      {currentStep === 2 &&
        (currentUser.id === buyer.id ? (
          <StripeCheckOut artPiece={artPiece} />
        ) : (
          <p>Waiting for payment from {buyer.name}</p>
        ))}
      {currentStep === 3 &&
        (currentUser.id === artPiece.artistId ? (
          <ApprovalButton title={artPiece.title} />
        ) : (
          <p>Waiting for Approval from {artPiece.artist.name}</p>
        ))}
      {currentStep > 4 && (
        <div className="flex flex-col">
          <p>
            ArtPiece {artPiece.title} Designed By {artPiece.artist.name} Sold to{" "}
            {buyer.name}
          </p>
          <Link
            href={convertedUrl(`/arts/${artPiece.title}`)}
            className="mt-8 mx-auto flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Return to ArtPiece{" "}
          </Link>
        </div>
      )}
    </>
  );
};

export default Stepper;
