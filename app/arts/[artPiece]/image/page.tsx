import React from "react";
import { checkArtPieceExits, getArtPieceByTitle } from "@/lib/artPieces";
import { redirect } from "next/navigation";
import UpdateImage from "@/components/forms/UpdateImage";
import Image from "next/image";
import logoImg from "@/public/assets/icon.png";

export default function Page({ params }) {
  const { artPiece } = params;
  const artPieceData = getArtPieceByTitle({ title: artPiece });
  const checkExists = checkArtPieceExits(artPiece);
  if (!checkExists) {
    redirect(`/arts`);
  }
  return (
    <>
      <div className="mt-10 flex flex-col">
        {/* Logo & Text */}
        <div className="flex sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-4 h-10 w-auto rounded-xl"
            src={logoImg}
            width={200}
            height={200}
            alt="Art Gallery Logo"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edit Art Image - {artPieceData.title}
          </h2>
        </div>
        <p className="mt-1 mx-auto text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <UpdateImage title={artPieceData.title} OldUrl={artPieceData.imageUrl} />
    </>
  );
}