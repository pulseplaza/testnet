
import React from "react";
import Image from "next/image";

import { RiP2PFill } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { TbPlaystationSquare } from "react-icons/tb";
import { FaGasPump } from "react-icons/fa";


//INTERNAL IMPORT
import Style from "./Service.module.css";
import images from "../../img";

const Service = () => {
  return (
    <div className={Style.service}>
      <div className={Style.service_box}>

        <div className={Style.service_box_item}>
          <RiP2PFill size={100} />
          <p className={Style.service_box_item_step_1}>
            <span>2P2</span>
          </p>
          <h3>Decentralized</h3>
          <p className={Style.service_box_item_step_1_des}>
            All collections and NFTs are stored on the PulseChain blockchain. No middleman blocking your NFTs or collections.
          </p>
        </div>

        <div className={Style.service_box_item}>
        <TbPlaystationSquare size={100} />
          <p className={Style.service_box_item_step_2}>
            <span>Royalties</span>
          </p>
          <h3>Plaza Coin</h3>
          <p className={Style.service_box_item_step_2_des}>
            4% of each NFT sale is used to auto-buy Plaza Coin (PACO), of which half is sent to the NFT creator, the other half burned.
          </p>
        </div>

        <div className={Style.service_box_item}>
        <BsCashCoin size={100} />
          <p className={Style.service_box_item_step_3}>
            <span>2% Tax</span>
          </p>
          <h3>Low Sales Fees</h3>
          <p className={Style.service_box_item_step_3_des}>
            Pulse Plaza is committed to fair prices. Each NFT sale pays 2% of the paid PLS as a sale fee to the marketplace.
          </p>
        </div>

        <div className={Style.service_box_item}>
        <FaGasPump size={100} />
          <p className={Style.service_box_item_step_4}>
            <span>PulseChain</span>
          </p>
          <h3>Low Gas Fees</h3>
          <p className={Style.service_box_item_step_4_des}>
            All NFTs and collections are relying on PulseChain, one of the fastest and cheapest EVMs, guaranteeing low gas fees.
          </p>


        </div>
      </div>
    </div>
  );
};

export default Service;