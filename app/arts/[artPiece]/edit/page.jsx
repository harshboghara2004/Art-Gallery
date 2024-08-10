import EditArtForm from "@/components/forms/EditArtForm";
import NotFoundPage from "@/components/NotFoundPage";
import { checkArtPieceExists, getArtPieceByTitle } from "@/lib/artPieces";
import { convertedUrlBack } from "@/lib/url";
import { getCurrentUser } from "@/lib/users";
import { redirect } from "next/navigation";
import React from "react";

const EditArtPage = async ({ params }) => {
  const currentUser = await getCurrentUser();
  if (currentUser === undefined) {
    redirect("/sign-in");
  }
  const { artPiece } = params;
  const checkExists = checkArtPieceExists(artPiece);
  if (!checkExists) {
    return <NotFoundPage url={"/arts"} />;
  }
  // const checkAccess = await verifyAccessOfArtPiece(artPiece);
  // if (!checkAccess) {
  //   redirect(`/arts/${artPiece}`);
  // }
  const artPieceData = await getArtPieceByTitle(convertedUrlBack(artPiece));
  return <EditArtForm artPiece={artPieceData} />;
};

export default EditArtPage;
