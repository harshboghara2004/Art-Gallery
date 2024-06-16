import React, { Suspense } from "react";
import { convertedUrl } from "@/lib/database";
import Image from "next/image";
import locationPin from "@/public/assets/location-pin.svg";
import TagsGrid from "@/components/arts/TagsGrid";
import ReviewsGrid from "@/components/arts/ReviewsGrid";
import LoadingData from "@/components/LoadingData";
import Link from "next/link";
import { getArtPieceByTitle } from "@/lib/artPieces";
import { getCurrentUser } from "@/lib/sessions";
import PaymentButton from "@/components/arts/PaymentButton";
import { getUserById } from "@/lib/users";

const ArtPiecePage = async ({ params }) => {
  const { artPiece } = params;
  const artPieceData = getArtPieceByTitle({ title: artPiece });
  const currentUser = getCurrentUser();
  let buyer;

  if (artPieceData.buyerId !== null) {
    buyer = getUserById(artPieceData.buyerId);
  }
  // console.log(artPieceData);
  // console.log(currentUser);
  return (
    <Suspense fallback={<LoadingData data="Art Piece" />}>
      <div className="pt-6">
        {/* Image gallery */}
        <div className="m-auto h-1/2 flex flex-col md:flex-row lg:border-gray-200">
          <div className="m-auto">
            <Image
              src={artPieceData.image}
              alt={artPieceData.title}
              width={500}
              height={500}
              // fill
              className="rounded-lg w_full h-full object-cover object-center"
            />
          </div>
          <div className="m-auto p-10 border-2 rounded-2xl">
            {/* Artist */}
            <Link href={convertedUrl(`/profile/${artPieceData.artist.name}`)}>
              <Image
                src={artPieceData.artist.profilePhoto}
                width={150}
                height={100}
                alt="artist-profile-photo"
                className="px-4 ml-4 rounded-3xl"
              />
              <p className="my-4 text-sm font-medium">
                <span className="italic">Designed by:</span>{" "}
                {artPieceData.artist.name}
              </p>
            </Link>
            {/* YearCreated */}
            <p className="my-4 text-sm font-medium">
              <span className="italic">Year of Creation:</span>{" "}
              {artPieceData.yearCreated}
            </p>
          </div>
          <div className="m-auto p-10 border-2 rounded-2xl">
            {/* Price */}
            <p className="text-3xl mb-4 tracking-tight text-gray-900">
              Price: $ {artPieceData.price}
            </p>
            {/* Buy */}
            {artPieceData.buyerId === null ? (
              currentUser && artPieceData.artistId !== currentUser.id ? (
                <PaymentButton artPiece={artPieceData} />
              ) : (
                <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  {currentUser ? "You are Owner" : "Not Available"}
                </div>
              )
            ) : artPieceData.paymentStatus < 4 ? (
              (currentUser && artPieceData.buyerId === currentUser.id) ||
              (currentUser && artPieceData.artistId === currentUser.id) ? (
                <Link
                  href={`/arts/${artPiece}/payment`}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Check Status
                </Link>
              ) : (
                <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  Not Available.
                </div>
              )
            ) : (
              <div className="flex text-wrap w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Sold Out to {buyer.name}
              </div>
            )}
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          {/* Title */}
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 lg:flex justify-start">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {artPieceData.title}
            </h1>
          </div>

          {/* Reviews */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            {artPieceData.reviews && (
              <ReviewsGrid
                reviews={artPieceData.reviews}
                title={artPieceData.title}
                currentUserId={currentUser && currentUser.id}
              />
            )}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {artPieceData.description}
                </p>
              </div>
            </div>

            {currentUser && artPieceData.artist.id === currentUser.id && (
              <div className="flex justify-center gap-x-4">
                {/* Edit Button */}
                <Link
                  href={`/arts/${artPiece}/edit`}
                  className="inline-flex items-center rounded-md bg-blue-50 px-4 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10"
                >
                  <svg
                    className="-ml-0.5 mr-1.5 h-5 w-5 text-blue-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                  </svg>
                  Edit
                </Link>

                {/* Delete Button */}
                <Link
                  href={`/arts/${artPiece}/delete`}
                  className="rounded-md bg-pink-50 px-4 py-2 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10"
                >
                  Delete
                </Link>
              </div>
            )}

            {/* Details */}
            <div className="mt-10">
              <h2 className="text-lg font-bold text-gray-900">Details</h2>
              <p className="text-sm mt-2">
                {" "}
                <span className="font-medium">Medium: </span>
                {artPieceData.medium}
              </p>
              <div className="flex mt-1">
                <span className="font-medium">
                  {" "}
                  <Image
                    src={locationPin}
                    alt="location"
                    width={15}
                    height={15}
                  />
                </span>
                <p className="text-sm ml-2">{`${artPieceData.gallery}${
                  artPieceData.gallery && ","
                } ${artPieceData.city}${artPieceData.city && ","} ${
                  artPieceData.country
                }`}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-10">
              <h2 className="text-lg font-bold text-gray-900">Tags</h2>
              <TagsGrid
                access={currentUser && currentUser.id == artPieceData.artistId}
                tags={artPieceData.tags}
                title={artPieceData.title}
                isInArtPiecePage={true}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ArtPiecePage;
