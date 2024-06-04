"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();

  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <>
      {" "}
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <div className="mt-2 border-2 rounded-lg p-4">
        <div className="flex flex-col gap-6">
          <div className="w-full h-96 border-2 rounded-md flex justify-center items-center text-center text-gray-400 relative">
            {!pickedImage && <p className="p-8">No image picked yet.</p>}
            {pickedImage && (
              <Image src={pickedImage} alt="The image selected by user." fill />
            )}
          </div>
          <input
            ref={imageInput}
            className="hidden"
            type="file"
            id={name}
            accept="image/png, image/jpeg"
            name={name}
            onChange={handleImageChange}
            required
          />
          <button
            className="m-auto border-0 py-2 px-6 bg-indigo-600 text-white font-medium rounded cursor-pointer font-inherit"
            type="button"
            onClick={handlePickClick}
          >
            Pick an Image
          </button>
        </div>
      </div>
    </>
  );
}
