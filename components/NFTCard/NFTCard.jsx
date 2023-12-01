
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";


//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import images from "../../img";


const NFTCard = ({ NFTData }) => {



    // Number formatting
    const formatNumber = (num) => {
        let formattedNum;
    
        if (num < 1000) {
            // Format with one decimal place if there are decimals, otherwise no decimal
            formattedNum = num % 1 !== 0 ? num.toFixed(1) : num.toString();
        } else if (num < 1000000) {
            // Check if it's a whole number after dividing by 1000
            const numK = num / 1000;
            formattedNum = numK % 1 !== 0 ? numK.toFixed(1) + 'k' : numK.toString() + 'k';
        } else if (num < 1000000000) {
            // Check if it's a whole number after dividing by 1000000
            const numM = num / 1000000;
            formattedNum = numM % 1 !== 0 ? numM.toFixed(3) + 'M' : numM.toFixed(0) + 'M';
            formattedNum = '🪙 ' + formattedNum;
        } else if (num < 1000000000000) {
            // Format as 'B' with three decimal places
            const numB = num / 1000000000;
            formattedNum = numB % 1 !== 0 ? numB.toFixed(3) + 'B' : numB.toFixed(0) + 'B';
            formattedNum = '💰 ' + formattedNum;
        } else {
            // Format as 'T' with three decimal places
            const numT = num / 1000000000000;
            formattedNum = numT % 1 !== 0 ? numT.toFixed(3) + 'T' : numT.toFixed(0) + 'T';
            // Optionally, you can add an emoji or symbol here
            formattedNum = '🐋 ' + formattedNum;
        }
    
        return formattedNum;
    };
    
    
    



    return (
        <div className={Style.NFTCard}>
            {NFTData.map((el, i) => (
                <Link href={{ pathname: "/nft-details", query: el }}>

                    <div className={Style.NFTCard_box} key={i + 1}>
                        <div className={Style.NFTCard_box_img}>
                            <Image
                                src={el.image}
                                alt="NFT image"
                                width={600}
                                height={600}
                                className={Style.NFTCard_box_img_img}
                            />
                        </div>
                        <div className={Style.NFTCard_box_update}>
                            <div className={Style.NFTCard_box_update_left}>

                            </div>
                            <div className={Style.NFTCard_box_update_right}>
                                <div className={Style.NFTCard_box_update_right_info}>
                                    <h3>
                                        {el.name.slice(0, 14)}
                                        {el.name.length > 14 && '...'}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className={Style.NFTCard_box_update_details}>
                            <div className={Style.NFTCard_box_update_details_price}>
                                <div className={Style.NFTCard_box_update_details_price_box}>


                                    <div className={Style.NFTCard_box_update_details_price_box_box}>
                                        <div className={Style.NFTCard_box_update_details_price_box_bid}>
                                            <small>Price</small>
                                            <p>{formatNumber(parseFloat(el.price))} PLS</p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default NFTCard;