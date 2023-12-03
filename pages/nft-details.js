
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';




//INTERNAL IMPORT
import { Button, Category, Brand } from "../components/componentsindex";
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



  const defaultImage = "/PLSPLAZA_logo_wide.png"
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const imageUrl = decodeURIComponent(nft.image);


  return (
    <div>

      <Head>
        <title>{nft.name ? `Pulse Plaza NFT Marketplace - NFT Details: ${nft.name}` : "Pulse Plaza NFT Marketplace - NFT Details"}</title>

      </Head>

      <NFTDetailsPage nft={nft} />


      <Brand />

    </div>
  );
};



export default NFTDetails;

