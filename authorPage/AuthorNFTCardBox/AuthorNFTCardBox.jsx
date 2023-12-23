
import React, { useState } from "react";

//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";

// import images from "../../img";

import {
  NFTCardTwo,
  CollectionCard,
} from "../../collectionPage/collectionIndex";

// import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";

const AuthorNFTCardBox = ({
  listed,
  collectibles,
  tab_mycollection,
  nfts,
  myNFTs,
  mycollections,
}) => {
  

  return (
    <div className={Style.AuthorNFTCardBox}>


      {listed && <NFTCardTwo NFTData={myNFTs} />}

      {collectibles && <NFTCardTwo NFTData={nfts} />}

      {tab_mycollection && <CollectionCard collections={mycollections} />}

    </div>
  );
};

export default AuthorNFTCardBox;


