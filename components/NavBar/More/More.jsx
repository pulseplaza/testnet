import React from 'react';
import Link from 'next/link';

//INTERNAL IMPORT
import Style from './More.module.css'

const More = () => {
  const more = [
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
        more.map((el, i)=> (
          <div className={Style.more} key={i + 1}>
            <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
          </div>
        ))
      }
    </div>
  )
};

export default More;