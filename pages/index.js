
import React, { useState, useEffect, useContext } from "react";
import Head from 'next/head';



//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  Title,
  NFTCard,
  Brand,
  Loader,
} from "../components/componentsindex";

import { CollectionCard } from "../collectionPage/collectionIndex";


// import { getTopCreators } from "../TopCreators/TopCreators";



//IMPORTING CONTARCT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";


const Home = () => {
  const { checkIfWalletConnected, fetchNFTs, getAllCollections } = useContext(
    NFTMarketplaceContext
  );

  useEffect(() => {
    checkIfWalletConnected();
  }, []);




  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);





  useEffect(() => {
    let isMounted = true;




    fetchNFTs()
      .then((item) => {
        if (isMounted) {
          setNfts(item.reverse());
        }
      })
      .catch(error => {
        console.error("Error fetching NFTs:", error);
      });

    getAllCollections()
      .then((items) => {
        if (isMounted) {
          setCollections(items);
        }
      })
      .catch(error => {
        console.error("Error fetching collections:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);


  // //CREATOR LIST
  // const creators = getTopCreators(nfts);


  // Title and meta tags to be used in Head
  const metaTitle = "Welcome to Pulse Plaza - The Creator-focused Decentralized NFT Marketplace on PulseChain";
 




  return (
    <div className={Style.homePage}>

      <Head>
        <title>{metaTitle}</title>

        <meta property="og:title" content={metaTitle} />
        {/* <meta property="og:description" content={metaDescription} /> */}

        <meta name="twitter:title" content={metaTitle} />
        {/* <meta name="twitter:description" content={metaDescription} /> */}
      </Head>


      <HeroSection />
      <Service />



      <Title
        heading="Latest Collections"
        paragraph="Explore the most popular NFT collections on Pulse Plaza"
      />
      {collections.length === 0
        ? <Loader />
        : <CollectionCard collections={[...collections].reverse().slice(0, 36)} />
      }



      <Title
        heading="Latest NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life"
      />


      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts.slice(0, 60)} />}




      <Brand />


      <br></br>
      <br></br>
    </div>
  );
};


export default Home;


