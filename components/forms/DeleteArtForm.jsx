"use client";

import { useFormState } from "react-dom";
import React from "react";
import { deleteArt } from "@/actions/arts-actions";

const DeleteArt = ({ title }) => {
  const [formData, formAction] = useFormState(deleteArt, { title: title });
  return (
    <form action={formAction}>
      <button className="inline-flex w-full justify-center rounded-md bg-red-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
        Delete
      </button>
    </form>
  );
};

export default DeleteArt;
