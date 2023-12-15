

require('dotenv').config(); 
const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

// List all static paths you want to include in your sitemap
// For dynamic paths, you might want to fetch them from your server or database
const paths = [
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

(async () => {
  const hostname = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

  const sitemapStream = new SitemapStream({ hostname });

  const xmlString = await streamToPromise(
    Readable.from(paths).pipe(sitemapStream)
  ).then((data) => data.toString());

  fs.writeFileSync('public/sitemap.xml', xmlString);
})();

