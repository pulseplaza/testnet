
import React, { useEffect, useState, useContext } from "react";
import Head from 'next/head';


//INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter, Title } from "../components/componentsindex";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import images from "../img";
import { CollectionCard } from "../collectionPage/collectionIndex";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";



const searchPage = () => {
  const { getAllCollections, setError, currentAccount } = useContext(NFTMarketplaceContext);
  const [collections, setCollections] = useState([]);
  const [originalCollections, setOriginalCollections] = useState([]); // To store the original dataset

  useEffect(() => {
    getAllCollections()
      .then((items) => {
        console.log('My Collections:', items);
        const reversedItems = [...items].reverse(); // Reverse the order of collections
        setCollections(reversedItems || []);
        setOriginalCollections(reversedItems || []); // Store a copy of the original dataset in reversed order
      })
      .catch(error => {
        console.error("Error fetching collections:", error);
        setError("Please refresh the browser.", error);
        setCollections([]);
      });
  }, [currentAccount]);


  const onHandleSearch = (value) => {
    const searchTerm = value.toLowerCase();
    const filteredCollections = originalCollections.filter(({ name, symbol, creatorAddress }) =>
      name.toLowerCase().includes(searchTerm) ||
      symbol.toLowerCase().includes(searchTerm) ||
      creatorAddress.toLowerCase().includes(searchTerm)
    );
    setCollections(filteredCollections);
  };

  const onClearSearch = () => {
    setCollections(originalCollections); // Reset to original collections when search is cleared
  };

  return (
    <div className={Style.searchPage}>

      {/* <Banner bannerImage={images.creatorbackground2} /> */}

      <Head>
        <title>Search Collections - Pulse Plaza NFT Marketplace</title>
      </Head>


      <Title
        heading="Search Collections"
        paragraph="You can search by collection name/symbol or creator address"
      />

      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
        placeholder="Search Collections"
      />



      {collections.length === 0 ? <Loader /> : <CollectionCard collections={collections} />}



      <Brand />
    </div>
  );
};

export default searchPage;