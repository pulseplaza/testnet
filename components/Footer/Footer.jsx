
import React from "react";
import Image from "next/image";
import {
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { RiMastodonFill, RiFacebookBoxFill, RiSendPlaneFill } from "react-icons/ri";
import { BsDiscord, BsTwitterX } from "react-icons/bs";

import Link from 'next/link';




//INTERNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
import { Gallery, Coin, More } from "../NavBar/index";


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
            The NFT Marketplace on PulseChain
          </p>

          <div className={Style.footer_social}>
            <a href="https://discord.com/invite/w7tVUW9Fb3" target="_blank" rel="noopener noreferrer"><BsDiscord /></a>
            <a href="https://twitter.com/PulsePlazaio" target="_blank" rel="noopener noreferrer"><BsTwitterX /></a>
            <a href="https://www.facebook.com/PulsePlazaio" target="_blank" rel="noopener noreferrer"><RiFacebookBoxFill /></a>
            <a href="https://instagram.com/pulseplazaio" target="_blank" rel="noopener noreferrer"><TiSocialInstagram /></a>
            <a href="https://mastodon.social/@pulseplaza" target="_blank" rel="noopener noreferrer"><RiMastodonFill /></a>
          </div>
        </div>


        <div className={Style.footer_box_gallery}>
          <h3>GALLERY</h3>
          <Link href="/search-nfts"><a>Search NFTs</a></Link>
          <Link href="/search-collections"><a>Search Collections</a></Link>
          <Link href="/create-nft"><a>Create NFT</a></Link>
          <Link href="/create-collection"><a>Create Collection</a></Link>
        </div>


        <div className={Style.footer_box_coin}>
          <h3>COIN</h3>
          <Link href="/coin/tokenomics"><a>Tokenomics</a></Link>
          <Link href="/coin/trade"><a>Trade</a></Link>
        </div>

        <div className={Style.footer_box_more}>
          <h3>MORE</h3>
          <Link href="/aboutus"><a>About Us</a></Link>
          <Link href="/news"><a>News</a></Link>
          <Link href="/fees"><a>Fees</a></Link>
          <Link href="/contact"><a>Contact Us</a></Link>
          <Link href="https://stats.uptimerobot.com/1kn5YInD1x" passHref>
            <a target="_blank" rel="noopener noreferrer">System Status</a>
          </Link>
        </div>


        <div className={Style.subscribe}>
          <h3>SUBSCRIBE</h3>
          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Enter your email" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>
              The NFT Marketplace on PulseChain
            </p>
          </div>
        </div>
      </div>

      <div className={Style.footer_copyright}>
        <p>
          © 2023 - {year} Pulse Plaza
        </p>

      </div>
    </div>
  );
};

export default Footer;
