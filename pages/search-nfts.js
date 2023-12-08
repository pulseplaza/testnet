
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';


//INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter, Title, Banner, NFTCardTwo } from "../components/componentsindex";
import images from "../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const SearchPage = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [originalNfts, setOriginalNfts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();





  useEffect(() => {
    fetchNFTs()
      .then((items) => {
        const reversedItems = [...items].reverse();
        setOriginalNfts(reversedItems);
        setNfts(reversedItems);
      })
      .catch(error => {
        console.error("Error fetching NFTs:", error);
        setError("Please refresh the browser.", error);
      });
  }, []);

  useEffect(() => {
    if (router.query.query) {
      setSearchTerm(router.query.query);
      filterNFTs(router.query.query);
    }
  }, [router.query.query]);





  const filterNFTs = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredNfts = originalNfts.filter(({ name, creator, collection }) =>
      name.toLowerCase().includes(lowerCaseQuery) ||
      creator.toLowerCase().includes(lowerCaseQuery) ||
      collection.name.toLowerCase().includes(lowerCaseQuery) ||
      collection.symbol.toLowerCase().includes(lowerCaseQuery)
    );
    setNfts(filteredNfts);
  };

  const onHandleSearch = (value) => {
    setSearchTerm(value);
    filterNFTs(value);
  };

  const onClearSearch = () => {
    setSearchTerm('');
    setNfts([...originalNfts]);
  };



  // Title and meta tags to be used in Head
  const metaTitle = "Search Listed NFTs - Pulse Plaza NFT Marketplace";

  const metaDescription = "You can search by NFT name, collection name/symbol or creator address";


  return (
    <div className={Style.searchPage}>


      <Head>
        <title>{metaTitle}</title>

        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />

        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
      </Head>

      <Title
        heading="Search Listed NFTs"
        paragraph="You can search by NFT name, collection name/symbol or creator address"
      />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
        placeholder="Search NFTs"
        value={searchTerm}
      />
      {nfts.length === 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
      <Brand />
    </div>
  );
};

export default SearchPage;

