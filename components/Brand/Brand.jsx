import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Brand.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex";


const Brand = () => {
  return (
    <div className={Style.Brand}>
        <div className={Style.Brand_box}>
            <div className={Style.Brand_box_left}>
                <Image
                    src={images.logo}
                    alt="Pulse Plaza logo"
                    width={100}
                    height={100}
                />
                <h1>PULSE PLAZA</h1>
                <h2>The NFT marketplace on PulseChain</h2>
                <p>Buy, sell, and discover exclusive digital items with PLS.</p>
                <div className={Style.Brand_box_left_btn}>
                    <Button btnName="Create" handleClick={() => {}} />
                    <Button btnName="Discover" handleClick={() => {}} />

                </div>
            </div>
            <div className={Style.Brand_box_right}>
                <Image
                    src={images.earn}
                    alt="Pulse Plaza image"
                    width={800}
                    height={600}
                />
            </div>
        </div>
    </div>
  );
};

export default Brand;