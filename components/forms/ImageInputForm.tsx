"use client";

import Link from "next/link";
import React, { useState } from "react";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";

const ImageInputForm = ({ folder }) => {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();

  return (
    <div className="flex flex-col items-center m-6 gap-2">
      <SingleImageDropzone
        width={400}
        height={400}
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
      />
      <div className="h-[6px] w-60 border-black border rounded overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-150"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
      <button
        className="bg-white text-black rounded px-2 hover:opacity-80"
        onClick={async () => {
          if (file) {
            const res = await edgestore.myPublicImages.upload({
              file,
              // options: {
              //   temporary: true,
              // },
              onProgressChange: (progress) => {
                setProgress(progress);
              },
              input: { type: "artpiece" },
            });
            setUrls({
              url: res.url,
              thumbnailUrl: res.thumbnailUrl,
            });
          }
        }}
      >
        Upload
      </button>
      {urls?.url && (
        <Link href={urls.url} target="_blank">
          URL
        </Link>
      )}
      {urls?.thumbnailUrl && (
        <Link href={urls.thumbnailUrl} target="_blank">
          Thumbnail URL
        </Link>
      )}
    </div>
  );
};

export default ImageInputForm;
