import React from "react";
import ArtPiece from "./ArtPiece";
import { getCurrentUser } from "@/lib/sessions";

const ArtsGrid = ({ arts, isInArtsPage }) => {
  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
      {arts.map((art) => (
        <ArtPiece
          access={false}
          key={art.title}
          art={art}
          isInArtsPage={isInArtsPage}
        />
      ))}
    </div>
  );
};

export default ArtsGrid;
