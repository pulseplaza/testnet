
import React, { useEffect, useState, useContext } from "react";
import Head from 'next/head';


//INTERNAL IMPORT
import Style from "../styles/upload-nft.module.css";
import { CreateCollection } from "../UploadNFT/uploadNFTIndex";


//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";



const uploadNFT = () => {
    const { uploadToIPFS, createCollection } = useContext(NFTMarketplaceContext);

    return (
        <div className={Style.uploadNFT}>

            <Head>
                <title>Create New Collection - Pulse Plaza NFT Marketplace</title>
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
                        Supported image file types: BMP, JPG, JPEG, GIF, HEIF, PNG, SVG, TIF, TIFF, WEBP
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

