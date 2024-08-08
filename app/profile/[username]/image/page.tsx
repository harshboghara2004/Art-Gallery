import UpdateProfileImage from "@/components/forms/UpdateProfileImage";
import { getCurrentUser } from "@/lib/users";
import Image from "next/image";
import React from "react";
import logoImg from "@/public/assets/icon.png";
import { redirect } from "next/navigation";
import { verifyAccessOfUpdateUser } from "@/lib/auth";
import { checkUserExits } from "@/lib/users";
import NotFoundPage from "@/components/NotFoundPage";

const UpdateImagePage = async ({ params }) => {
  const { username } = params;
  const currentUser = getCurrentUser();
  let convertedUsername = username.replace(/-/g, " ");

  if (currentUser === undefined) {
    return redirect("/login");
  }

  const checkExists = checkUserExits(convertedUsername);
  if (!checkExists) {
    return <NotFoundPage url={"/profile"} />;
  }

  const checkAccess = await verifyAccessOfUpdateUser(convertedUsername);
  if (!checkAccess) {
    redirect(`/profile/${username}`);
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
            Update Profile Photo - {currentUser.name}
          </h2>
        </div>
        <p className="mt-1 mx-auto text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <UpdateProfileImage
        currentUser={currentUser}
        OldUrl={currentUser.photoUrl}
      />
    </>
  );
};

export default UpdateImagePage;
