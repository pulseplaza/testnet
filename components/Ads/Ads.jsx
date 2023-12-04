
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







import React, { useEffect } from "react";
import Style from "./Ads.module.css";

const Ads = () => {
    useEffect(() => {
        // Create script element
        const script = document.createElement("script");
        script.type = "text/javascript";

        // Define the script options
        const atOptions = {
            'key': 'f431300ee3c352f99d04fd721b580db9',
            'format': 'iframe',
            'height': 90,
            'width': 728,
            'params': {}
        };

        // Set the innerHTML of the script
        script.innerHTML = `document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/f431300ee3c352f99d04fd721b580db9/invoke.js"></scr' + 'ipt>');`;

        // Append the script to the document body
        document.body.appendChild(script);

        // Cleanup the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <div className={Style.adbanner_import}>

            document.body.removeChild(script);
            
        </div>
    );
};

export default Ads;











