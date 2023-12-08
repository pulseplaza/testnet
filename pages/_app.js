
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
            script.src = 'https://www.googletagmanager.com/gtag/js?id=G-9QQP5QRSW0';
            script.async = true;
            document.head.appendChild(script);

            // Initialize Google Analytics
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-9QQP5QRSW0');
        }


    }, []);





    const defaultTitle = "Pulse Plaza NFT Marketplace";
    const title = pageProps.title || defaultTitle;

    const defaultImage = "/PLSPLAZA_logo_wide.png"
    const domain = process.env.NEXT_PUBLIC_DOMAIN;


    

    return (
        <div>
            <NFTMarketplaceProvider>

                <Head>
                    <title>{title}</title>
                    
                    <meta name='viewport' content='width=device-width, initial-scale=1' />

                    <meta property="og:site_name" content="PULSE PLAZA" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content="The NFT marketplace, which guarantees low fees and supports freedom with no middleman. Experience efficient, fair trading and creator-focused royalties." />
                    <meta property="og:image" content={`${domain}${defaultImage}`} />
                    <meta property="og:type" content="website" />

                    {/* Twitter Card */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content="The NFT marketplace, which guarantees low fees and supports freedom with no middleman. Experience efficient, fair trading and creator-focused royalties." />
                    <meta name="twitter:image" content={`${domain}${defaultImage}`} />

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



