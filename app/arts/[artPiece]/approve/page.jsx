import ArtPiece from "@/components/arts/ArtPiece";
import { getArtPieceByTitle } from "@/lib/artPieces";
import { getCurrentUser } from "@/lib/users";
import { getUserById } from "@/lib/users";
import React from "react";
import ApproveForm from "@/components/forms/ApproveForm";
import { convertedUrlBack } from "@/lib/url";
import { redirect } from "next/navigation";
// import NotFoundPage from "@/components/NotFoundPage";

const ApprovePage = async ({ params }) => {
  // check login
  const currentUser = await getCurrentUser();
  if (currentUser === undefined) {
    redirect("/sign-in");
  }

  // get art-piece data if exists
  const { artPiece } = params;
  const artPieceData = await getArtPieceByTitle(convertedUrlBack(artPiece));
  if (artPieceData === null) {
    return <NotFoundPage url={"/arts"} />;
  }

  // check payment started or not
  if (artPieceData.buyerId === null) {
    redirect(`/arts/${artPiece}`);
  }
  const buyer = await getUserById(artPieceData.buyerId);

  // check access
  const access = currentUser.id === artPieceData.artistId;
  if (!access) {
    redirect(`/arts/${artPiece}`);
  }

  // check payment status
  if (artPieceData.paymentStatus !== 3) {
    redirect(`/arts/${artPiece}`);
  }

  return (
    <div className="m-auto mt-10 flex gap-x-10 flex-col lg:flex-row">
      <div className="p-10">
        <ArtPiece access={false} art={art} isInArtsPage={false} />
      </div>
      <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
        <p className="font-serif mt-20 text-lg px-10">
          Are you sure you want to sell your art to{" "}
          <span className="font-semibold">{buyer.name}</span> ? After that, You
          will have no right own the art.
          <b> This action cannot be undone.</b>
        </p>
        <ApproveForm title={artPieceData.title} />
      </div>
    </div>
  );
};

export default ApprovePage;
