
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

  const router = useRouter();



  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
    collection: {}
  });



  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);



  // const { name, description, image, collectionSymbol } = nft;


  // Default fallbacks
  const defaultTitle = "NFT Details - Pulse Plaza NFT Marketplace";
  const defaultDescription = "Explore unique NFTs at Pulse Plaza, the leading NFT marketplace.";
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

        <meta name='viewport' content='width=device-width, initial-scale=1' />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={nft.name && nft.collectionSymbol ? 
          `NFT Details: ${nft.name} (${nft.collectionSymbol}) - Pulse Plaza NFT Marketplace` : 
          "NFT Details - Pulse Plaza NFT Marketplace"} />
        <meta property="og:description" content={nft.description || defaultDescription} />
        <meta property="og:image" content={nft.image || defaultImage} />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={nft.name && nft.collectionSymbol ? 
          `NFT Details: ${nft.name} (${nft.collectionSymbol}) - Pulse Plaza NFT Marketplace` : 
          "NFT Details - Pulse Plaza NFT Marketplace"} />
        <meta name="twitter:description" content={nft.description || defaultDescription} />
        <meta name="twitter:image" content={nft.image || defaultImage} />


      </Head>



      <NFTDetailsPage nft={nft} />

      {/* <Ads /> */}

      <Brand />

    </div>
  );
};



export default NFTDetails;


