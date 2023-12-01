/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    images: {
        domains: ["pulseplazatest.infura-ipfs.io"],
    },
};

module.exports = nextConfig;


