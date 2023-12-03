

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./CollectionCard.module.css";
import { LikeProfile } from "../../components/componentsindex";




const CollectionCard = ({ collections }) => {


  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getNameSliceLength = () => {
    if (screenWidth <= 560) {
      return 26; // Adjust as needed for very small screens
    } else if (screenWidth <= 1024) {
      return 20; // Adjust for small to medium screens
    } else if (screenWidth <= 1200) {
      return 22; // Adjust for large screens
    } else if (screenWidth <= 1500) {
      return 18; // Adjust for larger screens
    } else {
      return 24; // Adjust for very large screens
    }
  };


  return (
    <div className={Style.CollectionCard}>
      {collections?.map((collection, i) => (
        <Link href={{ pathname: "/collection-details", query: collection }} key={i + 1}>
          <a className={Style.CollectionCard_link}>
            <div className={Style.CollectionCard_box} key={i + 1}>

              <div className={Style.CollectionCard_box_img}>
                <Image
                  src={collection.image}
                  alt="Collection"
                  width={500}
                  height={500}
                  objectFit="cover"
                  className={Style.CollectionCard_box_img_img}
                />
              </div>
              <div className={Style.CollectionCard_box_info}>
                <h3>
                  {collection.name.slice(0, getNameSliceLength())}
                  {collection.name.length > getNameSliceLength() && "..."}
                </h3>
              </div>
              <div className={Style.CollectionCard_box_info2}>
                <small>Creator</small>

                <h5>
                  {collection.creatorAddress.slice(0, 10) + "..." + collection.creatorAddress.slice(-10)}
                </h5>


              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default CollectionCard;
