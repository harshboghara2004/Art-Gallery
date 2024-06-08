import React from "react";
import TagsGrid from "./TagsGrid";
import Image from "next/image";
import TimeAndPlace from "./TimeAndPlace";
import Link from "next/link";
import { convertedUrl } from "@/lib/database";

const ArtPiece = ({ art, isInArtsPage }) => {
  // console.log(art);
  return (
    <article
      key={art.title}
      className="flex max-w-xl flex-col items-start justify-between p-5 border-gray border rounded-3xl"
    >
      <TimeAndPlace
        yearCreated={art.yearCreated}
        gallery={art.gallery}
        city={art.city}
        country={art.country}
      />
      <div className="pt-4 ">
        <Image
          src={art.image}
          width={500}
          height={200}
          alt={`${art.title}`}
          className="rounded-2xl"
        />
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <span className="absolute inset-0" />
          {art.title}
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {art.description}
        </p>
      </div>
      {isInArtsPage && (
        <div className="relative mt-8 flex items-center gap-x-4">
          <div className="flex gap-x-2 text-sm leading-6 mb-1">
            <p className="text-gray-900 italic p-1">Designed by: </p>
            <Link
              href={convertedUrl(`/profile/${art.artist.name}`)}
              className="flex gap-x-2"
            >
              <Image
                src={art.artist.profilePhoto}
                alt="artist-profile-photo"
                width={25}
                height={55}
                className="rounded-md"
              />
              <span className="font-semibold non-italic p-1">
                {art.artist.name}
              </span>
            </Link>
          </div>
        </div>
      )}

      <hr className="w-full h-4 mx-auto" />
      <TagsGrid tags={art.tags} title={art.title} isInArtPiecePage={false} />
      <Link
        href={convertedUrl(`/arts/${art.title}`)}
        className="font-serif font-medium text-blue-700 place-self-center"
      >
        click to know more
      </Link>
    </article>
  );
};

export default ArtPiece;
