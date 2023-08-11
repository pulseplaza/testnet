import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots, BsDiscord, BsTwitter } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiSocialLinkedin,
  TiSocialYoutube,
} from "react-icons/ti";
import { RiMastodonFill, RiFacebookBoxFill } from "react-icons/ri";
import { BiTransferAlt, BiDollar } from "react-icons/bi";



//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex";
import { NFTTabs } from "../NFTDetailsIndex";


//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";



const NFTDescription = ({ nft }) => {

  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [origin, setOrigin] = useState(false);
  const [owner, setOwner] = useState(false);

  const router = useRouter();


  const historyArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ];

  const originArray = [
    images.user3,
    images.user9,
    images.user8,
    images.user1,
    images.user6,
  ];

  const ownerArray = [
    images.user6,
    images.user7,
    images.user8,
    images.user9,
    images.user1,
  ];


  const openSocial = () => {
    if (!social) {
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
      setSocial(false);
    } else {
      setNFTMenu(false);
    }
  };

  const openTabs = (e) => {
    const btnText = e.target.innerText;

    if (btnText == "Bid history") {
      setHistory(true);
      setOrigin(false);
      setOwner(false);
    } else if (btnText == "Origin") {
      setHistory(false);
      setOrigin(true);
      setOwner(false);
    }
  };

  const openOwner = () => {
    if (!owner) {
      setOwner(true);
      setHistory(false);
      setOrigin(false);
    } else {
      setOwner(true);
    }
  };



  //SMART CONTRACT DATA
  const { buyNFT, currentAccount } = useContext(NFTMarketplaceContext);


  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>

        {/* //PART ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual worlds</p>
          <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openSocial()}
            />

            {social && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <TiSocialFacebook /> Facebook
                </a>
                <a href="#">
                  <TiSocialInstagram /> Instagram
                </a>
                <a href="#">
                  <TiSocialLinkedin /> LinkedIn
                </a>
                <a href="#">
                  <TiSocialTwitter /> Twitter
                </a>
                <a href="#">
                  <TiSocialYoutube /> YouTube
                </a>

              </div>
            )}

            <BsThreeDots
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openNFTMenu()}
            />

            {NFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <BiDollar /> Change price
                </a>
                <a href="#">
                  <BiTransferAlt /> Transfer NFT
                </a>
                <a href="#">
                  <MdReportProblem /> Report abuse
                </a>
                <a href="#">
                  <MdOutlineDeleteSweep /> Delete item
                </a>

              </div>
            )}

          </div>
        </div>


        {/* //PART TWO */}
        <div className={Style.NFTDescription_box_profile}>
          <h1>
            {nft.name} #{nft.tokenId}
          </h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image
                src={images.user1}
                alt="Profile"
                width={50}
                height={50}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Creator</small> <br />
                <Link href={{ pathname: "/author", query: `${nft.seller}` }}>
                  <span>
                    Karli Costa <MdVerified />
                  </span>
                </Link>

              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_box_right}>
              <Image
                src={images.creatorbackground1}
                alt="Profile"
                width={50}
                height={50}
                className={Style.NFTDescription_box_profile_box_left_img}
              />

              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>Collection</small> <br />
                <span>
                  Monkeypunks <MdVerified />
                </span>

              </div>
            </div>
          </div>


          <div className={Style.NFTDescription_box_profile_biding}>
            <p>
              <MdVerified /> <span>Auction ending in:</span>
            </p>

            <div className={Style.NFTDescription_box_profile_biding_box_timer}>
              <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                <p>2</p>
                <span>days</span>
              </div>
              <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                <p>18</p>
                <span>hours</span>
              </div>
              <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                <p>45</p>
                <span>mins</span>
              </div>
              <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                <p>22</p>
                <span>sec</span>
              </div>


            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div className={Style.NFTDescription_box_profile_biding_box_price_bid}>
                <small>Current bid</small>
                <p>{nft.price} PLS <span>( = $3,221.22)</span>
                </p>

              </div>

              <span>[96 in stock]</span>

            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>

              {currentAccount == nft.seller.toLowerCase() ? (
                <p>
                  You hold this NFT
                </p>
              ) : currentAccount == nft.owner.toLowerCase() ? (

                <Button
                  icon=<FaWallet />
                  btnName="List on marketplace"
                  handleClick={() =>
                    router.push(
                      `/resellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                    )}
                  classStyle={Style.button}
                />

              ) : (

                <Button
                  icon=<FaWallet />
                  btnName="Buy NFT"
                  handleClick={() => buyNFT(nft)}
                  classStyle={Style.button}
                />
              )}





              <Button
                icon=<FaPercentage />
                btnName="Make offer"
                handleClick={() => { }}
                classStyle={Style.button}
              />

            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
              <button onClick={(e) => openTabs(e)}>Bid history</button>
              <button onClick={(e) => openTabs(e)}>Origin</button>
              <button onClick={(e) => openOwner()}>Owner</button>

            </div>

            {history && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={historyArray} />
              </div>
            )}

            {origin && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={originArray} />
              </div>
            )}

            {owner && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={ownerArray} icon=<MdVerified /> />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;