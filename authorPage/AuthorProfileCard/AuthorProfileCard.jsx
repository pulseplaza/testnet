
import React, { useState } from "react";
// import Image from "next/image";
// import {
//   MdVerified,
//   MdCloudUpload,
//   MdOutlineReportProblem,
// } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
// import {
//   TiSocialFacebook,
//   TiSocialLinkedin,
//   TiSocialYoutube,
//   TiSocialInstagram,
// } from "react-icons/ti";
// import { BsThreeDots } from "react-icons/bs";

import { HiOutlineUserCircle } from "react-icons/hi2";

//INTERNAL IMPORT
import Style from "./AuthorProfileCard.module.css";
// import images from "../../img";
// import { Button } from "../../components/componentsindex.js";

const AuthorProfileCard = ({ currentAccount }) => {
  // const [share, setShare] = useState(false);
  // const [report, setReport] = useState(false);

  //copyAddress function
  const copyAddress = () => {
    const copyText = document.getElementById("myInput");

    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  // const openShare = () => {
  //   if (!share) {
  //     setShare(true);
  //     setReport(false);
  //   } else {
  //     setShare(false);
  //   }
  // };

  // const openReport = () => {
  //   if (!report) {
  //     setReport(true);
  //     setShare(false);
  //   } else {
  //     setReport(false);
  //   }
  // };


  return (
    <div className={Style.AuthorProfileCard}>
      <div className={Style.AuthorProfileCard_box}>
        <div className={Style.AuthorProfileCard_box_img}>
          <HiOutlineUserCircle size={220} className={Style.AuthorProfileCard_box_img_img} />
        </div>


        <div className={Style.AuthorProfileCard_box_info}>
          <div className={Style.AuthorProfileCard_box_info_title}>
            <h2>
              My Profile
            </h2>
          </div>


          <div className={Style.AuthorProfileCard_box_info_address}>

          {/* <small>My Address</small> */}
            <FiCopy
              onClick={() => copyAddress()}
              className={Style.AuthorProfileCard_box_info_address_icon}
            />
            <small>My Address</small>
            <input type="text" value={currentAccount} id="myInput" />
            {/* <span id="myInput">{currentAccount}</span> */}
          </div>
          <small>Listed NFTs</small>
          <p>
            All NFTs which you listed for sale on Pulse Plaza.
          </p>
          <small>Owned NFTs</small>
          <p>
            All NFTs which you purchased on Pulse Plaza. They remain in your wallet until you relist them on the marketplace.
          </p>
          <small>My Collections</small>
          <p>
            All collections which you created.
          </p>

        </div>

      </div>
    </div>
  );
};

export default AuthorProfileCard;