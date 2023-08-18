import React from 'react';
import Link from 'next/link';

//INTERNAL IMPORT
import Style from './Marketplace.module.css';

const Marketplace = () => {

  //--------MAERKETPLACE NAVIGATION MENU
  const marketplace = [
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
    <div className={Style.box}>
      {
        marketplace.map((el, i)=> (
          <div className={Style.marketplace} key={i + 1}>
            <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
          </div>
        ))
      }
    </div>
  )
};

export default Marketplace;
