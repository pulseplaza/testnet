
import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Brand.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex";


// IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";


const Brand = () => {

    const router = useRouter();

    const { currentAccount, connectWallet } = useContext(NFTMarketplaceContext);


    return (
        <div className={Style.Brand}>
            <div className={Style.Brand_box}>
                <div className={Style.Brand_box_left}>
                    <Image
                        src={images.logo}
                        alt="Pulse Plaza logo"
                        width={100}
                        height={100}
                    />
                    <h1>PULSE PLAZA</h1>
                    <h2>The NFT marketplace on PulseChain!</h2>
                    <p>Buy, sell, and discover exclusive digital items on your fully decentralized and pure P2P NFT marketplace.</p>
                    <div className={Style.Brand_box_left_btn}>
                        {currentAccount === "" ? (
                            <Button
                                btnName="Connect"
                                handleClick={connectWallet}
                            />
                        ) : (
                            <Button
                                btnName="Create"
                                handleClick={() => router.push("/create-nft")}
                            />
                        )}
                        <Button btnName="Discover" handleClick={() => router.push("/search-collections")} />
                    </div>
                </div>
                <div className={Style.Brand_box_right}>
                    <Image
                        src={images.pulse1}
                        alt="Pulse Plaza station"
                        width={1000}
                        height={700}
                    />
                </div>
            </div>
        </div>
    );
};


export default Brand;