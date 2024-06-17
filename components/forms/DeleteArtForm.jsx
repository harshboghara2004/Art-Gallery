"use client";

import React from "react";
import { deleteArt } from "@/actions/arts-actions";
import { useEdgeStore } from "@/lib/edgestore";

const DeleteArtForm = ({ title, url }) => {
  const { edgestore } = useEdgeStore();

  const handleDelete = async () => {
    // console.log(title);
    // console.log(url);
    await edgestore.myPublicImages.delete({
      url: url,
    });
    await deleteArt(title);
  };
  return (
    <button
      onClick={handleDelete}
      className="inline-flex w-full justify-center rounded-md bg-red-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
    >
      Delete
    </button>
  );
};

export default DeleteArtForm;
