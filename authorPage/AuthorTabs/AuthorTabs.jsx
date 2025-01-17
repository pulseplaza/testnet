
import React, { useState } from "react";
// import Image from "next/image";
// import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./AuthorTabs.module.css";

const AuthorTabs = ({
  setListed,
  setCollectibles,
  setMyCollections

}) => {


  const [activeBtn, setActiveBtn] = useState(1);




  const openTab = (e) => {
    const btnText = e.target.innerText;
    console.log(btnText);
    if (btnText == "My Listed NFTs") {
      setListed(true);
      setCollectibles(false);
      setMyCollections(false);
      setActiveBtn(1);
    } else if (btnText == "My Purchased NFTs") {
      setListed(false);
      setCollectibles(true);
      setMyCollections(false);
      setActiveBtn(2);
    } else if (btnText == "My Collections") {
      setListed(false);
      setCollectibles(false);
      setMyCollections(true);
      setActiveBtn(3);
    }
  };

  return (
    <div className={Style.AuthorTabs}>
      <div className={Style.AuthorTabs_box}>
        <div className={Style.AuthorTabs_box_left}>
          <div className={Style.AuthorTabs_box_left_btn}>

            <button
              className={`${activeBtn == 1 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >My Listed NFTs{""}</button>

            <button
              className={`${activeBtn == 2 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >My Purchased NFTs{""}</button>

            <button
              className={`${activeBtn == 3 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >My Collections{""}</button>

          </div>

        </div>

      </div>

    </div>
    
  );
};

export default AuthorTabs;
