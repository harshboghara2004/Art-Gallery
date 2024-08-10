import EditArtForm from "@/components/forms/EditArtForm";
import NotFoundPage from "@/components/NotFoundPage";
import { getArtPieceByTitle } from "@/lib/artPieces";
import { convertedUrlBack } from "@/lib/url";
import { getCurrentUser } from "@/lib/users";
import { redirect } from "next/navigation";
import React from "react";

const EditArtPage = async ({ params }) => {
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

  // check access
  const access = currentUser.id === artPieceData.artistId;
  if (!access) {
    redirect(`/arts/${artPiece}`);
  }

  return <EditArtForm artPiece={artPieceData} />;
};

export default EditArtPage;
