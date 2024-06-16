"use client";
import { addTagAction, deleteTagAction } from "@/actions/tags-action";
import React, { useRef, useState } from "react";

const AddNewTag = ({ title }) => {
  const [open, setOpen] = useState(false);
  const tagValue = useRef();

  const openInput = () => setOpen(true);
  const closeInput = () => setOpen(false);

  const handleAddButton = async () => {
    const tag = tagValue.current.value;
    await addTagAction(tag, title);
    closeInput();
  };

  return open ? (
    <div className="flex">
      <input
        type="text"
        name="tag"
        id="tag"
        autoComplete="given-name"
        required
        ref={tagValue}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button
        onClick={closeInput}
        className="px-3 py-1 m-2 rounded-lg bg-indigo-600 text-sm font-medium text-white"
      >
        Cancel
      </button>
      <button
        onClick={handleAddButton}
        className="px-3 py-1 m-2 rounded-lg bg-indigo-600 text-sm font-medium text-white"
      >
        Add
      </button>
    </div>
  ) : (
    <button
      onClick={openInput}
      className="px-3 py-1 m-2 rounded-lg bg-indigo-600 text-sm font-medium text-white"
    >
      Add New tag
    </button>
  );
};

const TagsGrid = ({ access, tags, title, isInArtPiecePage }) => {
  const handleDeleteTag = async (tag) => {
    await deleteTagAction(tag, title);
  };

  return (
    <>
      <div className="flex flex-wrap">
        {tags && (
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex px-3 py-1 m-2 gap-x-2 bg-gray-200 rounded-lg shadow-sm text-sm"
              >
                <p>{tag}</p>
                {access && (
                  <button onClick={() => handleDeleteTag(tag)}>
                    {" "}
                    &#10005;
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {access && (
        <div className="w-1/2">
          {isInArtPiecePage && <AddNewTag title={title} />}
        </div>
      )}
    </>
  );
};

export default TagsGrid;
