

import React from "react";
import { useRouter } from "next/router";
import Style from "./Coin.module.css";

const Coin = ({ toggleMenu }) => {
  const router = useRouter();
  const coin = [
    {
      name: "Tokenomics",
      link: "/coin/tokenomics",
    },
    {
      name: "Trade",
      link: "/coin/trade",
    },
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
      {coin.map((el, i) => (
        <div className={Style.coin} key={i}>
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

export default Coin;


