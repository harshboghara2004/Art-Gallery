import ArtPiece from "@/components/arts/ArtPiece";
import { checkArtPieceExists, getArtPieceByTitle } from "@/lib/artPieces";
import { getCurrentUser } from "@/lib/users";
import { getUserById } from "@/lib/users";
import React from "react";
import ApproveForm from "@/components/forms/ApproveForm";
import { convertedUrlBack } from "@/lib/url";
// import NotFoundPage from "@/components/NotFoundPage";

const ApprovePage = async ({ params }) => {
  const currentUser = await getCurrentUser();
  if (currentUser === undefined) {
    redirect("/sign-in");
  }
  const { artPiece } = params;
  // const checkExists = checkArtPieceExits(artPiece);
  // if (!checkExists) {
  //   return <NotFoundPage url={"/arts"} />;
  // }
  // const checkAccess = await verifyAccessOfArtPiece(artPiece);
  // if (!checkAccess) {
  //   redirect(`/arts/${artPiece}`);
  // }
  const art = await getArtPieceByTitle(convertedUrlBack(artPiece));

  if (art.buyerId === null) {
    redirect(`/arts/${artPiece}`);
  }
  const buyer = await getUserById(art.buyerId);

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
        <ApproveForm title={art.title} />
      </div>
    </div>
  );
};

export default ApprovePage;
