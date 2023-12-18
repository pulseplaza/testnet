

import React from "react";
import Head from 'next/head';


//INTERNAL IMPORT
import Style from "../styles/fees.module.css";
import Fees from "../Fees/Fees";
import { Brand, Title } from "../components/componentsindex"




const fees = () => {

    const feesArray = [
        {
            plan: "NFT Purchase",
            price: "6%",
            service: [
                "2% PLS marketplace fee",
                <span>2% PLS swapped for <a href="/coin/tokenomics">PACO</a> to pay royalties to the NFT creator</span>,
                <span>2% PLS swapped for <a href="/coin/tokenomics">PACO</a> to burn</span>
            ],
        },
        {
            plan: "NFT Listing",
            price: "200 PLS",
            service: [
                <span style={{ color: 'red' }}>(1 tPLS on Testnet)</span>,
                "Applies on every new NFT mint, which automatically lists your NFT.",
                "Applies to every NFT relisting after previously purchasing an NFT",
            ],
        },
        {
            plan: "New Collection",
            price: "8000 PLS",
            service: [
                <span style={{ color: 'red' }}>(5 tPLS on Testnet)</span>,
                "Applies on every new creation of an NFT collection. (Once you created your collection, you can add as many NFTs as you wish into it.)",
            ],
        },
    ];


    // Title and meta tags to be used in Head
    const metaTitle = "Fees - Pulse Plaza";
    const metaDescription = "Pulse Plaza pricing and fees structure";


    return (
        <div className={Style.Fees}>


            <Head>
                <title>{metaTitle}</title>

                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />

                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
            </Head>


            <Title
                heading="Fees"
                paragraph="Pulse Plaza pricing and fees structure"
            />

            <div className={Style.Fees_box}>

                <div className={Style.Fees_box_box}>
                    {feesArray.map((el, i) => (
                        <Fees key={i + 1} i={1} el={el} />
                    ))}
                </div>
            </div>
            <Brand />
        </div>
    );
};

export default fees;


