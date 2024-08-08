import NotFoundPage from "@/components/NotFoundPage";
import Stepper from "@/components/payment/Stepper";
import { checkArtPieceExits, getArtPieceByTitle } from "@/lib/artPieces";
import { convertedUrlBack } from "@/lib/url";
import { getCurrentUser } from "@/lib/users";
import { getUserById } from "@/lib/users";
import { redirect } from "next/navigation";
import React from "react";

const ArtPiecePage = async ({ params }) => {
  const { artPiece } = params;
  const currentUser = await getCurrentUser();
  if (currentUser === undefined) {
    redirect("/sign-in");
  }
  // const checkExists = checkArtPieceExits(artPiece);
  // if (!checkExists) {
  //   return <NotFoundPage url={"/arts"} />;
  // }
  // const artPieceData = getArtPieceByTitle({ title: artPiece });
  // if (artPieceData.paymentStatus === 0) {
  //   redirect(`/arts/${artPiece}`);
  // }
  const artPieceData = await getArtPieceByTitle(convertedUrlBack(artPiece));

  const buyer = await getUserById(artPieceData.buyerId);
  if (buyer.id !== currentUser.id && artPieceData.artistId !== currentUser.id) {
    redirect(`/arts/${artPiece}`);
  }

  return (
    <div className="p-4">
      <div className="mx-auto flex flex-col lg:flex-row justify-evenly text-2xl mb-4 border-2 h-20 items-center border-gray-400 rounded-3xl">
        <p className="font-serif text-2xl text-wrap">Payment Gateway &nbsp;</p>
        <p className="font-serif text-2xl"> Art Piece: {artPieceData.title}</p>
      </div>
      <div className="mt-20 flex flex-col gap-10 h-screen items-center">
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
