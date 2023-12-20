

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../img";


const DropZone = ({
  title,
  heading,
  subHeading,
  name,
  description,
  uploadToIPFS,
  setImage,
}) => {

  const [fileUrl, setFileUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);




  const onDrop = useCallback(async (acceptedFiles) => {
    // Filter out non-image files
    const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      // Handle case where no images were dropped
      console.error('No valid file format.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const url = await uploadToIPFS(imageFiles[0]);
    setFileUrl(url);
    setImage(url);
    setIsLoading(false);
  }, [uploadToIPFS, setImage]);


  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 20000000,
  });


  return (
    <div>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.DropZone_box_input}>
          <p>{title}</p>
          <div className={Style.DropZone_box_input_img}>
            {isLoading ? (
              <p>
                ⌛ Uploading your file. Please wait.
              </p>
            ) : (
              <Image
                src={images.upload}
                alt="Upload"
                width={100}
                height={100}
                className={Style.DropZone_box_input_img_img}
              />
            )}
          </div>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>

      {fileUrl && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>


            <Image
              src={fileUrl}
              alt="Image preview"
              width={200}
              height={200}
              className={Style.DropZone_box_aside_box_img}
              objectFit="contain"
            />

            <div className={Style.DropZone_box_aside_box_preview}>

              <div className={Style.DropZone_box_aside_box_preview_one}>
              
                <h3>Name:</h3>
                <p>{name || ""}</p>
                <h3>Description:</h3>
                <p>{description || ""}</p>
              </div>

            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default DropZone;

