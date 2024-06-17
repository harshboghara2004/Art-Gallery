import NotFoundPage from "@/components/NotFoundPage";
import Stepper from "@/components/payment/Stepper";
import { checkArtPieceExits, getArtPieceByTitle } from "@/lib/artPieces";
import { getCurrentUser } from "@/lib/sessions";
import { getUserById } from "@/lib/users";
import { redirect } from "next/navigation";
import React from "react";

const ArtPiecePage = ({ params }) => {
  const { artPiece } = params;
  const currentUser = getCurrentUser();
  if (currentUser === undefined) {
    redirect("/login");
  }
  const checkExists = checkArtPieceExits(artPiece);
  if (!checkExists) {
    return <NotFoundPage url={"/arts"}/>;
  }
  const artPieceData = getArtPieceByTitle({ title: artPiece });
  if (artPieceData.paymentStatus === 0) {
    redirect(`/arts/${artPiece}`);
  }
  const buyer = getUserById(artPieceData.buyerId);
  if (buyer.id !== currentUser.id && artPieceData.artistId !== currentUser.id) {
    redirect(`/arts/${artPiece}`);
  }

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
