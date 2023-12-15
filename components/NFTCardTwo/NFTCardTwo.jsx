
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";


//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";




const NFTCardTwo = ({ NFTData }) => {


    const [screenWidth, setScreenWidth] = useState(0);

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
            return 30; // Adjust as needed for very small screens
        } else if (screenWidth <= 770) {
            return 20; // Adjust for small screens
        } else if (screenWidth <= 1024) {
            return 18; // Adjust for medium screens
        } else if (screenWidth <= 1400) {
            return 15; // Adjust for large screens
        } else {
            return 15; // Adjust for very large screens
        }
    };



    // Address format
    const formatAddress = (inputString) =>
        inputString.length > 9
            ? inputString.slice(0, 8) + "..." + inputString.slice(-8)
            : inputString;



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
        <div className={Style.NFTCardTwo}>
            {NFTData?.map((el, i) => (

                <Link href={`/nft?tokenId=${el.tokenId}`} key={i + 1}>
                    <a className={Style.NFTCardTwo_link}>

                        <div className={Style.NFTCardTwo_box} key={i + 1}>


                            <div className={Style.NFTCardTwo_box_img}>


                                <Image
                                    src={el.image}
                                    alt="NFT"
                                    width={500}
                                    height={500}
                                    objectFit="cover"
                                    className={Style.NFTCardTwo_box_img_img}
                                />

                                <div className={Style.NFTCardTwo_box_img_bar}>
                                    <div className={Style.NFTCardTwo_box_img_bar_txt}>

                                        <small>
                                            {
                                                el.collectionSymbol
                                                    ? el.collectionSymbol.slice(0, getNameSliceLength()) + (el.collectionSymbol.length > getNameSliceLength() ? "..." : "")
                                                    : "No collection"
                                            }
                                        </small>

                                    </div>
                                </div>
                            </div>



                            <div className={Style.NFTCardTwo_box_info}>
                                <div className={Style.NFTCardTwo_box_info_left}>

                                    <p>
                                        {el.name.slice(0, getNameSliceLength())}
                                        {el.name.length > getNameSliceLength() && "..."}
                                    </p>

                                    <small>{formatAddress(el.creator)}</small>
                                    <br />


                                </div>
                            </div>
                            <div className={Style.NFTCardTwo_box_price}>
                                <div className={Style.NFTCardTwo_box_price_box}>
                                    <small>Price</small>
                                    <p>{formatNumber(parseFloat(el.price))} PLS</p>
                                </div>

                            </div>
                        </div>

                    </a>

                </Link>

            ))}
        </div>
    );
};

export default NFTCardTwo;

