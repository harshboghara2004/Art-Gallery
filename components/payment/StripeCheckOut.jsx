import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  cancelPaymentAction,
  paymentFromBuyer,
} from "@/actions/payment-actions";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const StripeCheckOut = ({ artPiece }) => {
  const handleCheckOut = async () => {
    // console.log("payment");

    const stripe = await stripePromise;

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ artPiece }),
    });

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error("Stripe checkout error:", error);
    }
    console.log("success");
    await paymentFromBuyer(artPiece.title);
  };

  const handleCancel = async () => {
    // console.log("cancel");
    await cancelPaymentAction(artPiece.title);
  };

  return (
    <div className="flex gap-x-4">
      <button
        onClick={handleCheckOut}
        className="flex  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Pay $ {artPiece.price}
      </button>
      <button
        onClick={handleCancel}
        className="flex  items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Cancel
      </button>
    </div>
  );
};

export default StripeCheckOut;
