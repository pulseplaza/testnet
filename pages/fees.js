

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


    return (
        <div className={Style.Fees}>


            <Head>
                <title>Pulse Plaza NFT Marketplace - Fees</title>
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


