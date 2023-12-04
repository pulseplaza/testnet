
import React, { useEffect } from 'react';
import Style from './Ads.module.css';

const Ads = () => {
    useEffect(() => {
        // Check if the script is already loaded
        if (typeof atAsyncOptions === 'undefined') {
            var atAsyncOptions = [];
            atAsyncOptions.push({
                'key': 'f431300ee3c352f99d04fd721b580db9',
                'format': 'js',
                'async': true,
                'container': 'atContainer-f431300ee3c352f99d04fd721b580db9',
                'params': {}
            });

            var script = document.createElement('script');
            script.type = "text/javascript";
            script.async = true;
            script.src = 'http' + (window.location.protocol === 'https:' ? 's' : '') + '://www.topcreativeformat.com/f431300ee3c352f99d04fd721b580db9/invoke.js';
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    }, []);

    return (
        <div className={Style.adbanner_import}>
            <div id="atContainer-f431300ee3c352f99d04fd721b580db9"></div>
        </div>
    );
};

export default Ads;






















