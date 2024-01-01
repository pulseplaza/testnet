

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
// import { BsImages } from "react-icons/bs";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { useRouter } from 'next/router';
import Style from "./NFTDetailsImg.module.css";

const NFTDetailsImg = ({ nft }) => {
  const [blockWidth, setBlockWidth] = useState(0);
  const blockRef = useRef(null);

  // const [isImageLoaded, setImageLoaded] = useState(false);
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);
  // const [like, setLike] = useState(false);

  const router = useRouter();




  //SLICE ADDRESSES FUNCTION
  useEffect(() => {
    const updateWidth = () => {
      if (blockRef.current) {
        setBlockWidth(blockRef.current.offsetWidth);
      }
    };

    const resizeObserver = new ResizeObserver(updateWidth);

    if (blockRef.current) {
      updateWidth();
      resizeObserver.observe(blockRef.current);
    }

    return () => {
      if (resizeObserver && blockRef.current) {
        resizeObserver.unobserve(blockRef.current);
      }
    };
  }, []);

  const truncate = (value) => {
    value = (value ?? '').toLowerCase();
    if (blockWidth < 420 && value.length > 20) {
      return `${value.slice(0, 16)}...${value.slice(-14)}`;
    }
    return value;
  };


  const truncatedSeller = truncate(nft?.seller);
  const truncatedOwner = truncate(nft?.owner);
  const truncatedCreator = truncate(nft?.creator);


  //DESCRIPTION & DETAILS FUNCTION
  const openDescription = () => {
    setDescription(prevDescription => !prevDescription);
  };

  const openDetails = () => {
    setDetails(prevDetails => !prevDetails);
  };





  return (
    <div className={Style.NFTDetailsImg} ref={blockRef}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>


          <div className={Style.NFTDetailsImg_box_NFT_img}>
            <Image
              src={nft.image}
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt="NFT file preview"
              width={800}
              height={800}
              layout="responsive"
              objectFit="cover"
              onClick={() => window.open(nft.image, "_blank")}
            />
          </div>
        </div>

        <div
          className={Style.NFTDetailsImg_box_description}
          onClick={openDescription}
        >
          <p>Description</p>
          {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {
          description && (
            <div className={Style.NFTDetailsImg_box_description_box}>
              <p>{nft.description}</p>
            </div>
          )
        }


        <div className={Style.NFTDetailsImg_box_details}
          onClick={openDetails}
        >
          <p>Additional information</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {details && (
          <div className={Style.NFTDetailsImg_box_details_box}>

            <p>
              <small>Seller Address</small>
              <br />
              {truncatedSeller.startsWith('0x000000') ? "🚫 THIS NFT IS NOT LISTED FOR SALE" : truncatedSeller}
            </p>

            <p>
              <small>Owner Address</small>
              <br />
              {truncatedOwner === '0xc2769bfda7e401570f497e817aaf5b26eed44da2'.toLowerCase()
                ? "0xc2769bfda7e401570f497e817aaf5b26eed44da2 (Pulse Plaza)"
                : truncatedOwner}
            </p>

            <p>
              <small>Creator Address</small>
              <br />
              {truncatedCreator}
            </p>

            <p>
              <small>NFT ID</small>
              <br />
              <a
                href={`https://scan.v4.testnet.pulsechain.com/token/0xc2769bfda7e401570f497e817aaf5b26eed44da2/instance/${nft.tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {nft.tokenId}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;

