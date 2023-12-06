

import React, { useState } from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload, TbLogout } from "react-icons/tb";
import { HiOutlineUserCircle } from "react-icons/hi2";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";

const Profile = ({ currentAccount, disconnectWallet, onDisconnect, toggleMenu }) => {
  const [isMenuOpen, setMenuOpen] = useState(false); // State to control menu open/close

  const handleDisconnect = () => {
    disconnectWallet();
    if (onDisconnect) {
      onDisconnect();
    }
    toggleMenu();
  };
  

  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <HiOutlineUserCircle size={60} className={Style.profile_account_img} />
        <div className={Style.profile_account_info}>
          <p>Hi Anon</p>
          <small>{currentAccount.slice(0, 6)}...{currentAccount.slice(-6)}</small>
        </div>
      </div>
      <div className={Style.profile_menu}>




        <div className={Style.profile_menu_one}>
          <Link href="/profile">
            <a>
              <div
                className={Style.profile_menu_one_item}
                onClick={() => toggleMenu()} // Close the menu when "My Profile" is clicked
              >
                <FaUserAlt />
                <p>My Profile</p>
              </div>
            </a>
          </Link>
        </div>



        <div className={Style.profile_menu_two}>
          <div
            className={Style.profile_menu_one_item}
            onClick={handleDisconnect}
          >
            <TbLogout />
            <p>Disconnect</p>
          </div>
        </div>




      </div>
    </div>
  );
};

export default Profile;
