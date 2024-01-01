/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "pulseplazatest.infura-ipfs.io",
            "testnet.pulseplaza.io",
            "nftstorage.link",
            "ipfs.nftstorage.link",
        ],
    },
};

module.exports = nextConfig;



