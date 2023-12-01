
import React, { useState, useEffect, useContext, useRef } from "react";

// import Image from "next/image";
// import Link from "next/link";

import { useRouter } from "next/router";

// import {
//   MdVerified,
//   MdCloudUpload,
//   MdTimer,
//   MdReportProblem,
//   MdOutlineDeleteSweep,
// } from "react-icons/md";

// import { BsThreeDots, BsDiscord, BsTwitter } from "react-icons/bs";

import { FaShareAlt } from "react-icons/fa";

// import {
//   TiSocialTwitter,
//   TiSocialFacebook,
//   TiSocialInstagram,
//   TiArrowSortedDown,
//   TiArrowSortedUp,
//   TiSocialLinkedin,
//   TiSocialYoutube,
// } from "react-icons/ti";

import { FiCopy } from "react-icons/fi";

// import { RiMastodonFill, RiFacebookBoxFill } from "react-icons/ri";
// import { BiTransferAlt, BiDollar } from "react-icons/bi";



//INTERNAL IMPORT
import Style from "./CollectionDescription.module.css";
// import images from "../../img";
import { Button } from "../../components/componentsindex";
// import { NFTTabs } from "../CollectionDetailsIndex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";


const CollectionDescription = ({ nft }) => {
  const [social, setSocial] = useState(false);
  const socialRef = useRef();




   // Function to toggle social menu
   const openSocial = (event) => {
    event.stopPropagation(); // Prevent triggering the global click when opening
    setSocial(prevSocial => !prevSocial);
  };

  // Function to handle global click
  const handleGlobalClick = event => {
    if (socialRef.current && !socialRef.current.contains(event.target)) {
      setSocial(false);
    }
  };

  // Effect to manage global click listener
  useEffect(() => {
    if (social) {
      document.addEventListener('mousedown', handleGlobalClick);
    } 

    return () => {
      document.removeEventListener('mousedown', handleGlobalClick);
    };
  }, [social]);





  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied to clipboard!");
      setSocial(false); // Close the social menu after copying
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  const [screenWidth, setScreenWidth] = useState();

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatAddress = (address) => {
    return ((screenWidth < 450 || (screenWidth >= 750 && screenWidth <= 1100))
      ? `${address.slice(0, 10)}...${address.slice(-10)}`
      : address);
  };




  const { buyNFT, currentAccount, fetchMyNFTsOrListedNFTs } = useContext(NFTMarketplaceContext);






  return (
    <div className={Style.CollectionDescription}>
      <div className={Style.CollectionDescription_box}>
        <div className={Style.CollectionDescription_box_share}>
          <p>Collection Details</p>


          <div className={Style.CollectionDescription_box_share_box}>
            <FaShareAlt
              className={Style.CollectionDescription_box_share_box_icon}
              onClick={openSocial}
            />
            {social && (
              <div ref={socialRef} className={Style.CollectionDescription_box_share_box_social}>
                <a href="#" onClick={copyLinkToClipboard}>
                  <FiCopy /> Copy Collection URL
                </a>
              </div>
            )}
          </div>


          
        </div>

        <div className={Style.CollectionDescription_box_profile}>
          <h1>{nft.name}</h1>
          <small>Collection Symbol</small><br />
          <h2>{nft.symbol}</h2>
          <br /><br />
          <small>Description</small><br />
          <h3>{nft.description}</h3>
          <br /><br />
          <small>Creator Address</small><br />
          <span>{formatAddress(nft.creatorAddress)}</span>
          <br /><br />
          <small>Collection Address</small><br />
          <span>{formatAddress(nft.collectionAddress)}</span>
        </div>
      </div>
    </div>
  );
};

export default CollectionDescription;


