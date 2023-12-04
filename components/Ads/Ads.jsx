
import React, { useEffect, useState } from "react";
import Style from "./Ads.module.css";

const Ads = () => {
  const [adConfig, setAdConfig] = useState({ src: "", width: "", height: "" });

  useEffect(() => {
    const updateAdConfig = () => {
      if (window.innerWidth < 551) {
        setAdConfig({
          src: "//www.topcreativeformat.com/f43f5857097d74aeb88b88bb4533e37d/invoke.js",
          width: "300",
          height: "250"
        });
      } else if (window.innerWidth >= 551 && window.innerWidth <= 1024) {
        setAdConfig({
          src: "//www.topcreativeformat.com/a8bb164e951cde22acbf0c5047466f7a/invoke.js",
          width: "468",
          height: "60"
        });
      } else {
        setAdConfig({
          src: "//www.topcreativeformat.com/f431300ee3c352f99d04fd721b580db9/invoke.js",
          width: "728",
          height: "90"
        });
      }
    };

    updateAdConfig();
    window.addEventListener('resize', updateAdConfig);

    return () => {
      window.removeEventListener('resize', updateAdConfig);
    };
  }, []);

  return (
    <div className={Style.adbanner_import}>
      <iframe 
        src={adConfig.src} 
        width={adConfig.width} 
        height={adConfig.height} 
        frameBorder="0" 
        scrolling="no"
        title="Ad"
      ></iframe>
    </div>
  );
};

export default Ads;







