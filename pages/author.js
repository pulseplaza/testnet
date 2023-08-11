import React, { useState, useEffect, useContext } from "react";


//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title, Loader } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTabs,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";



//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";



const author = () => {
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "0000000000000000",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "0000000000000000",
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "0000000000000000",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "0000000000000000",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "0000000000000000",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "0000000000000000",
    },
  ];

  const [collectibles, setCollectibles] = useState(true);
  const [listed, setListed] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);



  //IMPORT SMART CONTRACT DATA
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTMarketplaceContext);

  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);


  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items) => {
      setNfts(items);
    });
  }, []);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items) => {
      setMyNFTs(items);
    });
  }, []);




  return (
    <div className={Style.author}>
      <Banner
        bannerImage={images.creatorbackground1}
      />
      <AuthorProfileCard
        currentAccount={currentAccount}
      />
      <AuthorTabs
        setCollectibles={setCollectibles}
        setListed={setListed}
        setLike={setLike}
        setFollowing={setFollowing}
        setFollower={setFollower}
      />


{(!nfts || !nfts.length) && (!myNFTs || !myNFTs.length) ? (
  <Loader />
) : (
  <AuthorNFTCardBox
    collectibles={collectibles}
    listed={listed}
    like={like}
    follower={follower}
    following={following}
    nfts={nfts}
    myNFTs={myNFTs}
  />
)}




      <Title heading="Popular creators" paragraph="Here comes the description" />
      <div className={Style.author_box}>
        {followerArray.map((el, i) => (
          <FollowerTabCard i={i} el={el} />
        ))}

      </div>

      <Brand />

    </div>
  );
};

export default author;