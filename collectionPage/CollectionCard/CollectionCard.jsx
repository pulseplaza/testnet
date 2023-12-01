

import React, { useState } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./CollectionCard.module.css";
import { LikeProfile } from "../../components/componentsindex";



const CollectionCard = ({ collections }) => {
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
                  {collection.name.slice(0, 18)}
                  {collection.name.length > 18 && "..."}
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
