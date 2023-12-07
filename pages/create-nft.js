
import React, { useEffect, useState, useContext } from "react";
import Head from 'next/head';


//INTERNAL IMPORT
import Style from "../styles/upload-nft.module.css";
import { UploadNFT } from "../UploadNFT/uploadNFTIndex";


//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";




const uploadNFT = () => {
    const { uploadToIPFS, createNFT, currentAccount, getCollectionsByUser } = useContext(NFTMarketplaceContext);

    const [mycollections, setMyCollections] = useState([]);

    useEffect(() => {
        getCollectionsByUser()
            .then((items) => {
                console.log('My Collections:', items)
                setMyCollections(items || []);
            })
            .catch(error => {
                console.error("Error fetching collections:", error);
                setMyCollections([]);
            });
    }, [currentAccount]);

    return (
        <div className={Style.uploadNFT}>

            <Head>
                <title>Create New NFT - Pulse Plaza NFT Marketplace</title>
            </Head>

            <div className={Style.uploadNFT_box}>
                <div className={Style.uploadNFT_box_heading}>
                    <h1>Create New NFT</h1>
                    <p>
                        You can set the preferred NFT name and description.
                    </p>
                    <p>
                        ⚠️ IMPORTANT: Anything you type in here will be irreversible once passed to the blockchain. Future changes will not be possible.
                    </p>
                </div>

                <div className={Style.uploadNFT_box_title}>
                    <h2>Mint a New NFT</h2>
                    <p>
                        Supported image file types: BMP, JPG, JPEG, GIF, HEIF, PNG, SVG, TIF, TIFF, WEBP
                    </p>
                    <p>
                        Maximal size: 20 MB
                    </p>
                </div>

                <div className={Style.uploadNFT_box_form}>
                    <UploadNFT
                        uploadToIPFS={uploadToIPFS}
                        createNFT={createNFT}
                        mycollections={mycollections}
                    />

                </div>
            </div>
        </div>
    );
};

export default uploadNFT;
