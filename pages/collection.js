

import React, { useEffect, useState } from "react";
import Head from 'next/head';
import CollectionDetailsPage from "../CollectionDetailsPage/CollectionDetailsPage";
import { Brand, Error } from "../components/componentsindex";
import { ethers } from "ethers";
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "../Context/constants";

const rpcurl = "https://pulsechain-testnet.publicnode.com";





const CollectionDetails = ({ collectionData, errorMsg }) => {
  const [collection, setCollection] = useState(collectionData);

  useEffect(() => {
    if (!collectionData) {
      // Fetch collection data client-side if it wasn't provided server-side
      const fetchCollection = async () => {
        try {
          const provider = new ethers.providers.JsonRpcProvider(rpcurl);
          const contract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, provider);
          const fetchedCollection = await contract.getCollectionDetails(collectionData.address);
          setCollection(fetchedCollection);
        } catch (error) {
          console.error("Error fetching collection details:", error);
        }
      };
      fetchCollection();
    }
  }, [collectionData]);

  if (errorMsg) {
    return <Error message={errorMsg} />;
  }

  if (!collection) {
    return <div>Loading collection details...</div>;
  }





  const metaTitle = collection.name && collection.symbol ?
    `Collection: ${collection.name} (${collection.symbol}) - Pulse Plaza NFT Marketplace` :
    "Collection - Pulse Plaza NFT Marketplace";

  const metaDescription = collection.description || "Collection minted on Pulse Plaza";
  const defaultImage = "/PLSPLAZA_logo_wide.png";
  const imageUrl = collection.image || defaultImage;



  return (
    <div>
      <Head>
        <title>{metaTitle}</title>

        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={defaultImage} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>

      <CollectionDetailsPage collection={collection} />

      <Brand />
    </div>
  );
};


export async function getServerSideProps(context) {
  const collectionAddress = context.query.collectionAddress || "";
  let collectionData = null;
  let errorMsg = "";

  if (collectionAddress) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(rpcurl);
      const contract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, provider);
      const rawCollectionData = await contract.getCollectionDetails(collectionAddress.toLowerCase());

      // Add additional data fetching logic here if necessary

      // Combine all data into collectionData
      collectionData = {
        ...rawCollectionData,
        // Add additional properties as necessary
      };
    } catch (error) {
      console.error("Error fetching collection details:", error);
      errorMsg = "Unable to fetch collection details from collection address. Check the URL.";
    }
  } else {
    errorMsg = "Collection address not provided or invalid format. Check the URL.";
  }

  return {
    props: {
      collectionData,
      errorMsg
    },
  };
}






export default CollectionDetails;

