

import React, { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";


import { FaWallet, FaShareAlt } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";



import { HiOutlineUserCircle } from "react-icons/hi2";



//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import { Button, Loader } from "../../components/componentsindex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";





const NFTDescription = ({ nft }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(undefined);



  // Get currentAccount from the context
  const { buyNFT, currentAccount } = useContext(NFTMarketplaceContext);


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
  



  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);




  const displayPrice = nft.price ? 
  `${parseFloat(nft.price).toFixed(8).replace(/\.?0+$/, "")} PLS` : 
  "Not Listed";




  const formatAddress = (address) => {
    return ((screenWidth < 500 || (screenWidth >= 800 && screenWidth <= 1250))
      ? `${address.slice(0, 10)}...${address.slice(-10)}`
      : address);
  };


  const formatCollectionName = (name) => {
    if (!name) return "No Name";


    if (screenWidth > 1400) {
      return name.length > 50 ? `${name.slice(0, 50)}...` : name;
    } else if (screenWidth >= 1100 && screenWidth <= 1400) {
      return name.length > 40 ? `${name.slice(0, 40)}...` : name;
    } else if (screenWidth >= 800 && screenWidth < 1100) {
      return name.length > 25 ? `${name.slice(0, 25)}...` : name;
    } else if (screenWidth >= 500 && screenWidth < 800) {
      return name.length > 50 ? `${name.slice(0, 50)}...` : name;
    } else {
      return name.length > 25 ? `${name.slice(0, 25)}...` : name;
    }
  };



  const router = useRouter();




  const handleBuyNFT = async () => {
    setIsLoading(true); // Start loading
    try {
      await buyNFT(nft);
    } catch (error) {
      console.error("Error during NFT purchase:", error);
    }
    setIsLoading(false);
  };



  // Prepare the collection query object for the Link component
  const collectionQuery = {
    collectionAddress: nft.collectionAddress,
    name: nft.collectionName,
    symbol: nft.collectionSymbol,
    creatorAddress: nft.creator,
    image: nft.collectionImage,
    description: nft.collectionDescription,
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


          <div className={Style.NFTDescription_box_share_box}>
            <FaShareAlt
              className={Style.NFTDescription_box_share_box_icon}
              onClick={openSocial}
            />

            {social && (
              <div ref={socialRef} className={Style.NFTDescription_box_share_box_social}>
                <a href="#" onClick={copyLinkToClipboard}>
                  <FiCopy /> Copy NFT URL
                </a>
              </div>
            )}
          </div>




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

                <Link href={`/collection?collectionAddress=${nft.collectionAddress}`}>


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


                <p>{displayPrice}</p>




              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {(currentAccount && nft.seller && currentAccount.toLowerCase() === nft.seller.toLowerCase()) ? (
                <p>You listed this NFT</p>
              ) : (currentAccount && nft.owner && currentAccount.toLowerCase() === nft.owner.toLowerCase()) ? (
                // Resell Button
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
