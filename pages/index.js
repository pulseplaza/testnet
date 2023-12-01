
import React, { useState, useEffect, useContext } from "react";
import Head from 'next/head';



//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
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



  // const { fetchNFTs } = useContext(NFTMarketplaceContext);
  // const [nfts, setNfts] = useState([]);
  // const [nftsCopy, setNftsCopy] = useState([]);

  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);



  // useEffect(() => {
  //   fetchNFTs().then((item) => {
  //     setNfts(item.reverse());
  //     setNftsCopy(item);
  //     console.log(nfts);
  //   });
  // }, []);



  useEffect(() => {
    let isMounted = true;

    // fetchNFTs()
    //   .then((item) => {
    //     if (isMounted) {
    //       setNfts(item.reverse());
    //       setNftsCopy(item);
    //       console.log(nfts);
    //     }
    //   })
    //   .catch(error => {
    //     console.error("Error fetching NFTs:", error);
    //   });


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
          // setOriginalCollections(items);
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




  return (
    <div className={Style.homePage}>

      <Head>
        <title>Welcome to the Pulse Plaza NFT Marketplace</title>
      </Head>


      <HeroSection />
      <Service />

      {/* <BigNFTSlider />
      <Title
        heading="Audio collecions"
        paragraph="Discover the most outstanding NFTs in all topics of life"
      />
      <AudioLive />

      {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreators={creators} />
      )}

      <Slider /> */}

      <Title
        heading="Latest Collections"
        paragraph="Explore the most popular NFT collections on PulseChain"
      />
      {collections.length === 0
        ? <Loader />
        : <CollectionCard collections={[...collections].reverse().slice(0, 24)} />
      }



      <Title
        heading="Latest NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life"
      />

      {/* <Filter /> */}

      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts.slice(0, 60)} />}




      {/* <Subscribe /> */}

      <Brand />


      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};


export default Home;


