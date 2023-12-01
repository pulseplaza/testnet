
import React, { useState, useContext } from "react";
// import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
// import { FaPercent } from "react-icons/fa";
// import { AiTwotonePropertySafety } from "react-icons/ai";
// import { TiTick } from "react-icons/ti";
// import Image from "next/image";
// import { useRouter } from "next/router";


//INTERNAL IMPORT
import Style from "./UploadNFT.module.css";
import formStyle from "../components/Form/Form.module.css";
import images from "../img";
import { Button, Loader } from "../components/componentsindex.js";
import { DropZone } from "../UploadNFT/uploadNFTIndex.js";


import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";


const CreateCollection = ({ uploadToIPFS, createCollection }) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const { validateTextLength } = useContext(NFTMarketplaceContext);


  const handleCreateCollection = async () => {
    if (
      !validateTextLength(name, 'name') ||
      !validateTextLength(symbol, 'symbol') ||
      !validateTextLength(description, 'description')
    ) {
      // If validation fails, exit the function
      return;
    }



    setIsLoading(true); // Start loading
    try {
      await createCollection(name, symbol, description, image);
      setIsLoading(false); // Stop loading
      // Add any post-creation logic here (like redirection)
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


      <DropZone
        title="BMP, JPG, JPEG, GIF, HEIF, PNG, SVG, TIF, TIFF, WEBP, MAX 20MB"
        heading="Drag & drop file"
        subHeading="or browse media on your device"
        name={name}
        description={description}
        setImage={setImage}
        uploadToIPFS={uploadToIPFS}
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
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
