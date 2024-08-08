import { convertedUrl } from "@/lib/url";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artist/b03bd57f-f634-4eef-987e-405e8c8de596.jpg

const ArtistCard = ({ artist }) => {
  // console.log(artist);

  return (
    <div className="p-10 flex border-2 rounded-3xl border-gray">
      {/* <p>Hello</p> */}
      <Link href={`/profile/${artist.username}`}>
        <Image
          src={artist.photoUrl}
          alt={`${artist.name}-profile-photo`}
          width={400}
          height={200}
          className="rounded-2xl"
        />
      </Link>
      <div className="ml-4">
        <Link href={`/profile/${artist.username}`}>
          <p className="text-2xl my-auto font-serif">{artist.name}</p>
        </Link>
        <p className="mt-5 text-md my-auto font-saas">{artist.bio}</p>
        <div className="mt-10">
          <Link href={`mailto:${artist.email}`}>
            <span className="text-md font-semibold">Contact: </span>
            {artist.email}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
