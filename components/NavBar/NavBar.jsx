
import React, { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
import Link from 'next/link';
import { useRouter } from "next/router";


import { FaWallet } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";


//----IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";


//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Marketplace, More, ThemeSwitch, Notification, Profile, SideBar, Coin } from "./index";
import { Button, Error } from "../componentsindex";
import images from "../../img";



//IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";





const NavBar = ({ theme, setTheme }) => {
  //----USESTATE COMPONNTS
  const [marketplace, setMarketplace] = useState(false);
  const [more, setMore] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [coin, setCoin] = useState(false);


  const router = useRouter();


  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Marketplace") {
      setMarketplace(!marketplace);
      setMore(false);
      setNotification(false);
      setProfile(false);
      setCoin(false);
    } else if (btnText == "More") {
      setMarketplace(false);
      setMore(!more);
      setNotification(false);
      setProfile(false);
      setCoin(false);
    } else if (btnText == "Coin") {
      setMarketplace(false);
      setMore(false);
      setNotification(false);
      setProfile(false);
      setCoin(!coin);
    } else {
      setMarketplace(false);
      setMore(false);
      setNotification(false);
      setProfile(false);
      setCoin(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setMarketplace(false);
      setMore(false);
      setProfile(false);
      setCoin(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setMore(false);
      setMarketplace(false);
      setNotification(false);
      setCoin(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    setOpenSideMenu(!openSideMenu);
    setMarketplace(false);
    setMore(false);
    setNotification(false);
    setProfile(false);
    setCoin(false);
  };



  //SMART CONTRACT SECTION
  const { currentAccount, connectWallet, openError } = useContext(
    NFTMarketplaceContext
  );


  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Link href="/">
              <Image
                src={images.logo}
                alt="Pulse Plaza"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => { }} className={Style.search_icon} />
            </div>
          </div>
        </div>


        {/* //END OF LEFT SECTION */}

        <div className={Style.navbar_container_right}>

          {/* MARKETPLACE MENU */}
          <div className={Style.navbar_container_right_marketplace}>
            <p onClick={(e) => openMenu(e)}>Marketplace</p>
            {marketplace && (
              <div className={Style.navbar_container_right_marketplace_box}>
                <Marketplace />
              </div>
            )}
          </div>


          {/* COIN MENU */}
          <div className={Style.navbar_container_right_coin}>
            <p onClick={(e) => openMenu(e)}>Coin</p>
            {coin && (
              <div className={Style.navbar_container_right_coin_box}>
                <Coin />
              </div>
            )}
          </div>


          {/* MORE MENU */}
          <div className={Style.navbar_container_right_more}>
            <p onClick={(e) => openMenu(e)}>More</p>
            {more && (
              <div className={Style.navbar_container_right_more_box}>
                <More />
              </div>
            )}
          </div>

          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>


          {/* THEME-SWITCH */}
          <div className={Style.navbar_container_right_switch}>
            <ThemeSwitch
              theme={theme}
              setTheme={setTheme}
            />
          </div>


          {/* CREATE BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
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



          {/* USER PROFILE */}

          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user1}
                alt="Profile"
                width={50}
                height={50}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />

              {profile && <Profile currentAccount={currentAccount} />}
            </div>
          </div>

          {/* MENU BUTTON */}

          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>

      </div>

      {/* SIDBAR COPMPONENT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar
            setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
          />
        </div>
      )}

      {openError && <Error />}


    </div>
  );
};



export default NavBar;