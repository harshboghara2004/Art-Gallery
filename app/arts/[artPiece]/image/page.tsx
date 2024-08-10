import React from "react";
import { getArtPieceByTitle } from "@/lib/artPieces";
import { redirect } from "next/navigation";
import UpdateImage from "@/components/forms/UpdateImage";
import Image from "next/image";
import logoImg from "@/public/assets/icon.png";
import { getCurrentUser } from "@/lib/users";
import NotFoundPage from "@/components/NotFoundPage";
import { convertedUrlBack } from "@/lib/url";

export default async function Page({ params }) {
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
            Edit Art Image of {artPieceData.title}
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
