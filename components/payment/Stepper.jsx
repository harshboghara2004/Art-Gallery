"use client";

import React, { useState } from "react";
import "./stepper.css";
import { TiTick } from "react-icons/ti";
import StripeCheckOut from "./StripeCheckOut";
import ApprovalButton from "./ApprovalButton";

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
      <div className="flex justify-between">
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
        <p>
          ArtPiece {artPiece.title} Designed By {artPiece.artist.name} Sold to{" "}
          {buyer.name}
        </p>
      )}
    </>
  );
};

export default Stepper;
