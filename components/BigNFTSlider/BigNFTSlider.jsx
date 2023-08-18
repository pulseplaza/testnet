import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLine, TbArrowBigRightLine } from "react-icons/tb";
 


//INTERNAL IMPORT
import Style from "./BigNFTSlider.module.css";
import images from "../../img";
import Button from "../Button/Button";


const BigNFTSlider = () => {
    const [idNumber, setIdNumber] = useState(1);

    const sliderData = [
        {
            title: "Hello NFT 1",
            id: 1,
            name: "Pulse Minter 1",
            collection: "Test Collection 1",
            price: "600000 PLS",
            like: 2436767567,
            image: images.user1,
            nftImage: images.nft_image_1,
            time: {
                days: 17,
                hours: 21,
                minutes: 31,
                seconds: 19,
            },
        },
        {
            title: "Hello NFT 2",
            id: 2,
            name: "Pulse Minter 2",
            collection: "Test Collection 2",
            price: "21 PLS",
            like: 24763,
            image: images.user2,
            nftImage: images.nft_image_2,
            time: {
                days: 3,
                hours: 15,
                minutes: 11,
                seconds: 58,
            },
        },
        {
            title: "Hello NFT 3",
            id: 3,
            name: "Pulse Minter 3",
            collection: "Test Collection 3",
            price: "5555 PLS",
            like: 243,
            image: images.user3,
            nftImage: images.nft_image_3,
            time: {
                days: 7,
                hours: 22,
                minutes: 48,
                seconds: 8,
            },
        },
        {
            title: "Hello NFT 4",
            id: 4,
            name: "Pulse Minter 4",
            collection: "Test Collection 4",
            price: "562 PLS",
            like: 2,
            image: images.user4,
            nftImage: images.nft_image_1,
            time: {
                days: 20,
                hours: 12,
                minutes: 21,
                seconds: 25,
            },
        },
    ];


//------INCREMENT FUNCTION
const inc = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
        setIdNumber(idNumber + 1);
    }
}, [idNumber, sliderData.length]);

//------DECREMENT FUNCTION
const dec = useCallback(() => {
    if (idNumber > 0) {
        setIdNumber(idNumber - 1);
    }
}, [idNumber]);


//useEffect(() => {
//    inc();
//},[]);





return (
    <div className={Style.bigNFTSlider}>
        <div className={Style.bigNFTSlider_box}>
            <div className={Style.bigNFTSlider_box_left}>

                <h2>{sliderData[idNumber].title}</h2>

                <div className={Style.bigNFTSlider_box_left_creator}>
                    <div className={Style.bigNFTSlider_box_left_creator_profile}>
                        <Image
                            className={Style.bigNFTSlider_box_left_creator_profile_img}
                            src={sliderData[idNumber].image}
                            alt="Profile image"
                            width={50}
                            height={50}
                        />
                        <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                            <p>Creator</p>
                            <h4>
                                {sliderData[idNumber].name}{" "}
                                <span>
                                    <MdVerified />
                                </span>
                            </h4>
                        </div>
                    </div>

                    <div className={Style.bigNFTSlider_box_left_creator_collection}>
                        <AiFillFire className={Style.bigNFTSlider_box_left_creator_collection_icon}/>
                        <div className={Style.bigNFTSlider_box_left_creator_collection_info}>
                            <p>Collection</p>
                            <h4>{sliderData[idNumber].collection}</h4>
                        </div>
                    </div>

                </div>
                <div className={Style.bigNFTSlider_box_left_bidding}>
                    <div className={Style.bigNFTSlider_box_left_bidding_box}>
                        <small>Current Bid</small>
                        <p>{sliderData[idNumber].price} <span>$250</span></p>

                    </div>
                    <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
                       <MdTimer
                        className={Style.bigNFTSlider_box_left_bidding_box_icon} 
                       /> 
                       <span> Auction ending in</span>
                    </p>

                    <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>

                        <div
                            className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                        >
                            <p>{sliderData[idNumber].time.days}</p>
                            <span>days</span>
                        </div>

                        <div
                            className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                        >
                            <p>{sliderData[idNumber].time.hours}</p>
                            <span>hours</span>
                        </div>

                        <div
                            className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                        >
                            <p>{sliderData[idNumber].time.minutes}</p>
                            <span>min</span>
                        </div>

                        <div
                            className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                        >
                            <p>{sliderData[idNumber].time.seconds}</p>
                            <span>sec</span>
                        </div>

                    </div>

                    <div className={Style.bigNFTSlider_box_left_button}>
                    <Button btnName="Place" handleClick={() => {}} />
                    <Button btnName="View" handleClick={() => {}} />
                    </div>
                </div>
                <div className={Style.bigNFTSlider_box_left_sliderBtn}>
                    <TbArrowBigLeftLine
                        className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                        onClick={() => dec()}
                    />
                    <TbArrowBigRightLine
                        className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                        onClick={() => inc()}
                    />

                </div>
            </div>

            <div className={Style.bigNFTSlider_box_right}>
                <div className={Style.bigNFTSlider_box_right_box}>

                    <Image
                        src={sliderData[idNumber].nftImage}
                        alt="NFT image"
                        width={900}
                        height={900}
                        className={Style.bigNFTSlider_box_right_box_img}
                    />

                    <div className={Style.bigNFTSlider_box_right_box_like}>
                        <AiFillHeart />
                        <span>{sliderData[idNumber].like}</span>

                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BigNFTSlider;