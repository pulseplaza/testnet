

import React, { useContext } from "react";
import Style from "../../styles/trade.module.css";
import { Title } from "../../components/componentsindex";
import Head from 'next/head';




const Trade = () => {

  const handleRefreshClick = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <div className={Style.trade}>

      <Head>
        <title>Pulse Plaza NFT Marketplace - Coin - Trade</title>
      </Head>


      <Title
        heading="Trade Plaza Coin (PACO)"
        paragraph="Buy and sell Plaza Coin (PACO) directly on Pulse Plaza"
      />





      <div className={Style.trade_box}>

        {/* <div>
        <p>You need to connect your wallet to the PulseX DEX in order to trade the PACO.</p>
        <p>If you want to switch your wallet for this trade, please visit <a href="https://app.pulsex.com/" target="_blank" rel="noopener noreferrer">PulseX</a> and connect the correct one.</p>
        <p>Once done, <a href="#" onClick={handleRefreshClick}>refresh</a> this site and re-connect with the swap window below.</p>
        </div> */}

        {/* <iframe
          src="https://app.v4.testnet.pulsex.com/swap?outputCurrency=0x13ca32a56D9A52810dF2FE0bBaD71462b0D209AD#/swap?inputCurrency=0x13ca32a56D9A52810dF2FE0bBaD71462b0D209AD&outputCurrency=PLS"
          // src="https://dweb.link/ipfs/QmR4hdHeqriAzwu7cq5HSZcxvAVtjpbFrk4yucU6S3BGCk/#/?outputCurrency=0x13ca32a56D9A52810dF2FE0bBaD71462b0D209AD/?chain=pulsechain-testnet"
          // NOT WORKING ON TESTNET, ONLY MAINNET
          width="100%"
          height="800px"
          style={{ border: 'none' }}
          title="PulseX Swap Box"
        ></iframe> */}


        <br />
        <br />
        <br />
        <br />
        <br />
        <h2>Coming soon...</h2>
        <br />
        <br />
        <br />
        <br />
        <br />

      </div>
    </div>
  );
};

export default Trade;
