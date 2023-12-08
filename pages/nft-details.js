
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';




//INTERNAL IMPORT
import { Button, Category, Brand, Ads } from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";


//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";




const NFTDetails = () => {

  const { currentAccount } = useContext(NFTMarketplaceContext);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
    collectionSymbol: "",
    description: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);



  const defaultImage = "/PLSPLAZA_logo_wide.png";


  return (
    <div>

      <Head>

        <title>
          {nft.name && nft.collectionSymbol ?
            `NFT Details: ${nft.name} (${nft.collectionSymbol}) - Pulse Plaza NFT Marketplace` :
            "NFT Details - Pulse Plaza NFT Marketplace"
          }
        </title>

        <meta property="og:title" content={nft.name && nft.collectionSymbol ? 
          `NFT Details: ${nft.name} (${nft.collectionSymbol}) - Pulse Plaza NFT Marketplace` : 
          "NFT Details - Pulse Plaza NFT Marketplace"} />
        <meta property="og:description" content={nft.description || "Explore this unique NFT at Pulse Plaza"} />
        <meta property="og:image" content={nft.image || defaultImage} />
        <meta property="og:type" content="website" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={nft.name && nft.collectionSymbol ? 
          `NFT Details: ${nft.name} (${nft.collectionSymbol}) - Pulse Plaza NFT Marketplace` : 
          "NFT Details - Pulse Plaza NFT Marketplace"} />
        <meta name="twitter:description" content={nft.description || "Explore this unique NFT at Pulse Plaza"} />
        <meta name="twitter:image" content={nft.image || defaultImage} />


      </Head>

      <NFTDetailsPage nft={nft} />

      {/* <Ads /> */}

      <Brand />

    </div>
  );
};



export default NFTDetails;

