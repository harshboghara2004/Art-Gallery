import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-5xl font-bold mb-0 uppercase bg-gradient-to-r from-purple-500 to-red-500 text-transparent bg-clip-text">
        Page Not Found
      </h1>
      <p className="text-lg font-medium mt-4">
        Oops! The page you&apos;re looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
