
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
// import { BsImages } from "react-icons/bs";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { useRouter } from 'next/router';
import Style from "./CollectionDetailsImg.module.css";


const CollectionDetailsImg = ({ nft }) => {
  const [blockWidth, setBlockWidth] = useState(0);
  const blockRef = useRef(null);

  const [isImageLoaded, setImageLoaded] = useState(false);
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);
  const [like, setLike] = useState(false);

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


  //LIKE FUNCTION
  const likeNFT = () => {
    setLike(prevLike => !prevLike);
  };


  


  return (
    <div className={Style.CollectionDetailsImg} ref={blockRef}>
      <div className={Style.CollectionDetailsImg_box}>
        <div className={Style.CollectionDetailsImg_box_NFT}>
          
          <div className={Style.CollectionDetailsImg_box_NFT_img}>
            <Image
              src={nft.image}
              className={Style.CollectionDetailsImg_box_NFT_img_img}
              alt="NFT image"
              width={800}
              height={800}
              layout="responsive"
              objectFit="cover"
              onClick={() => window.open(nft.image, "_blank")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetailsImg;

