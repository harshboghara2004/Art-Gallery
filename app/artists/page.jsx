import ArtistCard from "@/components/artists/ArtistCard";
import LoadingData from "@/components/LoadingData";
import { getAllUsers } from "@/lib/users";
import React, { Suspense } from "react";

const AristsPage = () => {
  let allArtists = getAllUsers();
  return (
    <Suspense fallback={<LoadingData data="Artists" />}>
      <div className="m-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3 ">
        {allArtists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </Suspense>
  );
};

export default AristsPage;
