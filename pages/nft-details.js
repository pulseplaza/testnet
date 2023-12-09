
// import React, { useEffect, useState, useContext } from "react";
// import { useRouter } from "next/router";
// import Head from 'next/head';




// //INTERNAL IMPORT
// import { Button, Category, Brand, Ads } from "../components/componentsindex";
// import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";


// //IMPORT SMART CONTRACT DATA
// import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";




// const NFTDetails = () => {

//   // const { currentAccount } = useContext(NFTMarketplaceContext);

//   const [nft, setNft] = useState({
//     image: "",
//     tokenId: "",
//     name: "",
//     owner: "",
//     price: "",
//     seller: "",
//     collectionSymbol: "",
//     description: "",
//   });


//   const router = useRouter();

  
//   useEffect(() => {
//     if (!router.isReady) return;
//     setNft(router.query);
//   }, [router.isReady]);


  

//   const defaultImage = "/PLSPLAZA_logo_wide.png";

//   const defaultDescription = "NFT collection minted on Pulse Plaza";

//   // Title and meta tags to be used in Head
//   const metaTitle = nft.name && nft.collectionSymbol ?
//     `NFT Details: ${nft.name} (${nft.collectionSymbol}) - Pulse Plaza NFT Marketplace` :
//     "NFT Details - Pulse Plaza NFT Marketplace";

//   const metaDescription = nft.description || defaultDescription;


//   return (
//     <div>
//       <Head>
//         <title>{metaTitle}</title>

//         <meta property="og:title" content={metaTitle} />
//         <meta property="og:description" content={metaDescription} />
//         <meta property="og:image" content={defaultImage} />
//         <meta property="og:type" content="website" />

//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={metaTitle} />
//         <meta name="twitter:description" content={metaDescription} />
//         <meta name="twitter:image" content={defaultImage} />
//       </Head>

//       <NFTDetailsPage nft={nft} />

//       {/* <Ads /> */}

//       <Brand />

//     </div>
//   );
// };




// export default NFTDetails;



import React from "react";
import Head from 'next/head';
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";



//INTERNAL IMPORT
import { Button, Category, Brand, Ads } from "../components/componentsindex";



const NFTDetails = ({ nft }) => {
  // Title and meta tags to be used in Head
  const metaTitle = nft.name && nft.collectionSymbol ?
    `NFT Details: ${nft.name} (${nft.collectionSymbol}) - Pulse Plaza` :
    "NFT Details - Pulse Plaza";

  const metaDescription = nft.description || "NFT collection minted on Pulse Plaza";

  const defaultImage = "/PLSPLAZA_logo_wide.png";
  const imageUrl = nft.image || defaultImage;

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

      <NFTDetailsPage nft={nft} />

      {/* <Ads /> */}
      <Brand />
    </div>
  );
};

export async function getServerSideProps(context) {
  // Extract NFT data from the URL query parameters
  const { query } = context;
  const nft = {
    image: query.image || "",
    tokenId: query.tokenId || "",
    name: query.name || "",
    owner: query.owner || "",
    price: query.price || "",
    seller: query.seller || "",
    description: query.description || "",
    creator: query.creator || "",
    collectionName: query.collectionName || "",
    collectionSymbol: query.collectionSymbol || "",
    collectionAddress: query.collectionAddress || "",
    collectionImage: query.collectionImage || "",
    collectionDescription: query.collectionDescription || "",
    collectionTokens: query.collectionTokens || "",
  };

  return {
    props: {
      nft,
    },
  };
}

export default NFTDetails;
