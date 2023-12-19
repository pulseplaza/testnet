

import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { ethers } from 'ethers';
import { NFTMarketplaceAddress, NFTMarketplaceABI } from '../../Context/constants';


export default async function sitemapHandler(req, res) {
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const contract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, provider);


  // Fetch collections
  const collections = await contract.getCollections();

  // Fetch market items (NFTs)
  const marketItems = await contract.fetchMarketItems();



  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;


  // Generate dynamic URLs for collections
  const collectionUrls = collections.map(collection => {
    return { url: `${baseUrl}/collection?collectionAddress=${collection.collectionAddress}` };
  });


  // Generate dynamic URLs for NFTs
  const nftUrls = marketItems.map(item => {
    return { url: `${baseUrl}/nft?tokenId=${item.tokenId.toString()}` };
  });



  // Static paths
  const staticPaths = [
    "/",
    "/search-nfts",
    "/search-collections",
    "/create-nft",
    "/create-collection",
    "/coin/tokenomics",
    "/coin/trade",
    "/aboutus",
    "/news",
    "/fees",
    "/contact",
  ];


  const combinedPaths = [...staticPaths, ...collectionUrls, ...nftUrls];


  const sitemapStream = new SitemapStream({ hostname: baseUrl });
  const xmlString = await streamToPromise(
    Readable.from(combinedPaths).pipe(sitemapStream)
  ).then(data => data.toString());

  res.setHeader('Content-Type', 'application/xml');
  res.write(xmlString);
  res.end();
}

