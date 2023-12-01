

import React from 'react';
import { useRouter } from "next/router";
import Style from './More.module.css';


const More = ({ toggleMenu }) => {
  const router = useRouter();
  const more = [
    

    {
      name: "About Us",
      link: "/aboutus",
    },
    {
      name: "News",
      link: "/news"
    },
    {
      name: "Fees",
      link: "/fees",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
    {
      name: "System Status",
      link: "https://stats.uptimerobot.com/1kn5YInD1x",
      external: true
    }
  ];

  const handleMenuClick = (url, external) => {
    toggleMenuAndNavigate(url, external);
  };

  const toggleMenuAndNavigate = (url, external) => {
    toggleMenu(); // Close the menu first
    if (external) {
      // Open in a new tab if it's an external link
      window.open(url, '_blank');
    } else {
      // Navigate to the internal link
      router.push(url);
    }
  };
  

  return (
    <div className={Style.box}>
      {more.map((el, i) => (
        <div className={Style.more} key={i}>
          <a
            href={el.link}
            onClick={() => handleMenuClick(el.link, el.external)}
            target={el.external ? "_blank" : ""}
            rel={el.external ? "noopener noreferrer" : ""}
          >
            {el.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default More;




