import ArtPiece from "@/components/arts/ArtPiece";
import DeleteArtForm from "@/components/forms/DeleteArtForm";
import NotFoundPage from "@/components/NotFoundPage";
import {  getArtPieceByTitle } from "@/lib/artPieces";
import { convertedUrlBack } from "@/lib/url";
import { getCurrentUser } from "@/lib/users";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const DeleteArtPage = async ({ params }) => {
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
    <div className="m-auto mt-10 flex gap-x-10 flex-col lg:flex-row">
      <div className="p-10">
        <ArtPiece access={false} art={artPieceData} isInArtsPage={false} />
      </div>
      <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
        <p className="font-serif mt-20 text-lg px-10">
          Are you sure you want to delete your art? All of your data will be
          permanently removed.<b> This action cannot be undone.</b>
        </p>
        <div className="flex flex-row gap-x-4 mt-10 px-4 py-3 sm:px-6">
          <DeleteArtForm title={artPieceData.title} url={artPieceData.imageUrl} />
          <Link
            href={`/arts/${artPiece}`}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            data-autofocus
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteArtPage;
