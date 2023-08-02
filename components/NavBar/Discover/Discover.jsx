import React from 'react';
import Link from 'next/link';

//INTERNAL IMPORT
import Style from './Discover.module.css';

const Discover = () => {

  //--------DISCOVER NAVIGATION MENU
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
      link: "author"
    },
    {
      name: "NFT Details",
      link: "nft-details"
    },
    {
      name: "Account Settings",
      link: "account"
    },
    {
      name: "Create NFT",
      link: "upload-nft"
    },
    {
      name: "Connect Wallet",
      link: "connectWallet"
    },
    {
      name: "News",
      link: "news"
    }

  ];
  return (
    <div>
      {discover.map((el, i)=> (
        <div key={i +1} className={Style.discover}>
          <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
        </div>
      ))}
    </div>
  )
};

export default Discover;