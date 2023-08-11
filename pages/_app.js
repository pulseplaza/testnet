
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

    return (
        <div>
            <NFTMarketplaceProvider>
                <Head>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                (function() {
                    try {
                        const savedTheme = localStorage.getItem('theme');
                        if (savedTheme) {
                            document.body.classList.add(savedTheme === 'dark' ? 'dark-mode' : '');
                        } else {
                            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                            document.body.classList.add(prefersDark ? 'dark-mode' : '');
                        }
                    } catch (e) {}
                })();
                `
                        }}
                    />
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


