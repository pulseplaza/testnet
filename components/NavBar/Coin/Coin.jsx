import React from "react";
import Link from 'next/link';

//INTERNAL IMPORT
import Style from './Coin.module.css';


const Coin = () => {

    const coin = [
        {
            name: "Trade",
            link: "coin/trade",
        },
    ];


    return (
        <div className={Style.box}>
      {
        coin.map((el, i)=> (
          <div className={Style.coin} key={i + 1}>
            <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
          </div>
        ))
      }
    </div>

    )
};

export default Coin;