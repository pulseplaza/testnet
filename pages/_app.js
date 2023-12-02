
import "../styles/globals.css";
import Head from 'next/head';
import { useState, useEffect } from 'react';

import { NavBar, Footer, OverHead } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";



const MyApp = ({ Component, pageProps }) => {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTheme = window.localStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme);
            } else {
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                setTheme(prefersDark ? 'dark' : 'light');
            }
        }
    }, []);

    useEffect(() => {
        if (theme) {
            document.body.classList.toggle('dark-mode', theme === 'dark');
            window.localStorage.setItem('theme', theme);
        }
    }, [theme]);




    useEffect(() => {
        document.documentElement.lang = 'en';
    }, []);




    const defaultTitle = "Pulse Plaza NFT Marketplace";
    const title = pageProps.title || defaultTitle;

    const defaultImage = "/PLSPLAZA_logo.png"




    return (
        <div>
            <NFTMarketplaceProvider>
                <Head>
                    <title>{title}</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />

                    <meta property="og:title" content={title} />
                    <meta property="og:site_name" content="Pulse Plaza" />
                    <meta property="og:description" content="The NFT Marketplace on PulseChain" />
                    <meta property="og:image" content={`https://testnet.pulseplaza.io${defaultImage}`} />
                    <meta property="og:type" content="website" />

                </Head>
                <OverHead />
                <NavBar theme={theme} setTheme={setTheme} />
                <Component {...pageProps} />
                <Footer />
            </NFTMarketplaceProvider>
        </div>
    );
};

export default MyApp;



