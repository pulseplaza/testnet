
import React, { useEffect, useRef } from "react";
import Style from "./Ads.module.css";

const Ads = () => {
    const adRef = useRef(null);

    useEffect(() => {
        const loadAdScript = (key) => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `//www.topcreativeformat.com/${key}/invoke.js`;
            adRef.current.appendChild(script);
        };

        const handleResize = () => {
            while (adRef.current.firstChild) {
                adRef.current.removeChild(adRef.current.firstChild);
            }

            if (window.innerWidth < 551) {
                loadAdScript("f43f5857097d74aeb88b88bb4533e37d");
            } else if (window.innerWidth >= 551 && window.innerWidth <= 1024) {
                loadAdScript("a8bb164e951cde22acbf0c5047466f7a");
            } else {
                loadAdScript("f431300ee3c352f99d04fd721b580db9");
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={Style.adbanner_import} ref={adRef}>
        </div>
    );
};

export default Ads;



