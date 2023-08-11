import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

import { GrClose } from "react-icons/gr";

import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";

import { RiMastodonFill, RiFacebookBoxFill } from "react-icons/ri";
import { BsDiscord, BsTwitter } from "react-icons/bs";

import { FaWallet } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";

//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";



const SideBar = ({ setOpenSideMenu, currentAccount, connectWallet }) => {
  //------USESTATE
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const router = useRouter();


  //------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "Collection",
      link: "collection"
    },
    {
      name: "Search",
      link: "search"
    },
    {
      name: "Author Profile",
      link: "author-profile"
    },
    {
      name: "NFT Details",
      link: "NFT-details"
    },
    {
      name: "Account Settings",
      link: "account-settings"
    },
    {
      name: "Connect Wallet",
      link: "connect-wallet"
    },
    {
      name: "News",
      link: "news"
    },
  ];
  //------HELP CENTER
  const helpCenter = [
    {
      name: "About",
      link: "about",
    },
    {
      name: "Contact Us",
      link: "contact-us",
    },
    {
      name: "Sign Up",
      link: "sign-up",
    },
    {
      name: "Sign In",
      link: "sign-in",
    },
    {
      name: "Subscription",
      link: "subscription",
    },
  ];

  const openDiscoverMenu = () => {
    if (!openDiscover) {
      setOpenDiscover(true);
    } else {
      setOpenDiscover(false);
    }
  };

  const openHelpMenu = () => {
    if (!openHelp) {
      setOpenHelp(true);
    } else {
      setOpenHelp(false);
    }
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
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
          <a href="#"><BsDiscord /></a>
          <a href="#"><BsTwitter /></a>
          <a href="#"><RiFacebookBoxFill /></a>
          <a href="#"><TiSocialInstagram /></a>
          <a href="#"><RiMastodonFill /></a>
        </div>
      </div>


      <div className={Style.sideBar_menu}>
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openDiscoverMenu()}
          >
            <p>Discover</p>
            <TiArrowSortedDown />
          </div>

          {openDiscover && (
            <div className={Style.sideBar_discover}>
              {discover.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}

            </div>
          )}
        </div>

        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openHelpMenu()}
          >
            <p>Help Center</p>
            <TiArrowSortedDown />

          </div>

          {openHelp && (
            <div className={Style.sideBar_discover}>
              {discover.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
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
            btnName={<><MdPermMedia /> Create</>}
            handleClick={() => router.push("/upload-nft")}
          />
        )}

      </div>

    </div>
  );
};

export default SideBar;