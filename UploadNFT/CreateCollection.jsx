

import React, { useState, useContext } from "react";


//INTERNAL IMPORT
import Style from "./UploadNFT.module.css";
import formStyle from "../components/Form/Form.module.css";
import { Button, Loader } from "../components/componentsindex.js";
import { DropZoneCollection } from "../UploadNFT/uploadNFTIndex.js";


import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";


const CreateCollection = ({ uploadToIPFS, createCollection }) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isCreateEnabled, setIsCreateEnabled] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);



  // Update the setImage function in DropZoneCollection props
  const handleSetImage = (url) => {
    setImage(url);
    setIsImageLoaded(false); // Reset isImageLoaded to false when a new image is set
  };

  // Called when the image loads successfully
  const onImageLoad = () => {
    setIsImageLoaded(true); // Set isImageLoaded to true when image is loaded
    setIsCreateEnabled(true);
  };

  // Called when there's an error in loading the image
  const onImageError = () => {
    setIsImageLoaded(false); // Set isImageLoaded to false on error
    setIsCreateEnabled(false);
    console.error("Failed to load image preview.");
  };

  const { validateTextLength } = useContext(NFTMarketplaceContext);


  const handleCreateCollection = async () => {
    if (
      !validateTextLength(name, 'name') ||
      !validateTextLength(symbol, 'symbol') ||
      !validateTextLength(description, 'description') ||
      !isImageLoaded
    ) {
      alert("Image preview not loaded. Please check your image file.");
      return;
    }



    setIsLoading(true); // Start loading
    try {
      await createCollection(name, symbol, description, image);
      setIsLoading(false); // Stop loading

    } catch (error) {
      console.error("Error during collection creation:", error);
      setIsLoading(false); // Stop loading in case of error
    }
  };





  return (

    <div className={Style.upload}>

      {isLoading && (
        <div className={Style.loaderOverlay}>
          <Loader />
        </div>
      )}


      <DropZoneCollection
        title="Static and animated image files, max 20 MB"
        heading="Drag & drop file"
        subHeading="or browse media on your device"
        name={name}
        symbol={symbol}
        description={description}
        setImage={handleSetImage}
        uploadToIPFS={uploadToIPFS}
        onImageLoad={onImageLoad}
        onImageError={onImageError}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Collection Name</label>
          <input
            type="text"
            placeholder="Name of your Collection"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>


        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Collection Symbol</label>
          <input
            type="text"
            placeholder="Symbol of your Collection"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>


        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="Write a Description about your Collection"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image. Between 5 and 500 characters.
          </p>
        </div>


        <div className={Style.upload_box_btn}>
          <Button
            btnName="Upload"
            handleClick={handleCreateCollection}
            classStyle={Style.upload_box_btn_style}
            disabled={!isCreateEnabled}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;

