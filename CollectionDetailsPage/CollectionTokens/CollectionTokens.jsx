
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

import Link from 'next/link';

// import { useRouter } from 'next/router';
// import queryString from 'query-string';

//INTERNAL IMPORT
import { Loader } from "../../components/componentsindex";
import Style from "./CollectionTokens.module.css";

import { ethers } from "ethers";
import { NFTMarketplaceABI, NFTMarketplaceAddress } from "../../Context/constants";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";


const CollectionTokens = ({ collection }) => {
  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [tokens, setTokens] = useState([]);

  const [screenWidth, setScreenWidth] = useState(undefined);

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);


    fetchNFTs()
      .then((items) => {
        if (isMounted) {
          setTokens(items)
          setIsLoading(false);
        }

      })
      .catch(error => {
        console.error("Error fetching NFTs:", error);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);



  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Set the initial screenWidth
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);




  // Dynamically determine the slice length based on screen width
  const getNameSliceLength = () => {
    if (screenWidth <= 425) {
      return 30; // Adjust as needed for very small screens
    } else if (screenWidth <= 770) {
      return 18; // Adjust for small screens
    } else if (screenWidth <= 1200) {
      return 18; // Adjust for medium screens
    } else if (screenWidth <= 1500) {
      return 10; // Adjust for large screens
    } else {
      return 12; // Adjust for very large screens
    }
  };






  const formatAddress = (inputString) =>
    inputString.length > 9
      ? inputString.slice(0, 6) + "..." + inputString.slice(-6)
      : inputString;



  // Function to handle click on NFT
  const handleNFTClick = (token) => {
    console.log("NFT Clicked:", token);
    // Perform action on click, like navigate to NFT detail page
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
    <div className={Style.box_collectionTokens}>
      <h1>Listed NFTs in this Collection</h1>

      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>

      ) : (
        <div className={Style.collectionTokens}>
          {tokens
            .filter(token => token.collection.collectionAddress === collection.collectionAddress)
            .reverse() // Reverse the copy for rendering
            .map(token => (
              <Link href={{ pathname: "/nft-details", query: token }} key={token.id} passHref>
                <a className={Style.collectionTokens_link}>
                  <div
                    className={Style.collectionTokens_box}
                    key={token.id}
                    onClick={() => handleNFTClick(token)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image
                      src={token.image}
                      className={Style.collectionTokens_box_img}
                      alt="NFT image"
                      width={400}
                      height={250}
                    // style={{ width: "100%", height: "150px" }}
                    />



                    <div className={Style.collectionTokens_box_title}>
                      <div className={Style.collectionTokens_box_title_info}>

                      <h3>{token.name.slice(0, getNameSliceLength())}{token.name.length > getNameSliceLength() && "..."}</h3>

                        <p> </p>
                        <br />

                        <p>Seller</p>
                        <small>{formatAddress(token.seller)}</small>


                        <p> </p>
                        <br />

                        <p>Price</p>

                        <small>{formatNumber(parseFloat(token.price))} PLS</small>



                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default CollectionTokens;

