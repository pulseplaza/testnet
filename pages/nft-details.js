
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
    collection: {}
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);




  return (
    <div>

      <Head>

        <title>
          {nft.name && nft.collectionSymbol ?
            `NFT Details: ${nft.name} (${nft.collectionSymbol}) - Pulse Plaza NFT Marketplace` :
            "NFT Details - Pulse Plaza NFT Marketplace"
          }
        </title>

      </Head>

      <NFTDetailsPage nft={nft} />

      {/* <Ads /> */}

      <Brand />

    </div>
  );
};



export default NFTDetails;

