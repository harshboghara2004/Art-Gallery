import Stepper from "@/components/payment/Stepper";
import { getArtPieceByTitle } from "@/lib/artPieces";
import { getCurrentUser } from "@/lib/sessions";
import { getUserById } from "@/lib/users";
import React from "react";

const ArtPiecePage = ({ params }) => {
  const { artPiece } = params;
  const artPieceData = getArtPieceByTitle({ title: artPiece });
  const buyer = getUserById(artPieceData.buyerId);
  const currentUser = getCurrentUser();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Art Piece: {artPiece}</h1>
      <div className="flex flex-col gap-10 h-screen items-center">
        <Stepper
          currentUser={currentUser}
          buyer={buyer}
          artPiece={artPieceData}
        />
      </div>
    </div>
  );
};

export default ArtPiecePage;
