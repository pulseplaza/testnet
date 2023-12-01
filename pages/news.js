
import React, { useEffect, useState } from "react";
import Head from 'next/head';

//INTERNAL IMPORT
import Style from "../styles/news.module.css";
import { Title, Brand } from "../components/componentsindex";

const News = () => {
    const [currentTheme, setCurrentTheme] = useState("light");


    const loadTwitterScript = () => {

        const existingScript = document.getElementById("twitter-wjs");
        if (existingScript) {
            existingScript.remove();
        }


        const script = document.createElement("script");
        script.id = "twitter-wjs";
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);
    };


    const updateTheme = () => {
        const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
        setCurrentTheme(theme);
    };

    useEffect(() => {
        updateTheme();
        loadTwitterScript();


        return () => {
        };
    }, []);


    return (
        <div className={Style.news}>

            <Head>
                <title>Pulse Plaza NFT Marketplace - News</title>
            </Head>


            <div className={Style.news_title}>
                <Title
                    heading="Pulse Plaza News"
                    paragraph="Don't miss out the latest and most important Pulse Plaza posts on X"
                />
            </div>
            <div className={Style.news_feed}>
                <a
                    className="twitter-timeline"
                    data-lang="en"
                    data-dnt="true"
                    data-theme={currentTheme}
                    href="https://twitter.com/PulsePlazaio?ref_src=twsrc%5Etfw"
                >
                    Tweets by PulsePlazaio
                </a>
            </div>

            <Brand />

        </div>
    );
};

export default News;
