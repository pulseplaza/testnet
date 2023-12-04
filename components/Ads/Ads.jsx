
import React from 'react';
import Style from './Ads.module.css';

const Ads = () => {
    const adScript = {
        __html: `
            <script data-cfasync="false" type="text/javascript">
                if (typeof atAsyncOptions !== 'object') var atAsyncOptions = [];
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
                script.src = 'http' + (location.protocol === 'https:' ? 's' : '') + '://www.topcreativeformat.com/f431300ee3c352f99d04fd721b580db9/invoke.js';
                document.getElementsByTagName('head')[0].appendChild(script);
            </script>
            <div id="atContainer-f431300ee3c352f99d04fd721b580db9"></div>
        `,
    };

    return (
        <div className={Style.adbanner_import} dangerouslySetInnerHTML={adScript} />
    );
};

export default Ads;























