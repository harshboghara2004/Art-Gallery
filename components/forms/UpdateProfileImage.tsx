"use client";

import React, { useState } from "react";
import { SingleImageDropzone } from "../SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { updateProfilePhoto } from "@/actions/auth-actions";

const UpdateProfileImage = ({ currentUser, OldUrl }) => {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<{ errorMsg: string }>();
  const { edgestore } = useEdgeStore();

  const handleReplace = async () => {
    if (file) {
      let res;
      if (OldUrl === "/assets/default.png") {
        res = await edgestore.myPublicImages.upload({
          file,
          options: {
            replaceTargetUrl: OldUrl,
          },
          onProgressChange: (progress) => {
            setProgress(progress);
          },
          input: { type: "artist" },
        });
      } else {
        res = await edgestore.myPublicImages.upload({
          file,
          options: {
            replaceTargetUrl: OldUrl,
          },
          onProgressChange: (progress) => {
            setProgress(progress);
          },
          input: { type: "artist" },
        });
      }
      await updateProfilePhoto(res.url);
    } else {
      setErrorMsg({ errorMsg: "Please Choose an Image file" });
    }
  };

  return (
    <div className="mt-8 mx-auto w-full lg:w-2/5 h-1/2 items-center flex flex-col gap-y-4">
      <SingleImageDropzone
        width={400}
        height={400}
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
      />
      {file !== undefined && progress > 0 && progress < 100 && (
        <div className="h-[6px] w-60 border-black border rounded overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-150"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      )}
      {file !== undefined && progress === 100 && <p>Image Uploaded</p>}
      {errorMsg && <p>{errorMsg?.errorMsg}</p>}
      {(progress === 0 || file === undefined) && (
        <button
          className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleReplace}
        >
          Replace
        </button>
      )}
    </div>
  );
};

export default UpdateProfileImage;
