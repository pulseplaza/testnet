/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["pulseplazatest.infura-ipfs.io"],
    },
};

module.exports = nextConfig;


