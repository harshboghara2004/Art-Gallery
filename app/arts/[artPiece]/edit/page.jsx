import EditArtForm from "@/components/forms/EditArtForm";
import { getArtPieceByTitle } from "@/lib/artPieces";
import { verifyAccessOfArtPiece } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const EditArtPage = async ({ params }) => {
  const { artPiece } = params;
  const checkAccess = await verifyAccessOfArtPiece(artPiece);
  if (!checkAccess) {
    redirect(`/arts/${artPiece}`);
  }
  const artPieceData = getArtPieceByTitle({ title: artPiece });
  return <EditArtForm artPiece={artPieceData} />;
};

export default EditArtPage;
