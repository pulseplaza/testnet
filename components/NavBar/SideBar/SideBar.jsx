
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

import { GrClose } from "react-icons/gr";

import {
  TiSocialInstagram,
  TiArrowSortedDown,
} from "react-icons/ti";

import { RiMastodonFill, RiFacebookBoxFill } from "react-icons/ri";
import { BsDiscord, BsTwitterX } from "react-icons/bs";

import { FaWallet } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";

//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";



const SideBar = ({ setOpenSideMenu, currentAccount, connectWallet }) => {
  //------USESTATE
  const [openGallery, setOpenGallery] = useState(false);
  const [openCoin, setOpenCoin] = useState(false);
  const [openMore, setOpenMore] = useState(false);

  const router = useRouter();


  //------DISCOVER NAVIGATION MENU
  const gallery = [
    {
      name: "Search NFTs",
      link: "/search-nfts"
    },
    {
      name: "Search Collections",
      link: "/search-collections"
    },
    {
      name: "Create NFT",
      link: "/create-nft"
    },
    {
      name: "Create Collection",
      link: "/create-collection"
    },
  ];


  //------COIN MENU
  const coin = [
    {
      name: "Tokenomics",
      link: "/coin/tokenomics",
    },
    {
      name: "Trade",
      link: "/coin/trade",
    },
  ];



  //------MORE
  const more = [
    {
      name: "About Us",
      link: "/aboutus",
    },
    {
      name: "News",
      link: "/news"
    },
    {
      name: "Fees",
      link: "/fees",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
    {
      name: "System Status",
      link: "https://stats.uptimerobot.com/1kn5YInD1x",
      external: true
    }
  ];




  const openGalleryMenu = () => {
    setOpenGallery(!openGallery);
    setOpenCoin(false);
    setOpenMore(false);
  };

  const openCoinMenu = () => {
    setOpenCoin(!openCoin);
    setOpenGallery(false);
    setOpenMore(false);
  };

  const openMoreMenu = () => {
    setOpenMore(!openMore);
    setOpenGallery(false);
    setOpenCoin(false);
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };



  // Function to handle link clicks
  const handleLinkClick = (link, isExternal = false) => {
    if (isExternal) {
      window.open(link, '_blank');
    } else {
      router.push(link);
    }
    closeSideBar();
  };




  return (
    <div className={Style.sideBar}>
      <GrClose
        className={Style.sideBar_closeBtn}
        onClick={() => closeSideBar()}
      />

      <div className={Style.sideBar_box}>

        <p>
          <div className={Style.sideBar_box_logo}>
            <Image
              src={images.logo}
              alt="Pulse Plaza"
              width={100}
              height={100}
            />
          </div>
        </p>


        <p>
          NFT marketplace on PulseChain
        </p>

        <div className={Style.sideBar_social}>
        <a href="https://discord.com/invite/w7tVUW9Fb3" target="_blank" rel="noopener noreferrer"><BsDiscord /></a>
            <a href="https://twitter.com/PulsePlazaio" target="_blank" rel="noopener noreferrer"><BsTwitterX /></a>
            <a href="https://www.facebook.com/PulsePlazaio" target="_blank" rel="noopener noreferrer"><RiFacebookBoxFill /></a>
            <a href="https://instagram.com/pulseplazaio" target="_blank" rel="noopener noreferrer"><TiSocialInstagram /></a>
            <a href="https://mastodon.social/@pulseplaza" target="_blank" rel="noopener noreferrer"><RiMastodonFill /></a>
        </div>
      </div>


      <div className={Style.sideBar_menu}>
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openGalleryMenu()}
          >
            <p>Gallery</p>
            <TiArrowSortedDown />
          </div>

          {openGallery && (
            <div className={Style.sideBar_gallery}>
              {gallery.map((el, i) => (
                <p key={i + 1} onClick={() => handleLinkClick(el.link)}>
                  {el.name}
                </p>
              ))}

            </div>
          )}
        </div>


        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openCoinMenu()}
          >
            <p>Coin</p>
            <TiArrowSortedDown />

          </div>

          {openCoin && (
            <div className={Style.sideBar_coin}>
              {coin.map((el, i) => (
                <p key={i + 1} onClick={() => handleLinkClick(el.link)}>
                  {el.name}
                </p>
              ))}

            </div>
          )}
        </div>

        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openMoreMenu()}
          >
            <p>More</p>
            <TiArrowSortedDown />

          </div>

          {openMore && (
            <div className={Style.sideBar_more}>
              {more.map((el, i) => (
                <p key={i + 1} onClick={() => handleLinkClick(el.link, el.external)}>
                  {el.name}
                </p>
              ))}


            </div>
          )}
        </div>


      </div>

      <div className={Style.sideBar_button}>
        {currentAccount == "" ? (
          <Button
            btnName={<><FaWallet /> Connect</>}
            handleClick={() =>
              connectWallet()}
          />
        ) : (
          <Button
            btnName={<><MdPermMedia />Create</>}
            handleClick={() => { router.push("/create-nft"); closeSideBar() }}
          />
        )}

      </div>

    </div>
  );
};

export default SideBar;


