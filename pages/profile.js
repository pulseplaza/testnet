
import React, { useState, useEffect, useContext } from "react";
import Head from 'next/head';


//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title, Loader } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTabs,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";



//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";



const author = () => {


  // True/False - the header tab is clocked or not
  const [listed, setListed] = useState(true);
  const [collectibles, setCollectibles] = useState(false);
  const [tab_mycollection, setTabMyCollections] = useState(false);



  //IMPORT SMART CONTRACT DATA
  const { fetchMyNFTsOrListedNFTs, currentAccount, getCollectionsByUser } = useContext(NFTMarketplaceContext);

  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [mycollections, setMyCollections] = useState([]);





  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchItemsListed")
      .then((items) => {
        const reversedItems = [...items].reverse();
        setMyNFTs(reversedItems || []);
      })
      .catch(error => {
        console.error("Error fetching listed items:", error);
        setMyNFTs([]);
      });
  }, [fetchMyNFTsOrListedNFTs]);




  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchMyNFTs")
      .then((items) => {
        const reversedItems = [...items].reverse();
        setNfts(reversedItems || []);
      })
      .catch(error => {
        console.error("Error fetching NFTs:", error);
        setNfts([]);
      });
  }, [fetchMyNFTsOrListedNFTs]);



  useEffect(() => {
    getCollectionsByUser()
      .then((items) => {
        console.log('My Collections:', items);
        const reversedItems = [...items].reverse();
        setMyCollections(reversedItems || []);
      })
      .catch(error => {
        console.error("Error fetching collections:", error);
        setMyCollections([]);
      });
  }, [currentAccount]);




  return (
    <div className={Style.author}>

      <Head>
        <title>Profile - Pulse Plaza NFT Marketplace</title>
      </Head>

      {/* <Banner bannerImage={images.creatorbackground1} /> */}

      <AuthorProfileCard currentAccount={currentAccount} />

      <AuthorTabs
        setListed={setListed}
        setCollectibles={setCollectibles}
        setMyCollections={setTabMyCollections}
      />


      <AuthorNFTCardBox
        listed={listed}
        collectibles={collectibles}
        tab_mycollection={tab_mycollection}
        nfts={nfts}
        myNFTs={myNFTs}
        mycollections={mycollections}
      />



      <Brand />

    </div>
  );
};

export default author;


