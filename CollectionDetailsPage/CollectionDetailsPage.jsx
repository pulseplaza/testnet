
import React from "react";

//INTERNAL IMPORT
import Style from "./CollectionDetailsPage.module.css";
import {
  CollectionDescription,
  CollectionDetailsImg,
  NFTTabs,
  CollectionTokens,
} from "./CollectionDetailsIndex";

const CollectionDetailsPage = ({ nft }) => {
  // nft = {name, symbol, description, collectionAddress, creatorAddress}
  return (
    <div className={Style.CollectionDetailsPage}>
      <div className={Style.CollectionDetailsPage_box}>
        <CollectionDetailsImg nft={nft} />
        <CollectionDescription nft={nft} />
      </div>
      <CollectionTokens collection={nft}/>
    </div>
  );
};

export default CollectionDetailsPage;
