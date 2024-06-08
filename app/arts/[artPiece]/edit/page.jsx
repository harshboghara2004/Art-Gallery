import EditArtForm from "@/components/forms/EditArtForm";
import { getArtPieceByTitle } from "@/lib/artPieces";
import React from "react";

const page = ({ params }) => {
  const { artPiece } = params;
  const artPieceData = getArtPieceByTitle({ title: artPiece });
  return <EditArtForm artPiece={artPieceData}/>
};

export default page;
