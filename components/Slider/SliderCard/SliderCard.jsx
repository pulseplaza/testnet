import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";


//INTERNAL IMPORT
import Style from "./SliderCard.module.css";
import images from "../../../img";
import LikeProfile from "../../LikeProfile/LikeProfile";


const SliderCard = ({el, i}) => {
  return (
    <motion.div className={Style.sliderCard}>
        <div className={Style.sliderCard_box}>
            <motion.div className={Style.sliderCard_box_img}>
                <div style={{position:"relative"}}>
                    <Image
                        src={el.background}
                        className={Style.sliderCard_box_img_img}
                        alt="Slider profile"
                        width={500}
                        height={200}
                        style={{objectFit:"cover"}}
                    />
                </div>

            </motion.div>

            <div className={Style.sliderCard_box_title}>
                <p>NFT Video #1234</p>
                <div className={Style.sliderCard_box_title_like}>
                    {/*<LikeProfile /> */}
                    <small>1 of 100</small>

                </div>

            </div>

            <div className={Style.sliderCard_box_price}>
                <div className={Style.sliderCard_box_price_box}>
                    <small>Current bid</small>
                    <p>1000 PLS</p>
                </div>

                <div className={Style.sliderCard_box_price_time}>
                    <small>Remaining time</small>
                    <p>13h : 15m : 20s</p>
                </div>
            </div>
        </div>
    </motion.div>
  );
};

export default SliderCard;