import ArtsGrid from "@/components/arts/ArtsGrid";
import LoadingData from "@/components/LoadingData";
import React, { Suspense } from "react";

async function Arts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/arts`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: process.env.API_SECRET_KEY,
    },
    next: {
      tags: ["arts"],
    },
  });

  const { data } = await response.json();
  return <ArtsGrid arts={data} isInArtsPage={true} />;
}

const ArtsPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <Suspense fallback={<LoadingData data="arts" />}>
        <Arts />
      </Suspense>
    </div>
  );
};

export default ArtsPage;
