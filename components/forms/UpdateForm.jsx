"use client";

import Image from "next/image";
import React from "react";
import logoImg from "@/public/assets/icon.png";
import ImagePicker from "./image-picker";
import { useFormState } from "react-dom";
import { update } from "@/actions/auth-actions";

const UpdateForm = ({ user }) => {
  const [formState, formAction] = useFormState(update, {
    oldName: user.name,
    oldBio: user.bio,
    oldProfilePhoto: user.profilePhoto,
  });
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {/* Logo and Text */}
      <div className="flex sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-4 h-10 w-auto rounded-xl"
          src={logoImg}
          width={200}
          height={200}
          alt="Art Gallery Logo"
        />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Update Profile
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>

        <form className="space-y-6" action={formAction}>
          {/* First and Last Name */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={user.firstName}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  defaultValue={user.lastName}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          {/* Country */}
          <div className="sm:col-span-3">
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
                defaultValue={user.country}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="mt-4">
            <ImagePicker label="Your Profile Photo" name="image" required={false}/>
          </div>

          {/* Bio */}
          <div className="col-span-full">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Bio
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                rows={2}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={user.bio}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about yourself.
            </p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
