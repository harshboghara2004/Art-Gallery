"use client";

import Image from "next/image";
import React, { useState } from "react";
import logoImg from "@/public/assets/icon.png";
import { shareArt } from "@/actions/arts-actions";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "../SingleImageDropzone";

const ShareForm = ({ user }) => {
  const [file, setFile] = useState<File>();
  const [errorMsg, setErrorMsg] = useState<{ errorMsg: string }>();
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());

    if (file === undefined) {
      setErrorMsg({ errorMsg: "Please select an image" });
      return;
    }
    if (urls === undefined) {
      setErrorMsg({ errorMsg: "Please upload an image" });
      return;
    }

    await edgestore.myPublicImages.confirmUpload({
      url: urls?.url,
    });

    await shareArt({ artData: formEntries, urls: urls });
  };

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
            Share Your Art
          </h2>
        </div>
        <p className="mt-1 mx-auto text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <div className="mt-8 mx-4 items-center flex flex-col justify-evenly lg:flex-row">
        {/* ArtPiece Photo */}
        <div className="mt-2 w-full lg:w-2/5 flex flex-col items-center gap-y-4">
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
          {(progress === 0 || file === undefined) && (
            <button
              className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={async () => {
                if (file) {
                  const res = await edgestore.myPublicImages.upload({
                    file,
                    options: {
                      temporary: true,
                    },
                    onProgressChange: (progress) => {
                      setProgress(progress);
                    },
                    input: { type: "artpiece" },
                  });
                  setUrls({
                    url: res.url,
                    thumbnailUrl: res.thumbnailUrl,
                  });
                }
              }}
            >
              Upload
            </button>
          )}
        </div>
        <form
          className="w-full lg:w-2/5 flex px-1 flex-col justify-center lg:flex-row lg:justify-around"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full">
            {/* Title */}
            <div className="mt-4 gap-y-8">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex justify-between mt-2">
              {/* Gallery */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="gallery"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gallery
                </label>
                <div className="mt-2">
                  <input
                    id="gallery"
                    name="gallery"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* City */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    id="city"
                    name="city"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              {/* Price */}
              <div className="mt-4 gap-y-8 w-2/5">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price (in $)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Country */}
              <div className="sm:col-span-3 mt-4 ml-4 w-2/3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Medium */}
            <div className="mt-4 gap-y-8">
              <label
                htmlFor="medium"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Medium
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="medium"
                  id="medium"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Description */}
            <div className="col-span-full mt-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={2}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-1 mb-3 text-sm leading-6 text-gray-600">
                Write a few sentences about your art.
              </p>
            </div>

            {errorMsg && (
              <p className="text-lg font-medium text-red-500">
                {errorMsg?.errorMsg}
              </p>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Share On Community
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShareForm;
