
import React, { useEffect, useState, useContext } from "react";
import Head from 'next/head';

import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";


//INTERNAL IMPORT
import Style from "../styles/resell-nft.module.css";
import formStyle from "../components/Form/Form.module.css";
import { Button, Loader } from "../components/componentsindex";


//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";



const resellToken = () => {

    const { createSale } = useContext(NFTMarketplaceContext);
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const router = useRouter();
    const { id, tokenURI } = router.query;

    const [isLoading, setIsLoading] = useState(false);


    const fetchNFT = async () => {
        if (!tokenURI) return;

        const { data } = await axios.get(tokenURI);

        setImage(data.image);
    };

    useEffect(() => {
        fetchNFT();
    }, [id, tokenURI]);



    const resell = async () => {


        setIsLoading(true); // Start loading
        try {
            await createSale(tokenURI, price, true, id);
            router.push("/profile");
        } catch (error) {
            console.log("Error while creating resale:", error);
        }
        setIsLoading(false); // Stop loading
    };




    // Title and meta tags to be used in Head
    const metaTitle = "Resell NFT - Pulse Plaza NFT Marketplace";

    const metaDescription = "Please set your new price in order to relist the NFT to the marketplace";


    return (

        <div className={Style.resellToken}>

            <Head>
                <title>{metaTitle}</title>

                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />

                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
            </Head>

            {isLoading && (
                <div className={Style.loaderOverlay}>
                    <Loader />
                </div>
            )}

            <div className={Style.resellToken_box}>

                <h1>Resell your NFT</h1>

                <h2>Please set your new price in order to relist the NFT to the marketplace</h2>

                <h3>The initially assigned collection cannot be changed anymore</h3>

                


                <div className={Style.resellToken_box_image}>
                    {
                        image && (
                            <Image
                                src={image}
                                alt="Resell NFT"
                                width={400}
                                height={400}
                            />
                        )}
                </div>


                <div className={formStyle.Form_box_input}>
                    <label htmlFor="name">New Price</label>
                    <input
                        type="number"
                        min={1}
                        placeholder="Resell Price in PLS"
                        className={formStyle.Form_box_input_userName}
                        onChange={(e) => setPrice(e.target.value)}
                        style={{width: "400px"}}
                    />
                </div>

                <br />
                <br />
                <br />

                <div className={Style.resellToken_box_btn}>
                    <Button
                        btnName="Resell NFT"
                        handleClick={() => resell()}
                    />
                </div>

            </div>

        </div>
    )
};

export default resellToken;

