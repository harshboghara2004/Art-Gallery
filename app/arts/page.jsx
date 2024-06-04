import ArtsGrid from "@/components/arts/ArtsGrid";
import LoadingData from "@/components/LoadingData";
import { getAllArtPieces } from "@/lib/artPieces";
import React, { Suspense } from "react";

async function Arts() {
  const arts = await getAllArtPieces();
  // return <p>Hello</p>
  return <ArtsGrid arts={arts} isInArtsPage={true} />;
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
