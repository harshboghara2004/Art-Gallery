import ArtPiece from "@/components/arts/ArtPiece";
import LoadingData from "@/components/LoadingData";
import { getAllArtsByUserId } from "@/lib/artPieces";
import { getCurrentUser } from "@/lib/sessions";
import { getUserByName } from "@/lib/users";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

export function getData(username) {
  let convertedUsername = username.replace(/-/g, " ");
  let user = getUserByName(convertedUsername);
  let currentUser = getCurrentUser();
  let artPieces = getAllArtsByUserId(user.id);
  return {
    convertedUsername,
    user,
    currentUser,
    artPieces,
  };
}

const ProfilePageOfUser = async ({ params }) => {
  const { username } = params;
  const { convertedUsername, user, currentUser, artPieces } = getData(username);

  // console.log(artPieces);
  // console.log(currentUser);

  return (
    <div className="lg:flex p-10">
      <div className="lg:w-1/2">
        <Image
          src={user.profilePhoto}
          alt={`${user.name}-profile-photo`}
          width={500}
          height={100}
          className="rounded-3xl"
          // fill
        />
      </div>
      <div className="grid grid-col-2">
        <div className="p-10 mx-auto">
          <p className="font-serif text-7xl font-medium">{user.name}</p>
          <p className="font-sans text-lg pt-10"> {user.bio} </p>
          <div className="mt-4">
            <span className="text-md font-semibold">Gender: </span>
            {user.gender}
          </div>
          <div className="my-1">
            <Link href={`mailto:${user.email}`}>
              <span className="text-md font-semibold">Contact: </span>
              {user.email}
            </Link>
          </div>
          {currentUser && user.id === currentUser.id && (
            <Link
              href={`/profile/${username}/update`}
              className=" m-auto inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
            >
              Update Profile
            </Link>
          )}
        </div>
        <hr className="mx-8 border-t border-gray-300" />

        <div className="ml-2 p-10 pt-2">
          <p className="font-serif text-2xl font-medium mb-3">
            {artPieces.length > 0
              ? "Created Arts:"
              : "No Arts till yet But Working hard to create an Art."}
          </p>
          <Suspense
            fallback={<LoadingData data={`Arts of ${convertedUsername}`} />}
          >
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 ">
              {artPieces.length > 0 &&
                artPieces.map((art) => (
                  <ArtPiece key={art.title} art={art} isInArtsPage={false} />
                ))}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageOfUser;
