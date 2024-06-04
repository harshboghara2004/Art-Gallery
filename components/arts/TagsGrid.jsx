import React from "react";

const TagsGrid = ({ tags }) => {
  // tags = Array.from(new Set(tags));
  return (
    <>
      {tags && (
        <div className="flex flex-wrap">
          {tags.map((tag) => (
            <div
              key={tag}
              className="inline-block px-3 py-1 m-2 bg-gray-200 rounded-lg shadow-sm text-sm"
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TagsGrid;
