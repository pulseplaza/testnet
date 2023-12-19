

import { SitemapStream, streamToPromise } from 'sitemap';
import { ethers } from 'ethers';
import { NFTMarketplaceAddress, NFTMarketplaceABI } from '../../Context/constants';


export default async function sitemapHandler(req, res) {
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const contract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, provider);


  // Fetch collections
  const collections = await contract.getCollections();

  // Fetch NFTs
  const marketItems = await contract.fetchMarketItems();



  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;


  // Generate dynamic URLs for collections
  const collectionUrls = collections.map(collection => {
    return {
      url: `${baseUrl}/collection?collectionAddress=${collection.collectionAddress}`,
      changefreq: 'monthly',
      priority: 0.5
    };
  });


  // Generate dynamic URLs for NFTs
  const nftUrls = marketItems.map(item => {
    return {
      url: `${baseUrl}/nft?tokenId=${item.tokenId.toString()}`,
      changefreq: 'monthly',
      priority: 0.5
    };
  });



  // Static paths
  const staticPaths = [
    { url: "/", changefreq: 'daily', priority: 1 },
    { url: "/search-nfts", changefreq: 'weekly', priority: 0.7 },
    { url: "/search-collections", changefreq: 'weekly', priority: 0.7 },
    { url: "/create-nft", changefreq: 'weekly', priority: 0.7 },
    { url: "/create-collection", changefreq: 'weekly', priority: 0.7 },
    { url: "/coin/tokenomics", changefreq: 'weekly', priority: 0.7 },
    { url: "/coin/trade", changefreq: 'weekly', priority: 0.7 },
    { url: "/aboutus", changefreq: 'weekly', priority: 0.7 },
    { url: "/news", changefreq: 'weekly', priority: 0.7 },
    { url: "/fees", changefreq: 'weekly', priority: 0.7 },
    { url: "/contact", changefreq: 'weekly', priority: 0.7 }
  ];


  const combinedPaths = [...staticPaths, ...collectionUrls, ...nftUrls];

  // Create the sitemap stream
  const sitemapStream = new SitemapStream({ hostname: baseUrl });



  // Add the URLs to the sitemap stream
  combinedPaths.forEach(url => {
    sitemapStream.write(url);
  });


  sitemapStream.end();


  // Generate the XML string and send the response
  const xmlString = await streamToPromise(sitemapStream).then(data => data.toString());


  res.setHeader('Content-Type', 'application/xml');
  res.write(xmlString);
  res.end();
}


