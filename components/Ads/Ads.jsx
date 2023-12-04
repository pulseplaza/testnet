
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

        // Define the script content
        const scriptContent = `
            atOptions = {
                'key' : 'f431300ee3c352f99d04fd721b580db9',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
            };
            document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/f431300ee3c352f99d04fd721b580db9/invoke.js"></scr' + 'ipt>');
        `;

        // Set the innerHTML of the container using dangerouslySetInnerHTML
        adContainerRef.current.innerHTML = `<script data-cfasync="false" type="text/javascript">${scriptContent}</script>`;

    }, []);

    return (
        <div className={Style.adbanner_import} ref={adContainerRef}>
            {/* Ad will be loaded here */}
        </div>
    );
};

export default Ads;

















