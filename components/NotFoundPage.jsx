import Link from "next/link";
import React from "react";

const NotFoundPage = ({ url }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-5xl font-bold mb-0 uppercase bg-gradient-to-r from-purple-500 to-red-500 text-transparent bg-clip-text">
        Page Not Found
      </h1>
      <p className="text-lg font-medium mt-4">
        Oops! The page you&apos;re looking for does not exist.
      </p>
      <Link
        href={url}
        className="mt-10 flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-500 to-red-500 text-white px-8 py-2 text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Return
      </Link>
    </div>
  );
};

export default NotFoundPage;
