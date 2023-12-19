import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";


//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";



const HeroSection = () => {
  const { titleData } = useContext(NFTMarketplaceContext);
  const router = useRouter();
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>PULSE PLAZA</h1>
          <h2>Creator-focused Decentralized NFT Marketplace on PulseChain</h2>
          <p>
            Discover the most degen NFTs of the metaverse. Mint your NFTs, sell them on Pulse Plaza and earn rewards.
          </p>
          <Button
            btnName="Start your search"
            handleClick={() => router.push("/search-nfts")}
          />
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero3}
            alt="Hero section"
            width={600}
            height={600}
            className={Style.heroSection_box_right_img}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;