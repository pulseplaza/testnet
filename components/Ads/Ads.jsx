
import React, { useEffect, useState } from "react";
import Style from "./Ads.module.css";

const Ads = () => {
    // const [adSrc, setAdSrc] = useState("");

    // useEffect(() => {
        // const handleResize = () => {
        //     if (window.innerWidth < 551) {
        //         setAdSrc("//www.topcreativeformat.com/f43f5857097d74aeb88b88bb4533e37d/invoke.js");
        //     } else if (window.innerWidth >= 551 && window.innerWidth <= 1024) {
        //         setAdSrc("//www.topcreativeformat.com/a8bb164e951cde22acbf0c5047466f7a/invoke.js");
        //     } else {
        //         setAdSrc("//www.topcreativeformat.com/f431300ee3c352f99d04fd721b580db9/invoke.js");
        //     }
        // };

    //     handleResize();
    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    return (
        <div className={Style.adbanner_import}>
            <iframe
                data-cfasync="false"
                src="//www.topcreativeformat.com/f431300ee3c352f99d04fd721b580db9/invoke.js"
                width="728"
                height="90"
                frameborder="0"
                scrolling="no"
            />
        </div>
    );
};

export default Ads;










