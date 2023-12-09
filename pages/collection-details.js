

import React from "react";
import Head from 'next/head';
import CollectionDetailsPage from "../CollectionDetailsPage/CollectionDetailsPage";
import { Button, Category, Brand, Ads } from "../components/componentsindex";

const CollectionDetails = ({ collection }) => {
  const metaTitle = collection.name && collection.symbol ?
    `Collection Details: ${collection.name} (${collection.symbol}) - Pulse Plaza` :
    "Collection Details - Pulse Plaza";

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
  const { query } = context;
  const collection = {
    collectionAddress: query.collectionAddress || "",
    creatorAddress: query.creatorAddress || "",
    name: query.name || "",
    symbol: query.symbol || "",
    image: query.image || "",
    description: query.description || "",
  };

  return {
    props: {
      collection,
    },
  };
}

export default CollectionDetails;

