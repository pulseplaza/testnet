import React from "react";
import Image from "next/image";
import {
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { RiMastodonFill, RiFacebookBoxFill, RiSendPlaneFill } from "react-icons/ri";
import { BsDiscord, BsTwitter } from "react-icons/bs";



//INTERNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
import { Marketplace, Coin, More } from "../NavBar/index";


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>

        <div className={Style.footer_box_social}>
          <a href="#">
            <Image
              src={images.logo}
              alt="Pulse Plaza"
              width={100}
              height={100}
              className={Style.footer_box_social_logo}
            />
          </a>
          <p>
            The NFT marketplace on PulseChain
          </p>

          <div className={Style.footer_social}>
            <a href="#"><BsDiscord /></a>
            <a href="#"><BsTwitter /></a>
            <a href="#"><RiFacebookBoxFill /></a>
            <a href="#"><TiSocialInstagram /></a>
            <a href="#"><RiMastodonFill /></a>
          </div>
        </div>

        <div className={Style.footer_box_marketplace}>
          <h3>Marketplace</h3>
          <Marketplace />
        </div>

        <div className={Style.coin}>
          <h3>Coin</h3>
          <Coin />
        </div>

        <div className={Style.footer_box_more}>
          <h3>More</h3>
          <More />
        </div>


        <div className={Style.subscribe}>
          <h3>Subscribe</h3>
          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Enter your email" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>
              The NFT marketplace on PulseChain
            </p>
          </div>
        </div>
      </div>

      <div className={Style.footer_copyright}>
        <p>
          © {year} Pulse Plaza
        </p>

      </div>
    </div>
  );
};

export default Footer;
