
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';


//INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { SearchWithFilter } from "../SearchPage/searchBarIndex";
import { Filter, Title, Banner, NFTCardTwo, Slider, Brand, Loader } from "../components/componentsindex";
import images from "../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const SearchPage = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [originalNfts, setOriginalNfts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const [sortOption, setSortOption] = useState('newest');




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
    if (router.isReady) {
      const queryParam = router.query.query;
      if (queryParam) {
        setSearchTerm(queryParam);
        const filteredResults = filterNFTs(queryParam);
        setNfts(filteredResults);
      }
    }
  }, [router.isReady, router.query]);
  




  const filterNFTs = (query, nftsToFilter = originalNfts) => {
    const lowerCaseQuery = query.toLowerCase();
    return nftsToFilter.filter(({ name, description, creator, collection }) =>
      name.toLowerCase().includes(lowerCaseQuery) ||
      description.toLowerCase().includes(lowerCaseQuery) ||
      creator.toLowerCase().includes(lowerCaseQuery) ||
      collection.name.toLowerCase().includes(lowerCaseQuery) ||
      collection.symbol.toLowerCase().includes(lowerCaseQuery)
    );
  };



  const onHandleSearch = (value) => {
    setSearchTerm(value);
    const filteredResults = filterNFTs(value);
    setNfts(filteredResults);
  };
  


  const onClearSearch = () => {
    setSearchTerm('');
    setNfts([...originalNfts]);
  };



  // Sorting function
  const handleSort = (selectedOption) => {
    let sortedNfts;
  
    switch (selectedOption) {
      case 'newest':
        sortedNfts = searchTerm ? filterNFTs(searchTerm, [...originalNfts]) : [...originalNfts];
        break;
      case 'oldest':
        const reversedNfts = [...originalNfts].reverse();
        sortedNfts = searchTerm ? filterNFTs(searchTerm, reversedNfts) : reversedNfts;
        break;
      case 'expensive':
        sortedNfts = [...nfts].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'cheapest':
        sortedNfts = [...nfts].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      default:
        sortedNfts = [...originalNfts];
    }
  
    setNfts(sortedNfts);
  };
  






  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
    handleSort(selectedOption);
  };





  // Title and meta tags to be used in Head
  const metaTitle = "Search Listed NFTs - Pulse Plaza NFT Marketplace";

  const metaDescription = "You can search by NFT name, description, collection name/symbol or creator address";


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
        paragraph="You can search by NFT name, description, collection name/symbol or creator address"
      />

      <SearchWithFilter
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
        onSortChange={handleSortChange}
        sortOption={sortOption}
        placeholder="Search NFTs"
      />



      {/* Filter Component */}
      {/* <Filter onSort={handleSortChange} value={sortOption} /> */}


      {nfts.length === 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
      <Brand />
    </div>
  );
};

export default SearchPage;

