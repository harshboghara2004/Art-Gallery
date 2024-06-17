"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const convertedUrl = (url) => {
  return url.replace(/ /g, "-");
};

export default function PaymentDetails() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session_id) {
      fetch(`/api/payment-details?session_id=${session_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.API_SECRET_KEY,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setPaymentDetails(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [session_id]);
  // console.log(paymentDetails);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
      <div className="flex justify-evenly relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <div className="sm:max-w-lg">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {paymentDetails.metadata.title}
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Your request to buy an art is sent to the artist.
          </p>
          <p className="mt-2 text-xl text-gray-500">
            artist's details:{" "}
            <Link
              href={convertedUrl(
                `/profile/${paymentDetails.metadata.artistName}`
              )}
              className="font-medium text-black"
            >
              {paymentDetails.metadata.artistName}
            </Link>
          </p>
          <Link
            href={convertedUrl(
              `/arts/${paymentDetails.metadata.title}/payment`
            )}
            className="inline-block rounded-md mt-10 border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
          >
            Check status
          </Link>
        </div>
        <div>
          <Image
            src={paymentDetails.metadata.imageUrl}
            width={500}
            height={400}
            // fill
            alt={paymentDetails.metadata.title}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
