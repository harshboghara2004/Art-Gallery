import ArtPiece from "@/components/arts/ArtPiece";
import LoadingData from "@/components/LoadingData";
import NotFoundPage from "@/components/NotFoundPage";
import { getAllArtsByUserId } from "@/lib/artPieces";
import { getCurrentUser } from "@/lib/sessions";
import { checkUserExits, getUserByName } from "@/lib/users";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const ProfilePageOfUser = async ({ params }) => {
  const { username } = params;
  let convertedUsername = username.replace(/-/g, " ");
  const checkExists = checkUserExits(convertedUsername);
  // console.log(checkExists);
  if (!checkExists) {
    return <NotFoundPage url={"/profile"} />;
  }

  const currentUser = await getCurrentUser();
  const user = await getUserByName(convertedUsername);
  const artPieces = getAllArtsByUserId(user.id);
  // console.log(artPieces);
  // console.log(currentUser);

  return (
    <div className="lg:flex p-10">
      <div className="mt-4 flex flex-col gap-y-4 items-center lg:w-1/2">
        <Image
          src={user.photoUrl}
          alt={`${user.name}-profile-photo`}
          width={500}
          height={100}
          className="rounded-3xl"
          // fill
        />
        {currentUser && (
          <Link
            href={`/profile/${username}/image`}
            className="mx-auto w-24 inline-flex px-4 text-center items-center rounded-md bg-blue-50 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10"
          >
            Edit Image
          </Link>
        )}
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
                  <ArtPiece
                    access={false}
                    key={art.title}
                    art={art}
                    isInArtsPage={false}
                  />
                ))}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageOfUser;
