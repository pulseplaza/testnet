
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// import {
//   MdVerified,
//   MdCloudUpload,
//   MdTimer,
//   MdReportProblem,
//   MdOutlineDeleteSweep,
// } from "react-icons/md";

// import { BsThreeDots, BsDiscord, BsTwitter } from "react-icons/bs";

import { FaWallet, FaShareAlt, FaPercentage } from "react-icons/fa";

import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiSocialLinkedin,
  TiSocialYoutube,
} from "react-icons/ti";

import { HiOutlineUserCircle } from "react-icons/hi2";

import { RiMastodonFill, RiFacebookBoxFill } from "react-icons/ri";
import { BiTransferAlt, BiDollar } from "react-icons/bi";

//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button, Loader } from "../../components/componentsindex";
import { NFTTabs } from "../NFTDetailsIndex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NFTDescription = ({ nft }) => {
  // const [social, setSocial] = useState(false);
  // const [owner, setOwner] = useState(false);

  const [isLoading, setIsLoading] = useState(false);



  const [screenWidth, setScreenWidth] = useState(undefined);


  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    // Set the initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const formatAddress = (address) => {
    return ((screenWidth < 500 || (screenWidth >= 800 && screenWidth <= 1250))
      ? `${address.slice(0, 10)}...${address.slice(-10)}`
      : address);
  };


  const formatCollectionName = (name) => {
    if (!name) return "No Name"; // Or any default/fallback string you prefer

    if (screenWidth > 1400) {
      return name.length > 50 ? `${name.slice(0, 50)}...` : name;
    } else if (screenWidth >= 1100 && screenWidth <= 1400) {
      return name.length > 40 ? `${name.slice(0, 40)}...` : name;
    } else if (screenWidth >= 800 && screenWidth < 1100) {
      return name.length > 25 ? `${name.slice(0, 25)}...` : name;
    } else if (screenWidth >= 500 && screenWidth < 800) {
      return name.length > 50 ? `${name.slice(0, 50)}...` : name;
    } else {
      return name.length > 25 ? `${name.slice(0, 25)}...` : name; // For screens under 500px
    }
  };







  const router = useRouter();



  //SMART CONTRACT DATA
  const { buyNFT, currentAccount, fetchMyNFTsOrListedNFTs } = useContext(
    NFTMarketplaceContext
  );




  const handleBuyNFT = async () => {
    setIsLoading(true); // Start loading
    try {
      await buyNFT(nft);
      // Additional logic after purchase can be added here
    } catch (error) {
      console.error("Error during NFT purchase:", error);
    }
    setIsLoading(false); // Stop loading
  };



  // const openSocial = () => {
  //   setSocial(!social);
  // };



  // Prepare the collection query object for the Link component
  const collectionQuery = {
    creatorAddress: nft.creator,
    collectionAddress: nft.collectionAddress,
    name: nft.collectionName,
    symbol: nft.collectionSymbol,
    description: nft.collectionDescription,
    image: nft.collectionImage
  };





  return (
    <div className={Style.NFTDescription}>


      {isLoading && (
        <div className={Style.loaderOverlay}>
          <Loader />
        </div>
      )}


      <div className={Style.NFTDescription_box}>
        {/* //PART ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>NFT Details</p>

        </div>


        {/* //PART TWO */}
        <div className={Style.NFTDescription_box_profile}>
          <h1>{nft.name}</h1>
          <div className={Style.NFTDescription_box_profile_box}>

            <div className={Style.NFTDescription_box_profile_box_left}>
              <HiOutlineUserCircle
                size={50}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Creator Address</small> <br />
                <span>{nft.creator ? formatAddress(nft.creator) : "Loading..."}</span>

              </div>
            </div>


            <div className={Style.NFTDescription_box_profile_box_right}>
              <Image
                src={
                  nft.collectionImage
                }
                alt="Collection image"
                width={50}
                height={50}
                className={Style.NFTDescription_box_profile_box_left_img}
              />

              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>Collection</small> <br />

                <Link href={{ pathname: "/collection-details", query: collectionQuery }}>
                  <a className={Style.NFTDescription_box_profile_box_right_info_txt}>
                    {formatCollectionName(nft.collectionName)}
                  </a>
                </Link>

              </div>



            </div>
          </div>


          <div className={Style.NFTDescription_box_profile_biding}>
            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Price</small>
                <p>{parseFloat(nft.price).toLocaleString(undefined, { minimumFractionDigits: 2 })} PLS</p>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {currentAccount == nft.seller.toLowerCase() ? (
                <p>You listed this NFT</p>
              ) : currentAccount == nft.owner.toLowerCase() ? (
                <Button
                  icon=<FaWallet />
                  btnName="List on marketplace"
                  handleClick={() =>
                    router.push(
                      `/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                    )
                  }
                  classStyle={Style.button}
                />
              ) : (
                <Button
                  icon=<FaWallet />
                  btnName="Buy NFT"
                  handleClick={handleBuyNFT}
                  classStyle={Style.button}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
