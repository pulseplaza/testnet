import React from 'react';
import Link from 'next/link';

//INTERNAL IMPORT
import Style from './HelpCenter.module.css'

const HelpCenter = () => {
  const helpCenter = [
    {
      name: "About Us",
      link: "aboutus",
    },
    {
      name: "Contact Us",
      link: "contact",
    },
    {
      name: "Sign Up",
      link: "signup",
    },
    {
      name: "Log In",
      link: "login",
    },
    {
      name: "Fees",
      link: "fees",
    }
  ];
  return (
    <div className={Style.box}>
      {
        helpCenter.map((el, i)=> (
          <div className={Style.helpCenter} key={i + 1}>
            <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
          </div>
        ))
      }
    </div>
  )
};

export default HelpCenter;