
// import React from "react";
// import Style from "./Ads.module.css";

// const Ads = () => {


//     return (
//         <div className={Style.adbanner_import}>
//             <iframe
//                 data-cfasync="false"
//                 src="//www.topcreativeformat.com/f431300ee3c352f99d04fd721b580db9/invoke.js"
//                 width="728"
//                 height="90"
//                 frameborder="0"
//                 scrolling="no"
//             />
//         </div>
//     );
// };

// export default Ads;







import React, { useEffect, useRef } from "react";
import Style from "./Ads.module.css";

const Ads = () => {
    const adContainerRef = useRef(null);

    useEffect(() => {
        // Check if the ad container is available
        if (!adContainerRef.current) {
            return;
        }

        // Create an iframe element
        const iframe = document.createElement("iframe");
        iframe.style.width = "728px";
        iframe.style.height = "90px";
        iframe.frameBorder = "0";
        iframe.scrolling = "no";
        iframe.marginWidth = "0";
        iframe.marginHeight = "0";

        // Append the iframe to the container
        adContainerRef.current.appendChild(iframe);

        // Write the script into the iframe
        const iframeDoc = iframe.contentWindow.document;
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//www.topcreativeformat.com/f431300ee3c352f99d04fd721b580db9/invoke.js";
        iframeDoc.body.appendChild(script);

        // Cleanup
        return () => {
            adContainerRef.current.removeChild(iframe);
        };
    }, []);

    return (
        <div className={Style.adbanner_import} ref={adContainerRef}>
            {/* Ad will be loaded here */}
        </div>
    );
};

export default Ads;












