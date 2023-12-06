


import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import dynamic from 'next/dynamic';

import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";

// Import Web3 dynamically to ensure it only loads on the client-side
const Web3 = dynamic(() => import('web3'), { ssr: false });




// Infura TEST project settings
const projectId = process.env.NEXT_PUBLIC_IPFS_TEST_PROJECT_ID;
const projectSecretKey = process.env.NEXT_PUBLIC_IPFS_TEST_PROJECT_SECRET_KEY;


// // Infura MAIN project settings
// const projectId = process.env.NEXT_PUBLIC_IPFS_MAIN_PROJECT_ID;
// const projectSecretKey = process.env.NEXT_PUBLIC_IPFS_MAIN_PROJECT_SECRET_KEY;



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





//---FETCHING MARKETPLACE SMART CONTRACT
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        signerOrProvider
    );


//---CONNECTING WITH MARKETPLACE SMART CONTRACT
const connectingWithSmartContract = async () => {
    try {

        if (!window.ethereum) {
            throw new Error("Object not found, install Metamask or another compatible web3 wallet.");
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);


        return contract;

    } catch (error) {
        console.log("Something went wrong while connecting with the marketplace contract.", error);
        throw error;
    }
};




export const NFTMarketplaceContext = React.createContext();



export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "The NFT marketplace on PulseChain";



    //USESTATES

    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");
    const router = useRouter();






    // Add a new function for character length validation
    const validateTextLength = (text, type) => {
        if (type === 'description') {
            if (text.length > 500) {
                setError('Description must not exceed 500 characters.');
                setOpenError(true);
            } else if (text.length < 5) {
                setError('Description must be at least 5 characters long.');
                setOpenError(true);
            } else {
                setError('');
                setOpenError(false);
                return true;
            }
        } else if (type === 'name') {
            if (text.length > 80) {
                setError('Name must not exceed 80 characters.');
                setOpenError(true);
            } else if (text.length < 1) {
                setError('Name must be at least 1 character long.');
                setOpenError(true);
            } else {
                setError('');
                setOpenError(false);
                return true;
            }
        } else if (type === 'symbol') {
            if (text.length > 18) {
                setError('Symbol must not exceed 18 characters.');
                setOpenError(true);
            } else if (text.length < 1) {
                setError('Symbol must be at least 1 character long.');
                setOpenError(true);
            } else {
                setError('');
                setOpenError(false);
                return true;
            }
        }
        return false;
    };


    

    //---CHECK IF WALLET IS CONNECTED

    const checkIfWalletConnected = async () => {
        try {
            const walletConnected = localStorage.getItem('walletConnected');
            if (window.ethereum && walletConnected === 'true') {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setCurrentAccount(accounts[0]);
                } else {
                    // Even though localStorage says 'true', no accounts are found
                    setCurrentAccount("");
                    localStorage.setItem('walletConnected', 'false');
                }
            } else {
                // Metamask not installed or wallet not previously connected
                setCurrentAccount("");
            }
        } catch (error) {
            console.error("Error checking connected wallet:", error);
            setError("An error occurred when checking for connected accounts.", error);
            setOpenError(true);
        }
    };
    
    useEffect(() => {
        checkIfWalletConnected();
    }, []);
    
    
    




    // Disconnect wallet function
    const disconnectWallet = () => {
        setCurrentAccount("");
        localStorage.setItem('walletConnected', 'false');
    };




    //---CONNECT WALLET FUNCTION

    const connectWallet = async () => {
        if (typeof window === 'undefined') {
            // Server-side rendering, do nothing
            return;
        }

        try {
            if (!window.ethereum) {
                throw new Error("Please install Metamask or another compatible web3 wallet.");
            }
    
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
            if (accounts.length === 0) {
                throw new Error("No accounts found.");
            }
    
            // Set the current account
            setCurrentAccount(accounts[0]);
            console.log("Connected account:", accounts[0]);
    
            // Update localStorage to reflect that the wallet is connected
            localStorage.setItem('walletConnected', 'true');
        } catch (error) {
            console.error("Connection error:", error);
            setError(`Could not connect. ${error.message}`);
            setOpenError(true);
    
            // Update localStorage to reflect that the wallet is not connected
            localStorage.setItem('walletConnected', 'false');
        }
    };





    //---UPLOAD TO IPFS FUNCTION

    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add({ content: file });
            const url = `${subdomain}/ipfs/${added.path}`;
            return url;

        } catch (error) {
            setError("Data could not be uploaded. File rejected by IPFS.", error);
            setOpenError(true);
        }
    };


    //---CREATE NFT FUNCTION

    const createNFT = async (name, price, image, description, collection) => {

        if (!name || !description || !price || !image || !collection) {
            setError("Incomplete data! Necessary fields: Image, name, description, collection and price.");
            setOpenError(true);
            return;
        }

        const creator = currentAccount;

        const data = JSON.stringify({ name, description, image, collection, creator });
        try {
            const added = await client.add(data);
            const url = `${subdomain}/ipfs/${added.path}`;
            console.log(url)

            await createSale(url, price);
            router.push("/search-nfts");
        } catch (error) {
            setError("There was a problem while creating the NFT.", error);
            setOpenError(true);
            console.log("createNFT:", error)
        }
    };





    //--- CREATE SALE FUNCTION

    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {

            const price = ethers.utils.parseUnits(formInputPrice, "ether");

            const contract = await connectingWithSmartContract();

            const listingPrice = await contract.listingPrice();

            const transaction = !isReselling
                ? await contract.createToken(url, price, {
                    value: listingPrice.toString(),
                })
                : await contract.resellToken(id, price, {
                    value: listingPrice.toString(),
                });

            await transaction.wait();

        } catch (error) {
            console.log("createSale:", error)
            setError("There was a problem with your transaction.", error);
            setOpenError(true);
        }
    };


    //--- CREATE COLLECTION
    const createCollection = async (name, symbol, description, image) => {

        if (!name || !description || !symbol || !image) {
            setError("Incomplete data! Necessary fields: Image, name, symbol and description.");
            setOpenError(true);
            return;
        }

        try {
            if (typeof window.ethereum === 'undefined') {
                setError("Connect Metamask or another compatible web3 wallet.");
                setOpenError(true);
                return;
            }


            const contract = await connectingWithSmartContract();

            const creatingCollectionFee = await contract.creatingCollectionFee();

            const transaction = await contract.createCollection(name, symbol, description, image,
                { value: creatingCollectionFee.toString() });

            await transaction.wait();

            router.push("/search-collections");

        } catch (error) {
            console.log(error)
            setError("There was a problem while creating the collection.", error);
            setOpenError(true);
        }
    };

    //--- Fetch Collections by user
    const getCollectionsByUser = async () => {
        try {
            if (typeof window.ethereum === 'undefined') {
                setError("Connect Metamask or another compatible web3 wallet.");
                setOpenError(true);
                return;
            }


            if (!currentAccount) return [];

            const contract = await connectingWithSmartContract();

            const result = await contract.getCollectionsByUser(currentAccount);

            return result;
        } catch (error) {
            console.log(error)
            setError("There was a problem while fetching your collections.", error);
            setOpenError(true);
        }
    };


    const getAllCollections = async () => {
        try {
            // Using a public provider
            const provider = new ethers.providers.JsonRpcProvider(
                "https://pulsechain-testnet.publicnode.com"
            );
            const contract = new ethers.Contract(
                NFTMarketplaceAddress,
                NFTMarketplaceABI,
                provider
            );

            const result = await contract.getCollections();
            return result;
        } catch (error) {
            console.log(error)
            setError("There was a problem while fetching collections.", error);
            setOpenError(true);
        }
    };




    //---FETCH NFTS FUNCTION

    const fetchNFTs = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(
                "https://pulsechain-testnet.publicnode.com"
            );

            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItems();

            if (!data || data.length === 0) {
                console.log("No NFTs available.");
                return [];
            }

            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId);

                    const {
                        data: { image, name, description, creator, collection },
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
                        creator,
                        collectionName: collection.name,
                        collectionSymbol: collection.symbol,
                        collectionAddress: collection.collectionAddress,
                        collectionImage: collection.image,
                        collectionDescription: collection.description,
                        collection
                    };
                })
            );

            console.log('fetchNFT here: ', items)
            return items;

            // }
        } catch (error) {
            setError("There was a problem while fetching NFTs.");
            setOpenError(true);
        }
    };



    useEffect(() => {
        fetchNFTs();
    }, []);



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
                                data: { image, name, description, creator, collection },
                            } = await axios.get(tokenURI);

                            const price = ethers.utils.formatUnits(
                                unformattedPrice.toString(),
                                "ether"
                            );

                            // Ensuring that the collection details are included
                            const collectionData = collection || { name: 'Unknown', symbol: 'Unknown' };

                            return {
                                price,
                                tokenId: tokenId.toNumber(),
                                seller,
                                owner,
                                image,
                                name,
                                description,
                                tokenURI,
                                creator,
                                collectionName: collection.name,
                                collectionSymbol: collection.symbol,
                                collectionAddress: collection.collectionAddress,
                                collectionImage: collection.image,
                                collectionDescription: collection.description,
                                collection
                            };
                        }
                    )
                );



                return items;
            }

        } catch (error) {
            setError("There was a problem while fetching listed NFTs.", error);
            setOpenError(true);
        }
    };



    useEffect(() => {
        fetchMyNFTsOrListedNFTs();
    }, []);



    //----BUY NFTS FUNCTION
    const buyNFT = async (nft) => {
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
            });

            await transaction.wait();

            router.push("/profile");

        } catch (error) {
            setError("There was a problem while buying the NFT.", error);
            setOpenError(true);
        }
    };



    return (
        <NFTMarketplaceContext.Provider
            value={{
                checkIfWalletConnected,
                connectWallet,
                uploadToIPFS,
                createNFT,
                createCollection,
                createSale,
                getCollectionsByUser,
                getAllCollections,
                fetchNFTs,
                fetchMyNFTsOrListedNFTs,
                buyNFT,
                currentAccount,
                titleData,
                setOpenError,
                openError,
                error,
                disconnectWallet,
                // transferEther,
                // loading,
                // accountBalance,
                validateTextLength,
            }}>

            {children}
        </NFTMarketplaceContext.Provider>
    );
};

