import EditArtForm from "@/components/forms/EditArtForm";
import NotFoundPage from "@/components/NotFoundPage";
import { checkArtPieceExits, getArtPieceByTitle } from "@/lib/artPieces";
import { verifyAccessOfArtPiece } from "@/lib/auth";
import { getCurrentUser } from "@/lib/sessions";
import { redirect } from "next/navigation";
import React from "react";

const EditArtPage = async ({ params }) => {
  const currentUser = getCurrentUser();
  if (currentUser === undefined) {
    redirect("/login");
  }
  const { artPiece } = params;
  const checkExists = checkArtPieceExits(artPiece);
  if (!checkExists) {
    return <NotFoundPage url={"/arts"}/>;
  }
  const checkAccess = await verifyAccessOfArtPiece(artPiece);
  if (!checkAccess) {
    redirect(`/arts/${artPiece}`);
  }
  const artPieceData = getArtPieceByTitle({ title: artPiece });
  return <EditArtForm artPiece={artPieceData} />;
};

export default EditArtPage;
