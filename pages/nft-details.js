
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
    collectionSymbol: "",
    description: "",
  });




  // Default fallbacks
  const defaultTitle = "NFT Details - Pulse Plaza NFT Marketplace";
  const defaultDescription = "Explore unique NFTs at Pulse Plaza, the leading NFT marketplace.";
  const defaultImage = "/PLSPLAZA_logo_wide.png";



  useEffect(() => {
    if (!router.isReady) return;
    // Update the NFT state with router query
    setNft({
      ...router.query,
      name: decodeURIComponent(router.query.name || ''),
      description: decodeURIComponent(router.query.description || ''),
      image: decodeURIComponent(router.query.image || ''),
      collectionSymbol: decodeURIComponent(router.query.collectionSymbol || '')
    });
  }, [router.isReady, router.query]);



  useEffect(() => {
    // Function to update document's meta tags
    const updateMetaTags = () => {
      document.title = nft.name && nft.collectionSymbol ?
        `NFT Details: ${nft.name} (${nft.collectionSymbol}) - Pulse Plaza NFT Marketplace` :
        defaultTitle;

      const updateMetaTag = (name, content) => {
        let meta = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
        if (meta) {
          meta.setAttribute('content', content);
        }
      };

      updateMetaTag('og:title', document.title);
      updateMetaTag('twitter:title', document.title);
      updateMetaTag('og:description', nft.description || defaultDescription);
      updateMetaTag('twitter:description', nft.description || defaultDescription);
      updateMetaTag('og:image', nft.image || defaultImage);
      updateMetaTag('twitter:image', nft.image || defaultImage);
    };

    updateMetaTags();
  }, [nft]);



  return (

    <div>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

      </Head>



      <NFTDetailsPage nft={nft} />

      {/* <Ads /> */}

      <Brand />

    </div>
  );
};



export default NFTDetails;

