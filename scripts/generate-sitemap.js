

// require('dotenv').config();
// const fs = require('fs');
// const { SitemapStream, streamToPromise } = require('sitemap');
// const { Readable } = require('stream');
// const { ethers } = require("ethers");


// // Import contract address and ABI from your constants
// const { NFTMarketplaceAddress, NFTMarketplaceABI } = require("../Context/constants");



// // Static paths
// const staticPaths = [
//   "/",
//   "/search-nfts",
//   "/search-collections",
//   "/create-nft",
//   "/create-collection",
//   "/coin/tokenomics",
//   "/coin/trade",
//   "/aboutus",
//   "/news",
//   "/fees",
//   "/contact",
// ];




// const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
// console.log("RPC URL:", rpcUrl); // Debug log



// async function fetchDynamicUrlsFromBlockchain() {
//   console.log("Fetching dynamic URLs from blockchain...");
//   const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
//   const contract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, provider);

//   const marketItems = await contract.fetchMarketItems();
//   console.log("Market Items:", marketItems);
//   let dynamicUrls = [];
//   const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

//   marketItems.forEach(item => {
//     dynamicUrls.push(`${baseUrl}/nft?tokenId=${item.tokenId}`);
//   });

//   console.log("Dynamic URLs fetched:", dynamicUrls);
//   return dynamicUrls;
// }



// (async () => {
//   try {
//     const hostname = process.env.NEXT_PUBLIC_DOMAIN;
//     console.log("Generating sitemap..."); // Debug log

//     const dynamicUrls = await fetchDynamicUrlsFromBlockchain();
//     const combinedPaths = [...staticPaths, ...dynamicUrls];

//     const sitemapStream = new SitemapStream({ hostname });
//     const xmlString = await streamToPromise(Readable.from(combinedPaths).pipe(sitemapStream)).then((data) => data.toString());

//     console.log("Writing sitemap to file..."); // Debug log
//     fs.writeFileSync('public/sitemap.xml', xmlString);
//     console.log("Sitemap successfully written to 'public/sitemap.xml'"); // Debug log
//   } catch (error) {
//     console.error('Error generating sitemap:', error);
//   }
// })();




