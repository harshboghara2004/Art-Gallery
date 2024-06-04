import Image from "next/image";
import React from "react";
import locationPin from "@/public/assets/location-pin.svg";

const TimeAndPlace = ({ yearCreated, gallery, city, country }) => {
  return (
    <>
      <div className="flex items-center text-xs gap-x-16">
        <time dateTime={yearCreated} className="text-gray-500">
          {yearCreated}
        </time>
        <div className="flex gap-x-2">
          <Image src={locationPin} alt="location: " width={20} height={20} />
          <span className="text-gray-500">{`${gallery}${gallery && ','} ${city}${city && ','} ${country}`}</span>
        </div>
      </div>
    </>
  );
};

export default TimeAndPlace;
