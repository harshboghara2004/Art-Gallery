"use client";

import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-5xl font-bold mb-0 uppercase bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text">
        An Error Occured!
      </h1>
      <p className="text-lg font-medium mt-4">
        Something went wrong. Please try again later.
      </p>
    </div>
  );
};

export default Error;
