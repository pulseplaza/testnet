
import React, { useEffect, useState, useContext } from "react";
import Head from 'next/head';


//INTERNAL IMPORT
import Style from "../styles/search-collections.module.css";
import { Brand, Loader } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Title } from "../components/componentsindex";

import { CollectionCard } from "../collectionPage/collectionIndex";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";



const searchPage = () => {
  const { getAllCollections, setError, currentAccount } = useContext(NFTMarketplaceContext);
  const [collections, setCollections] = useState([]);
  const [originalCollections, setOriginalCollections] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 36;



  useEffect(() => {
    getAllCollections()
      .then((items) => {
        console.log('My Collections:', items);
        const reversedItems = [...items].reverse();
        setCollections(reversedItems || []);
        setOriginalCollections(reversedItems || []);
      })
      .catch(error => {
        console.error("Error fetching collections:", error);
        setError("Please refresh the browser.", error);
        setCollections([]);
      });
  }, [currentAccount]);


  const onHandleSearch = (value) => {
    const searchTerm = value.toLowerCase();
    const filteredCollections = originalCollections.filter(({ name, description, symbol, creatorAddress }) =>
      name.toLowerCase().includes(searchTerm) ||
      symbol.toLowerCase().includes(searchTerm) ||
      description.toLowerCase().includes(searchTerm) ||
      creatorAddress.toLowerCase().includes(searchTerm)
    );
    setCollections(filteredCollections);
    setCurrentPage(1);
  };

  const onClearSearch = () => {
    setCollections(originalCollections);
    setCurrentPage(1);
  };



  // Pagination logic
  const getCurrentPageCollections = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return collections.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(collections.length / itemsPerPage);

  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };




  // Title and meta tags to be used in Head
  const metaTitle = "Search Collections - Pulse Plaza";

  const metaDescription = "You can search by collection name/symbol, description or creator address";


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
        heading="Search Collections"
        paragraph="You can search by collection name/symbol, description or creator address"
      />


      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
        placeholder="Search Collections"
      />


      {/* Pagination Controls */}
      <div className={Style.paginationControls}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => changePage(page)} disabled={page === currentPage}>
            {page}
          </button>
        ))}
      </div>


      {collections.length === 0 ? <Loader /> : <CollectionCard collections={getCurrentPageCollections()} />}


      {/* Pagination Controls */}
      <div className={Style.paginationControls}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => changePage(page)} disabled={page === currentPage}>
            {page}
          </button>
        ))}
      </div>


      <Brand />
    </div>
  );
};

export default searchPage;


