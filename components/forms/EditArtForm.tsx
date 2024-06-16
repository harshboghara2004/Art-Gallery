"use client";

import Image from "next/image";
import React from "react";
import logoImg from "@/public/assets/icon.png";
import { editArt } from "@/actions/arts-actions";

const EditArtForm = ({ artPiece }) => {
  // console.log(artPiece);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());

    if (formEntries.description === "") {
      formEntries.description = "Not Specified By Artist.";
    }

    // console.log(formEntries);
    await editArt({ artData: formEntries });
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
            Edit an Art - {artPiece.title}
          </h2>
        </div>
        <p className="mt-1 mx-auto text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      {/* ArtPiece Photo */}
      <div className="mt-8 flex justify-evenly">
        <form
          className=" w-full lg:w-2/5 flex flex-col justify-center lg:flex-row lg:justify-around"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full">
            {/* Title */}
            <div className="mt-4 gap-y-8 w-full">
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
                  defaultValue={artPiece.title}
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
                    defaultValue={artPiece.gallery}
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
                    defaultValue={artPiece.city}
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
                    defaultValue={artPiece.price}
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
                    defaultValue={artPiece.country}
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
                  placeholder={
                    artPiece.medium === "Not Specified By Artist."
                      ? artPiece.medium
                      : undefined
                  }
                  defaultValue={
                    artPiece.medium !== "Not Specified By Artist."
                      ? artPiece.medium
                      : undefined
                  }
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
                  placeholder={
                    artPiece.description === "Not Specified By Artist."
                      ? artPiece.description
                      : undefined
                  }
                  defaultValue={
                    artPiece.description !== "Not Specified By Artist."
                      ? artPiece.description
                      : undefined
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-1 mb-3 text-sm leading-6 text-gray-600">
                Write a few sentences about your art.
              </p>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditArtForm;
