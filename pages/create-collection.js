
import React, { useEffect, useState, useContext } from "react";
import Head from 'next/head';


//INTERNAL IMPORT
import Style from "../styles/upload-nft.module.css";
import { CreateCollection } from "../UploadNFT/uploadNFTIndex";


//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";



const uploadNFT = () => {
    const { uploadToIPFS, createCollection } = useContext(NFTMarketplaceContext);



    // Title and meta tags to be used in Head
    const metaTitle = "Create New Collection - Pulse Plaza NFT Marketplace";

    const metaDescription = "You can set the preferred collection name, collection symbol and description";


    return (
        <div className={Style.uploadNFT}>

            <Head>
                <title>{metaTitle}</title>

                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />

                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
            </Head>

            <div className={Style.uploadNFT_box}>
                <div className={Style.uploadNFT_box_heading}>
                    <h1>Create New Collection</h1>
                    <p>
                        You can set the preferred collection name, collection symbol and description.
                    </p>
                    <p>
                        ⚠️ IMPORTANT: Anything you type in here will be irreversible once passed to the blockchain. Future changes will not be possible.
                    </p>
                </div>

                <div className={Style.uploadNFT_box_title}>
                    <h2>Mint a New Collection</h2>
                    <p>
                        Supported image file types: Static and animated image files
                    </p>
                    <p>
                        Maximal size: 20 MB
                    </p>
                </div>



                <div className={Style.uploadNFT_box_form}>
                    <CreateCollection
                        uploadToIPFS={uploadToIPFS}
                        createCollection={createCollection}
                    />
                </div>
            </div>
        </div>
    );
};

export default uploadNFT;

