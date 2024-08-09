import React, { Suspense } from "react";
import ArtsGrid from "@/components/arts/ArtsGrid";
import LoadingData from "@/components/LoadingData";
import { getAllArtPieces } from "@/lib/artPieces";

const ArtsPage = async () => {
  const arts = await getAllArtPieces();
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <Suspense fallback={<LoadingData data="arts" />}>
        <ArtsGrid arts={arts} isInArtsPage={true} />
      </Suspense>
    </div>
  );
};

export default ArtsPage;
