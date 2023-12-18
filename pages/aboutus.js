import React from "react";
import Image from "next/image";
import Head from 'next/head';


//INTERNAL IMPORT
import Style from "../styles/aboutus.module.css";
import { Brand } from "../components/componentsindex";
import images from "../img";


const aboutus = () => {


    // Title and meta tags to be used in Head
    const metaTitle = "About Us - Pulse Plaza";

    const metaDescription = "At Pulse Plaza, we're not just an NFT marketplace but a revolution in digital art and creativity. Built on the innovative PulseChain blockchain, we offer a seamless and efficient experience for artists and collectors alike.";


    return (
        <div className={Style.aboutus}>

            <Head>
                <title>{metaTitle}</title>

                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />

                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
            </Head>


            <div className={Style.aboutus_box}>
                <div className={Style.aboutus_box_hero}>
                    <div className={Style.aboutus_box_hero_left}>
                        <h1>About Us</h1>
                        <p>
                            At Pulse Plaza, we're not just an NFT marketplace
                            but a revolution in digital art and creativity.
                            Built on the innovative PulseChain blockchain,
                            we offer a seamless and efficient experience for artists and collectors alike.
                        </p>
                    </div>
                    <div className={Style.aboutus_box_hero_right}>
                        <Image src={images.hero2} />
                    </div>
                </div>



                <div className={Style.aboutus_box_title}>
                    <h2>Our Foundation: PulseChain</h2>
                    <p>
                        Pulse Plaza thrives on the cutting-edge PulseChain blockchain. Why PulseChain?
                        It's simple: remarkably low gas fees and lightning-fast transactions.
                        This means more savings and efficiency for you, whether you're creating,
                        buying, or selling NFTs.
                    </p>
                </div>


                <div className={Style.aboutus_box_title}>
                    <h2>Decentralized and Liberated</h2>
                    <p>
                        We believe in the freedom of expression.
                        Pulse Plaza is a decentralized platform, ensuring there's no censorship over your NFTs or collections.
                        Your creative vision has no boundaries here. We celebrate the diversity of thought, art, and innovation.
                    </p>
                </div>


                <div className={Style.aboutus_box_title}>
                    <h2>A Haven for Image-Based NFTs</h2>
                    <p>
                        We specialize in image files. Whether it's digital art, photography,
                        or any other image-based masterpiece, Pulse Plaza is the ideal showcase.
                        Our platform is optimized to ensure your works look stunning and are securely traded.
                    </p>
                </div>



                <div className={Style.aboutus_box_title}>
                    <h2>Introducing Plaza Coin (PACO)</h2>
                    <p>
                        Innovation doesn't stop at our platform; it extends to how we support our artists.
                        Meet PACO, our integrated Plaza Coin.
                        This unique cryptocurrency is designed to fairly compensate creators through royalties.
                        Every time your NFT is sold, you earn PACO – a token of appreciation for your creativity.
                    </p>
                </div>


            </div>
            <Brand />
        </div>
    );
};

export default aboutus;