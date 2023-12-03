

import React, { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
import Link from 'next/link';
import { useRouter } from "next/router";


import { FaWallet } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";


//----IMPORT ICON
// import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import { HiOutlineUserCircle } from "react-icons/hi2";



//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Gallery, More, ThemeSwitch, Profile, SideBar, Coin } from "./index";
import { Button, Error } from "../componentsindex";
import images from "../../img";


// // Import the SearchBar component
// import SearchBar from "../../SearchPage/SearchBar/SearchBar";



//IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";



const NavBar = ({ theme, setTheme }) => {
  //----USESTATE COMPONNTS
  const [gallery, setGallery] = useState(false);
  const [coin, setCoin] = useState(false);
  const [more, setMore] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const galleryRef = useRef();
  const coinRef = useRef();
  const moreRef = useRef();
  const profileRef = useRef();


  const router = useRouter();




  const { currentAccount, connectWallet, disconnectWallet, openError } = useContext(NFTMarketplaceContext);


  const [hoveredItem, setHoveredItem] = useState(null);



  // Handle click outside for each menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (galleryRef.current && !galleryRef.current.contains(event.target)) {
        setGallery(false);
      }
      if (coinRef.current && !coinRef.current.contains(event.target)) {
        setCoin(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMore(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [gallery, coin, more, profile]);





  const openGallery = () => {
    setGallery(!gallery);
    // Close other menus when Gallery is opened
    setCoin(false);
    setMore(false);
    setProfile(false);
  };
  
  const openCoin = () => {
    setCoin(!coin);
    // Close other menus when Coin is opened
    setGallery(false);
    setMore(false);
    setProfile(false);
  };
  
  const openMore = () => {
    setMore(!more);
    // Close other menus when More is opened
    setGallery(false);
    setCoin(false);
    setProfile(false);
  };
  



  const openProfile = () => {
    setProfile(!profile);
    // Close other menus when profile is opened
    setGallery(false);
    setMore(false);
    setCoin(false);
  };



  const openSideBar = () => {
    setOpenSideMenu(!openSideMenu);
    setGallery(false);
    setMore(false);
    setProfile(false);
    setCoin(false);
  };




  const [scrolling, setScrolling] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 770) {
        if (window.scrollY > 1) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      } else {
        // Reset scrolling state when screen width is less than 770px
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  // Add a state for the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle the search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Redirect to the search page with the search query
      router.push(`/search-nfts?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Function to handle Enter key press in the search input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };




  
  return (
    <div className={`${Style.navbar} ${scrolling ? Style.navbar_scrolled : ''}`}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={`logo ${scrolling ? 'logo_scrolled' : ''}`}>
            <div className={Style.logo}>
              <a href="/" style={{ display: 'block' }}>
                <Image
                  src={images.logo}
                  alt="Pulse Plaza"
                  width={scrolling ? 50 : 100}
                  height={scrolling ? 50 : 100}
                />
              </a>
            </div>
          </div>


          <div className={Style.navbar_container_left_box_input}>

            <div className={Style.navbar_container_left_box_input_box}>

              <input
                type="text"
                placeholder="Search NFTs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <BsSearch onClick={handleSearch} className={Style.search_icon} />
            </div>


          </div>
        </div>


        {/* //END OF LEFT SECTION */}

        <div className={Style.navbar_container_right}>

          {/* GALLERY MENU */}
          <div className={Style.navbar_container_right_gallery}>
            <p onClick={() => openGallery()}>Gallery</p>
            {gallery && (
              <div ref={galleryRef} className={Style.navbar_container_right_gallery_box}>
                <Gallery toggleMenu={openGallery} />
              </div>
            )}
          </div>


          {/* COIN MENU */}
          <div className={Style.navbar_container_right_coin}>
            <p onClick={() => openCoin()}>Coin</p>
            {coin && (
              <div ref={coinRef} className={Style.navbar_container_right_coin_box}>
                <Coin toggleMenu={openCoin} />
              </div>
            )}
          </div>


          {/* MORE MENU */}
          <div className={Style.navbar_container_right_more}>
            <p onClick={() => openMore()}>More</p>
            {more && (
              <div ref={moreRef} className={Style.navbar_container_right_more_box}>
                <More toggleMenu={openMore} />
              </div>
            )}
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
                handleClick={() => connectWallet()}
                className={scrolling ? 'navbar_button_scrolled' : ''}
              />
            ) : (

              <Button
                btnName={<><MdPermMedia /> Create</>}
                handleClick={() => router.push("/create-nft")}
                className={scrolling ? 'navbar_button_scrolled' : ''}
              />
            )}
          </div>



          {/* USER PROFILE */}

          <div className={Style.navbar_container_right_profile_box}>
            <div ref={profileRef} className={Style.navbar_container_right_profile}>
              <HiOutlineUserCircle
                size={60}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile_icon}
              />

              {profile && <Profile currentAccount={currentAccount} disconnectWallet={disconnectWallet} toggleMenu={() => setProfile(false)} />}
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