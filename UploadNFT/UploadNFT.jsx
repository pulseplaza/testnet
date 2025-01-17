
import React, { useContext, useState, useEffect } from 'react';

import { FaHeartPulse } from "react-icons/fa6";

import Image from "next/image";
import { useRouter } from "next/router";
import Link from 'next/link';




//INTERNAL IMPORT
import Style from "./UploadNFT.module.css";
import formStyle from "../components/Form/Form.module.css";
// import images from "../img";
import { Button, Loader } from "../components/componentsindex.js";
import { DropZone } from "../UploadNFT/uploadNFTIndex.js";


import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

// import Profile from "../components/componentsindex";


const UploadNFT = ({ uploadToIPFS, createNFT, mycollections }) => {
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(0);
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [collection, setCollection] = useState("");

  const [image, setImage] = useState(null);

  const { validateTextLength } = useContext(NFTMarketplaceContext);

  const [isLoading, setIsLoading] = useState(false);

  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const [isMintEnabled, setIsMintEnabled] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);


  const router = useRouter();


  // Function to handle the wallet disconnect
  const handleWalletDisconnect = () => {
    setIsWalletConnected(false);
  };

  // Define a function to handle account changes
  const handleAccountsChanged = (accounts) => {
    setIsWalletConnected(accounts.length > 0);
  };


  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setIsWalletConnected(accounts.length > 0);
      }
    };

    checkWalletConnection();

    // Add the listener
    window.ethereum?.on('accountsChanged', handleAccountsChanged);

    // Remove the listener on cleanup
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);


  // Function called when a new image URL is set
  const handleSetImage = (url) => {
    setImage(url);
    setIsImageLoaded(false); // Reset isImageLoaded to false when a new image is set
  };

  // Called when the image loads successfully
  const onImageLoad = () => {
    setIsImageLoaded(true); // Set isImageLoaded to true when image is loaded
    setIsMintEnabled(true);
  };

  // Called when there's an error in loading the image
  const onImageError = () => {
    setIsImageLoaded(false); // Set isImageLoaded to false on error
    setIsMintEnabled(false);
    console.error("Failed to load image preview.");
  };


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };



  const handleMintNFT = async () => {
    if (!validateTextLength(name, 'name') || !validateTextLength(description, 'description')) {
      // If the validation fails, exit the function.
      return;
    }

    if (!image) {
      alert("Please upload an image before minting.");
      return;
    }

    if (!isImageLoaded) {
      alert("Image preview not loaded. Please check your image file.");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      await createNFT(
        name,
        price,
        image,
        description,
        collection,
        router
      );
      setIsLoading(false); // Stop loading
      // Redirect if needed
    } catch (error) {
      console.error("Error during minting:", error);
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
        title="Static and animated image files, max 20MB"
        heading="Drag & drop file"
        subHeading="or browse media on your device"
        name={name}
        description={description}
        setImage={handleSetImage}
        uploadToIPFS={uploadToIPFS}
        onImageLoad={onImageLoad}
        onImageError={onImageError}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">NFT Name</label>
          <input
            type="text"
            placeholder="Name of your NFT"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>


        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="Write a Description about your NFT"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image. Between 5 and 500 characters.
          </p>
        </div>



        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Collection</label>

          <p className={Style.upload_box_input_para}>
            Choose an existing collection or&nbsp;
            <Link href="/create-collection">
              <a className={Style.yourLinkStyle}>create a new collection</a>
            </Link>
          </p>

          <div className={Style.upload_box_slider_div}>
            {mycollections.length > 0 ? (
              mycollections.map((collection, i) => (
                <div
                  className={`${Style.upload_box_slider} ${active === i + 1 ? Style.active : ""}`}
                  key={i}
                  onClick={() => {
                    setCollection({
                      name: collection.name,
                      symbol: collection.symbol,
                      description: collection.description,
                      image: collection.image,
                      collectionAddress: collection.collectionAddress,
                      creatorAddress: collection.creatorAddress,
                    });
                    setActive(i + 1);
                  }}
                >
                  <div className={Style.upload_box_slider_box}>
                    <div className={Style.upload_box_slider_box_img}>
                      <Image
                        src={collection.image}
                        alt="Collection Image"
                        width={70}
                        height={70}
                        className={Style.upload_box_slider_box_img_img}
                        onLoad={onImageLoad}
                        onError={onImageError}
                      />
                    </div>
                  </div>
                  <p>{collection.symbol}</p>
                  {/* <small>({collection.symbol})</small> */}
                </div>
              ))
            ) : (
              <div className={Style.upload_box_slider_box_nocollection}>
                <span>⚠️</span>
              </div>
            )}
          </div>

          <p className={Style.upload_box_input_para}>
            Selected collection:&nbsp;
            {isWalletConnected && mycollections.length > 0 ? (
              collection && collection.name ? (
                collection.name
              ) : (
                <span style={{ color: 'red' }}>No collection selected.</span>
              )
            ) : (
              <span style={{ color: 'red' }}>NO COLLECTION CREATED YET. YOU NEED A COLLECTION TO MINT YOUR NFT.</span>
            )}
          </p>


        </div>

        <div className={Style.priceInputContainer}>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Price">Price</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <FaHeartPulse />
              </div>
              <input
                type="text"
                placeholder="Price in PLS"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>



        <div className={Style.upload_box_btn}>
          <Button
            btnName="Upload"
            handleClick={handleMintNFT}
            classStyle={Style.upload_box_btn_style}
            disabled={!isMintEnabled}
          />

        </div>
      </div>
    </div>
  );
};

export default UploadNFT;


