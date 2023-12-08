
import "../styles/globals.css";
import Head from "next/head";
import { useState, useEffect } from "react";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

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


        // Add Google Analytics Script
        if (typeof window !== "undefined") {
            const script = document.createElement('script');
            script.src = 'https://www.googletagmanager.com/gtag/js?id=G-Y9SSVS1LG4';
            script.async = true;
            document.head.appendChild(script);

            // Initialize Google Analytics
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-Y9SSVS1LG4');
        }


    }, []);





    const defaultTitle = "Pulse Plaza NFT Marketplace";
    const defaultDescription = "The NFT marketplace, which guarantees low fees and supports freedom with no middleman. Experience efficient, fair trading and creator-focused royalties.";
    const defaultImage = "/PLSPLAZA_logo_wide.png"
    const domain = process.env.NEXT_PUBLIC_DOMAIN;


    const dynamicTitle = pageProps.title || defaultTitle;
    const dynamicDescription = pageProps.description || defaultDescription;
    const dynamicImage = pageProps.image || `${domain}${defaultImage}`;

    

    return (
        <div>
            <NFTMarketplaceProvider>

                <Head>
                    <title>{dynamicTitle}</title>

                    <meta name='viewport' content='width=device-width, initial-scale=1' />

                    <meta property="og:site_name" content="PULSE PLAZA" />
                    <meta property="og:title" content={dynamicTitle} />
                    <meta property="og:description" content={dynamicDescription} />
                    <meta property="og:image" content={dynamicImage} />
                    <meta property="og:type" content="website" />

                    {/* Twitter Card */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={dynamicTitle} />
                    <meta name="twitter:description" content={dynamicDescription} />
                    <meta name="twitter:image" content={dynamicImage} />

                </Head>


                <OverHead />
                <NavBar theme={theme} setTheme={setTheme} />
                <Component {...pageProps} />
                <Footer />
                
                <Analytics />
                <SpeedInsights />

            </NFTMarketplaceProvider>
        </div>
    );
};

export default MyApp;




