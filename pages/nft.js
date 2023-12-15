
import React, { useContext } from "react";
import Head from "next/head";
import axios from "axios";
import { ethers } from "ethers";

// INTERNAL IMPORTS
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";
import { Brand, Error } from "../components/componentsindex";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "../Context/constants";


const rpcurl = "https://pulsechain-testnet.publicnode.com";



const NFTDetails = ({ nft, errorMsg }) => {
  const { setOpenError } = useContext(NFTMarketplaceContext);

  if (errorMsg) {
    setOpenError(true);
    return <Error message={errorMsg} />;
  }

  if (!nft) {
    return null;
  }

  // Title and meta tags to be used in Head
  const metaTitle = nft.name && nft.collectionSymbol ?
    `NFT: ${nft.name} (${nft.collectionSymbol}) - Pulse Plaza` :
    "NFT - Pulse Plaza";

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
      <Brand />
    </div>
  );
};

export async function getServerSideProps(context) {
  const tokenId = context.query.tokenId;
  let nft = null;
  let errorMsg = null;

  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcurl);
    const contract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, provider);

    const tokenURI = await contract.tokenURI(tokenId);
    const response = await axios.get(tokenURI);
    const nftData = response.data;

    const marketItems = await contract.fetchMarketItems();



    const marketItem = marketItems.find(item => item.tokenId.toNumber() === parseInt(tokenId));



    let ownerAddress = null;

    let price = null;



    if (marketItem) {
      price = ethers.utils.formatUnits(marketItem.price.toString(), 'ether');


    } else {
      ownerAddress = await contract.ownerOf(tokenId);
    }




    nft = {
      tokenId: tokenId,
      name: nftData.name,
      image: nftData.image,
      description: nftData.description,
      creator: nftData.creator,
      price: price,
      seller: marketItem ? marketItem.seller : '0x0000000000000000000000000000000000000000',
      owner: marketItem ? marketItem.owner : ownerAddress,
      tokenURI,
      collection: nftData.collection ? nftData.collection : '',
      collectionName: nftData.collection ? nftData.collection.name : '',
      collectionSymbol: nftData.collection ? nftData.collection.symbol : '',
      collectionAddress: nftData.collection ? nftData.collection.collectionAddress : '',
      collectionImage: nftData.collection ? nftData.collection.image : '',
      collectionDescription: nftData.collection ? nftData.collection.description : '',
    };



  } catch (err) {
    errorMsg = "NFT or NFT ID not found. Please check the URL.";
  }




  return {
    props: {
      nft,
      errorMsg,
    },
  };
}


export default NFTDetails;


