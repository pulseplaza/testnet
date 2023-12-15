
import React from "react";
import Head from 'next/head';


import { PiShoppingCartDuotone, PiHandCoinsDuotone, PiFireDuotone } from "react-icons/pi";

import { FiCopy } from "react-icons/fi";


import Style from "../../styles/tokenomics.module.css";

import { Brand, Title } from "../../components/componentsindex";



const TokenomicsBox = ({ item }) => {
    const { Icon } = item;
    return (
        <div className={Style.TokenomicsBox}>
            <div className={Style.TokenomicsBox_box}>
                <Icon />
                <span className={Style.TokenomicsBox_box_span}>{item.title}</span>
                <p className={Style.TokenomicsBox_box_description}>{item.description}</p>
            </div>
        </div>
    );
};


// Function to copy the contract address
const copyContractAddress = () => {
    const contractAddress = document.getElementById("contractAddress");
    contractAddress.select();
    navigator.clipboard.writeText(contractAddress.value);
};




const tokenomics = () => {
    const tokenomicsArray = [
        {
            title: "Auto-Buy",
            description: "Every NFT sale buys automatically PACO using 4% of the paid PLS amount.",
            Icon: PiShoppingCartDuotone,
        },
        {
            title: "Auto-Reward",
            description: "Half of these bought PACO goes directly to the NFT creator as royalties.",
            Icon: PiHandCoinsDuotone,
        },
        {
            title: "Buy-And-Burn",
            description: "The remaining half of the bought PACO gets burned inmediately.",
            Icon: PiFireDuotone,
        },
        // Add more items as needed
    ];


    // Title and meta tags to be used in Head
    const metaTitle = "Tokenomics - Coin - Pulse Plaza NFT Marketplace";

    const metaDescription = "What does Plaza Coin (PACO) actually do?";



    return (
        <div className={Style.tokenomics}>


            <Head>
                <title>{metaTitle}</title>

                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />

                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
            </Head>



            <div className={Style.tokenomics_title}>
                <Title
                    heading="Plaza Coin Tokenomics"
                    paragraph="What does Plaza Coin (PACO) actually do?"
                />
            </div>


            <div className={Style.tokenomics_details}>


                <div className={Style.tokenomics_details_boxes}>
                    {tokenomicsArray.map((item, index) => (
                        <TokenomicsBox key={index} item={item} />
                    ))}
                </div>
            </div>


            <div className={Style.tokenomics_info}>

                <p>
                    (Test Token) Name:&nbsp;
                    <a
                        href="https://scan.v4.testnet.pulsechain.com/token/0x13ca32a56D9A52810dF2FE0bBaD71462b0D209AD/token-transfers"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={Style.tokenomics_link}
                    >
                        Test Plaza Coin
                    </a>
                </p>


                <p>(Test Token) Symbol: tPACO</p>

                <div className={Style.tokenomics_info_address}>
                    <p>(Test Token) Contract:</p>
                    <div className={Style.tokenomics_info_address_content}>

                        <FiCopy onClick={copyContractAddress} className={Style.tokenomics_info_address_icon} />

                        <input
                            type="text"
                            value="0x13ca32a56d9a52810df2fe0bbad71462b0d209ad"
                            id="contractAddress"
                            readOnly
                            className={Style.tokenomics_info_address_input}
                        />

                    </div>
                </div>

                <p>(Test Token) Supply: 1,000,000,000 tPACO</p>
                <br />
                <small>For NFT creators: Copy the contract address and add it into your web3 wallet to hodl or sell your PACO royalty rewards.</small>


            </div>

            <div className={Style.brand}>
                <Brand />
            </div>

        </div>

    )
}

export default tokenomics;


