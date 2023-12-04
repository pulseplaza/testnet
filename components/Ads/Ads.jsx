
import React, { useEffect, useRef } from "react";
import Style from "./Ads.module.css";

const Ads = () => {
  const adRef = useRef(null);

  useEffect(() => {
    const createScript = (src) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      return script;
    };

    const loadAdScript = () => {
      if (window.innerWidth < 551) {
        const script = createScript("//www.topcreativeformat.com/f43f5857097d74aeb88b88bb4533e37d/invoke.js");
        adRef.current.appendChild(script);
      } else if (window.innerWidth >= 551 && window.innerWidth <= 1024) {
        const script = createScript("//www.topcreativeformat.com/a8bb164e951cde22acbf0c5047466f7a/invoke.js");
        adRef.current.appendChild(script);
      } else {
        const script = createScript("//www.topcreativeformat.com/f431300ee3c352f99d04fd721b580db9/invoke.js");
        adRef.current.appendChild(script);
      }
    };

    const handleResize = () => {
      while (adRef.current && adRef.current.firstChild) {
        adRef.current.removeChild(adRef.current.firstChild);
      }
      loadAdScript();
    };

    window.addEventListener('resize', handleResize);
    loadAdScript();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div className={Style.adbanner_import} ref={adRef} />;
};

export default Ads;






