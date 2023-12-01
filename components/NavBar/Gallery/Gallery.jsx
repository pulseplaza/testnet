

import React from "react";
import { useRouter } from "next/router";
import Style from "./Gallery.module.css";


const Gallery = ({ toggleMenu }) => {
  const router = useRouter();
  const gallery = [
    { name: "Search NFTs", link: "/search-nfts" },
    { name: "Search Collections", link: "/search-collections" },
    { name: "Create NFT", link: "/create-nft" },
    { name: "Create Collection", link: "/create-collection" },
  ];


  const handleMenuClick = (url) => {
    toggleMenuAndNavigate(url);
  };

  const toggleMenuAndNavigate = (url) => {
    toggleMenu(); // Close the menu first
    router.push(url); // Then navigate
  };

  return (
    <div className={Style.box}>
      {gallery.map((el, i) => (
        <div className={Style.gallery} key={i}>
          <a
            href={el.link}
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              handleMenuClick(el.link);
            }}
          >
            {el.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Gallery;



