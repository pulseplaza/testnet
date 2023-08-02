import React from "react";
import Image from "next/image";
import { RiMastodonFill, RiFacebookBoxFill } from "react-icons/ri";
import { BsDiscord, BsTwitter } from "react-icons/bs";
import { TiSocialInstagram } from "react-icons/ti";


//INTERNAL IMPORT
import Style from "./collectionProfile.module.css";
import images from "../../img";


const collectionProfile = () => {
  const cardArray = [1, 2, 3, 4];
  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <Image
            src={images.nft_image_1}
            alt="NFT image"
            width={800}
            height={800}
            className={Style.collectionProfile_box_left_img}
          />

          <div className={Style.collectionProfile_box_left_social}>
            <a href="#">
              <BsDiscord />
            </a>
            <a href="#">
              <BsTwitter />
            </a>
            <a href="#">
              <RiFacebookBoxFill />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <RiMastodonFill />
            </a>
          </div>
        </div>
        <div className={Style.collectionProfile_box_middle}>
          <h1>Awesome NFT collection</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className={Style.collectionProfile_box_middle_box}>
            {cardArray.map((el, i) => (
              <div className={Style.collectionProfile_box_middle_box_item} key={i + 1}>
                <small>Floor price</small>
                <p>${i + 1}1.58</p>
                <span>+ {i + 2}.11%</span>

              </div>

            ))}

          </div>

        </div>
      </div>
    </div>
  );
};

export default collectionProfile;