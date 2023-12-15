
import React, { useContext, useEffect, useState } from "react";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

//INTERNAL IMPORT
import Style from "./NFTDetailsPage.module.css";
import { NFTDescription, NFTDetailsImg, NFTPriceHistory, NFTChart } from "./NFTDetailsIndex";


const NFTDetailsPage = ({ nft }) => {

  const { priceHistory } = useContext(NFTMarketplaceContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (nft && nft.tokenId) {
      priceHistory(nft.tokenId).then(data => {
        setHistory(data);
      }).catch(error => {
        console.error("Error fetching history:", error);
      });
    }
  }, [nft, priceHistory]);




  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg nft={nft} />
        <NFTDescription nft={nft} />
        <NFTPriceHistory tokenId={nft.tokenId} />
        <NFTChart priceHistory={history} />
      </div>
    </div>
  );
};

export default NFTDetailsPage;


