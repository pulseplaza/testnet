

import React, { useEffect, useState, useContext } from "react";
import Head from 'next/head';


import { useRouter } from "next/router";


//INTERNAL IMPORT
import { Button, Category, Brand, Ads } from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";
import CollectionDetailsPage from "../CollectionDetailsPage/CollectionDetailsPage";


//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";




const NFTDetails = () => {

  const { currentAccount } = useContext(NFTMarketplaceContext);

  const [nft, setNft] = useState({
    collectionAddress: "",
    creatorAddress: "",
    name: "",
    symbol: "",
    image: "",
    description: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
    console.log('setted')
  }, [router.isReady]);


  const defaultDescription = "Collection minted on Pulse Plaza";
  const defaultImage = "/PLSPLAZA_logo_wide.png";

  // Title and meta tags to be used in Head
  const metaTitle = nft.name && nft.symbol ?
    `Collection Details: ${nft.name} (${nft.symbol}) - Pulse Plaza NFT Marketplace` :
    "Colelction Details - Pulse Plaza NFT Marketplace";

  const metaDescription = nft.description || defaultDescription;


  return (
    <div>
      <Head>
        <title>{metaTitle}</title>

        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={defaultImage} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={defaultImage} />
      </Head>


      <CollectionDetailsPage nft={nft} />

      {/* <Ads /> */}

      <Brand />
    </div>
  );
};



export default NFTDetails;