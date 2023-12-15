
import React, { useState, useEffect } from "react";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { BsImages } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";


//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
// import images from "../../img";


const NFTCard = ({ NFTData }) => {





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
        if (screenWidth <= 480) {
            return 28; // Adjust as needed for very small screens
        } else if (screenWidth <= 770) {
            return 18; // Adjust for small screens
        } else if (screenWidth <= 1200) {
            return 20; // Adjust for medium screens
        } else if (screenWidth <= 1500) {
            return 12; // Adjust for large screens
        } else {
            return 18; // Adjust for very large screens
        }
    };




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

                <Link href={`/nft?tokenId=${el.tokenId}`} passHref key={i}>

                    <a className={Style.NFTCard_box}>

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
                                        {el.name.slice(0, getNameSliceLength())}
                                        {el.name.length > getNameSliceLength() && "..."}
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
                    </a>
                </Link>
            ))}
        </div>
    );
};

export default NFTCard;

