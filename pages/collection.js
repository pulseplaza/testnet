

import React, { useEffect, useState } from "react";
import Head from 'next/head';
import CollectionDetailsPage from "../CollectionDetailsPage/CollectionDetailsPage";
import { Brand, Error } from "../components/componentsindex";
import { ethers } from "ethers";
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "../Context/constants";

const rpcurl = "https://pulsechain-testnet.publicnode.com";

const CollectionDetails = ({ collectionAddress, errorMsg }) => {
  const [collection, setCollection] = useState({});
  const [error, setError] = useState(errorMsg);

  const fetchCollectionDetails = async (address) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(rpcurl);
      const contract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, provider);
      const collectionData = await contract.getCollectionDetails(address);
      setCollection(collectionData);
      address = address.toLowerCase();
    } catch (error) {
      console.error("Error fetching collection details:", error);
      setError("No collection found with requested collection address.");
    }
  };

  useEffect(() => {
    if (collectionAddress) {
      fetchCollectionDetails(collectionAddress);
    }
  }, [collectionAddress]);

  if (error) {
    return <Error message={error} />;
  }




  const metaTitle = collection.name && collection.symbol ?
    `Collection: ${collection.name} (${collection.symbol}) - Pulse Plaza` :
    "Collection - Pulse Plaza";

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
  let collectionAddress = context.query.collectionAddress || "";

  // console.log("Received collection address in getServerSideProps:", collectionAddress);

  let errorMsg = "";
  if (!collectionAddress) {
    errorMsg = "Wrong collection format. Please check the entered URL.";
  } else {
    // Convert to lowercase
    collectionAddress = collectionAddress.toLowerCase();
  }

  return {
    props: {
      collectionAddress,
      errorMsg
    },
  };
}


export default CollectionDetails;


