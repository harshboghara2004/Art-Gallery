import ArtPiece from "@/components/arts/ArtPiece";
import ReviewForm from "@/components/forms/ReviewForm";
import { checkArtPieceExists, getArtPieceByTitle } from "@/lib/artPieces";
import React from "react";

import Image from "next/image";
import logoImg from "@/public/assets/icon.png";
import { getCurrentUser } from "@/lib/users";
import NotFoundPage from "@/components/NotFoundPage";
import { redirect } from "next/navigation";
import { convertedUrlBack } from "@/lib/url";

const ReviewPage = async ({ params }) => {
  const currentUser = await getCurrentUser();
  if (currentUser === undefined) {
    redirect("/login");
  }
  const { artPiece } = params;
  // const checkExists = checkArtPieceExists(artPiece);
  // if (!checkExists) {
  //   return <NotFoundPage url={"/arts"} />;
  // }
  const artPieceData = await getArtPieceByTitle(convertedUrlBack(artPiece));
  return (
    <>
      <div className="mt-10 flex flex-col">
        <div className="flex sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-4 h-10 w-auto rounded-xl"
            src={logoImg}
            width={200}
            height={200}
            alt="Art Gallery Logo"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Review an Art
          </h2>
        </div>
        <p className="mt-1 mx-auto text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <div className="flex gap-x-10 flex-col lg:flex-row lg:justify-evenly">
        <div className="m-4">
          <ArtPiece access={false} art={artPieceData} isInArtsPage={false} />
        </div>
        <ReviewForm artTitle={artPieceData.title} />
      </div>
    </>
  );
};

export default ReviewPage;
