

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


  return (
    <div>

      <Head>
        {/* <title>Pulse Plaza NFT Marketplace - Collection Details</title> */}
        <title>{nft.name ? `Collection Details: ${nft.name} (${nft.symbol}) - Pulse Plaza NFT Marketplace` : "Collection Details - Pulse Plaza NFT Marketplace"}</title>

      </Head>


      <CollectionDetailsPage nft={nft} />

      {/* <Ads /> */}
      
      <Brand />
    </div>
  );
};



export default NFTDetails;