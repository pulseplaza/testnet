
import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";



// Infura project settings
const projectId = "2TQbLGIoIn5sKvpMGZSDgRmzBhw";
const projectSecretKey = "c6b0026e721e283fde46ccb62efd1e68";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString("base64")}`;
const subdomain = "https://pulseplazatest.infura-ipfs.io";

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
});

//INTERNAL IMPORT
import {
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
} from "./constants";


//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        signerOrProvider
    );


//---CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        return contract;

    } catch (error) {
        console.log("Something went wrong while connecting with contract.");
    }
};




export const NFTMarketplaceContext = React.createContext();



export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "The NFT marketplace on PulseChain";






    //------USESTATES
    const [currentAccount, setCurrentAccount] = useState("");
    //const [error, setError] = useState("");
    //const [openError, setOpenError] = useState(false);
    //const [accountBalance, setAccountBalance] = useState("");
    //const router = useRouter();



    //---CHECK IF WALLET IS CONNECTED
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return console.log("Install Metamask");

            const accounts = await window.ethereum.request({ method: "eth_accounts", });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log(`Account connected: ${accounts[0]}`);
            } else {
                console.log("No account found");
            }

            //console.log(currentAccount);


        } catch (error) {
            console.log("Something went wrong while connecting to wallet.");
        }
    };



    useEffect(() => {
        checkIfWalletConnected();
    }, []);





    //---CONNECT WALLET FUNCTION
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return console.log("Install Metamask");

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts", });

            //console.log(accounts);

            setCurrentAccount(accounts[0]);

            //console.log(`Account connected: ${accounts[0]}`);

            //connectingWithSmartContract();

        } catch (error) {
            console.log("Error while connecting to wallet.");
            //return null;
        }
    };


    //---UPLOAD TO IPFS FUNCTION

    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add({ content: file });
            const url = `${subdomain}/ipfs/${added.path}`;
            return url;
        } catch (error) {
            console.log("Error uploading to IPFS.");
            //return null;
        }
    };

    
    //---CREATE NFT FUNCTION

    const createNFT = async (name, price, image, description, router) => {


        if (!name || !description || !price || !image)
            return console.log("Data Is Missing");

            const data = JSON.stringify({ name, description, image });

        try {
            const added = await client.add(data);

            const url = `${subdomain}/ipfs/${added.path}`;

            await createSale(url, price);

            //return url;

        } catch (error) {
            console.log("Error while creating NFT.");
            //setOpenError(true);
        }
    };



    //--- CREATE SALE FUNCTION

    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            console.log(url, formInputPrice, isReselling, id);

            const price = ethers.utils.parseUnits(formInputPrice, "ether");


            const contract = await connectingWithSmartContract();

            const listingPrice = await contract.getListingPrice();

            const transaction = !isReselling
                ? await contract.createToken(url, price, {
                    value: listingPrice.toString(),
                })
                : await contract.resellToken(id, price, {
                    value: listingPrice.toString(),
                });

            await transaction.wait();

            console.log(transaction);

        } catch (error) {
            console.log("Error while creating sale.");

        }
    };



    //---FETCH NFTS FUNCTION

    const fetchNFTs = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();

            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItems();

            const items = await Promise.all(
                data.map(
                    async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                        const tokenURI = await contract.tokenURI(tokenId);

                        const {
                            data: { image, name, description },
                        } = await axios.get(tokenURI);
                        const price = ethers.utils.formatUnits(
                            unformattedPrice.toString(),
                            "ether"
                        );

                        return {
                            price,
                            tokenId: tokenId.toNumber(),
                            seller,
                            owner,
                            image,
                            name,
                            description,
                            tokenURI,
                        };
                    }
                )
            );

            return items;

            // }
        } catch (error) {
            // setError("Error while fetching NFTS");
            // setOpenError(true);
            console.log("Error while fetching NFTs.");
        }
    };


    //useEffect(() => {
    //    fetchNFTs();
    //}, []);




    //--FETCHING MY NFT OR LISTED NFTS

    const fetchMyNFTsOrListedNFTs = async (type) => {
        try {
            if (currentAccount) {
                const contract = await connectingWithSmartContract();

                const data =
                    type == "fetchItemsListed"
                        ? await contract.fetchItemsListed()
                        : await contract.fetchMyNFTs();

                const items = await Promise.all(
                    data.map(
                        async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                            const tokenURI = await contract.tokenURI(tokenId);
                            const {
                                data: { image, name, description },
                            } = await axios.get(tokenURI);

                            const price = ethers.utils.formatUnits(
                                unformattedPrice.toString(),
                                "ether"
                            );

                            return {
                                price,
                                tokenId: tokenId.toNumber(),
                                seller,
                                owner,
                                image,
                                name,
                                description,
                                tokenURI,
                            };
                        }
                    )
                );

                return items;
            }

        } catch (error) {
            console.log("Error while fetching listed NFTs.");
            // setOpenError(true);
        }
    };


    //useEffect(() => {
    //    fetchMyNFTsOrListedNFTs();
    //}, []);







    //----BUY NFTS FUNCTION
    const buyNFT = async (nft) => {
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
            });

            await transaction.wait();

        } catch (error) {
            console.log("Error while buying NFT.");
        }
    };



    return (
        <NFTMarketplaceContext.Provider
            value={{
                checkIfWalletConnected,
                connectWallet,
                uploadToIPFS,
                createNFT,
                createSale,
                fetchNFTs,
                fetchMyNFTsOrListedNFTs,
                buyNFT,
                currentAccount,
                titleData,
            }}>
            {children}
        </NFTMarketplaceContext.Provider>
    );
};

