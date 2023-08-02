import "../styles/globals.css";
import Head from 'next/head';
import { useState, useEffect } from 'react';

//INTERNAL IMPORT
import { NavBar, Footer, OverHead } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";


const MyApp = ({ Component, pageProps }) => {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        const savedTheme = window.localStorage.getItem('theme') || initialTheme;
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        window.localStorage.setItem('theme', theme);
    }, [theme]);


    // SET LANGUAGE ATTRIBUTE
    useEffect(() => {
        document.documentElement.lang = 'en';
    }, []);


    return (
        <div>
            <NFTMarketplaceProvider>
                <Head>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
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

