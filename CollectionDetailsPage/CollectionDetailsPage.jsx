
import React from "react";

//INTERNAL IMPORT
import Style from "./CollectionDetailsPage.module.css";
import {
  CollectionDescription,
  CollectionDetailsImg,
  CollectionTokens,
} from "./CollectionDetailsIndex";




const CollectionDetailsPage = ({ collection }) => {


  return (
    <div className={Style.CollectionDetailsPage}>
      <div className={Style.CollectionDetailsPage_box}>
        <CollectionDetailsImg nft={collection} />
        <CollectionDescription nft={collection} />
      </div>
      <CollectionTokens collection={collection}/>
    </div>
  );
};

export default CollectionDetailsPage;


