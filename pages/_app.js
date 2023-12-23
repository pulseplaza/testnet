
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



        // Add Clarity Tracking Code
        if (typeof window !== "undefined") {
            (function (c, l, a, r, i, t, y) {
                c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt";
                y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
            })(window, document, "clarity", "script", "k9m0h1xypz");
        }



    }, []);



    const domain = process.env.NEXT_PUBLIC_DOMAIN;


    const socialMediaJsonLd = {
        "@context": "http://schema.org",
        "@type": "CreativeWork",
        "name": "Pulse Plaza NFT Marketplace",
        "url": domain,
        "sameAs": [
            "https://discord.com/invite/w7tVUW9Fb3",
            "https://twitter.com/PulsePlazaio",
            "https://www.facebook.com/PulsePlazaio",
            "https://instagram.com/pulseplazaio",
            "https://mastodon.social/@pulseplaza"
        ]
    };




    const defaultTitle = "Pulse Plaza NFT Marketplace";
    const defaultDescription = "Your NFT marketplace, which guarantees low fees and supports freedom with no middleman. Experience efficient, fair trading and creator-focused royalties.";
    const defaultImage = "/PLSPLAZA_logo_wide.png"


    const dynamicTitle = pageProps.title || defaultTitle;
    const dynamicDescription = pageProps.description || defaultDescription;
    const dynamicImage = pageProps.image || `${domain}${defaultImage}`;



    return (
        <div>
            <NFTMarketplaceProvider>

                <Head>
                    <title>{dynamicTitle}</title>

                    <meta name='viewport' content='width=device-width, initial-scale=1' />

                    <meta property="og:site_name" content="Pulse Plaza NFT Marketplace" />
                    <meta property="og:title" content={dynamicTitle} />
                    <meta property="og:description" content={dynamicDescription} />
                    <meta property="og:image" content={dynamicImage} />
                    <meta property="og:type" content="website" />

                    {/* Twitter Card */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={dynamicTitle} />
                    <meta name="twitter:description" content={dynamicDescription} />
                    <meta name="twitter:image" content={dynamicImage} />


                    <script type="application/ld+json">
                        {JSON.stringify(socialMediaJsonLd)}
                    </script>
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




