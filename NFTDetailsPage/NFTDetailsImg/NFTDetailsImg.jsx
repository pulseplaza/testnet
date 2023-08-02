import React, {useState, useEffect } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";


//INTERNAL IMPORT
import Style from "./NFTDetailsImg.module.css";
import images from "../../img";


const NFTDetailsImg = () => {

  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);
  const [like, setLike] = useState(false);


  const openDescription = () => {
    if(!description) {
      setDescription(true);
    } else {
      setDescription(false);
    }
  };

  const openDetails = () => {
    if(!details) {
      setDetails(true);
    } else {
      setDetails(false);
    }
  };

  const likeNFT = () => {
    if(!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };


  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_like}>
            <BsImages className={Style.NFTDetailsImg_box_NFT_like_icon_1} />
            <p onClick={() => likeNFT()}>
              {like ? (
                <AiOutlineHeart className={Style.NFTDetailsImg_box_NFT_like_icon} />
              ) : (
                <AiFillHeart className={Style.NFTDetailsImg_box_NFT_like_icon} />
              )}
              <span>23</span>

            </p>

          </div>

          <div className={Style.NFTDetailsImg_box_NFT_img}>
            <div style={{position:"relative"}}>
              <Image
              src={images.nft_image_1} 
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt="NFT image"
              width={800}
              height={800}
              style={{objectFit:"cover"}}
              />
            </div>

          </div>
        </div>

        <div 
        className={Style.NFTDetailsImg_box_description}
        onClick={() => openDescription()}
        >
          <p>Description</p>
          {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}

        </div>

        {
          description && (
            <div className={Style.NFTDetailsImg_box_description_box}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

            </div>

          )}

          <div className={Style.NFTDetailsImg_box_details}
          onClick={() => openDetails()}
          >
            <p>Details</p>
            {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>

          {details && (
            <div className={Style.NFTDetailsImg_box_details_box}>
              <small>2000 x 2000 px.IMAGE(685KB)</small>
              <p>
                <small>Contract address</small>
                <br></br>
                0x6BF307Cd0B522fd7e13B9C59E9120e255D570B07
              </p>
              <p>
                <small>Token ID</small>
                100300372864
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;