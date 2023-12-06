
import React, { useState, useEffect } from 'react';
import Style from './Ads.module.css';

const Ads = () => {
    const [adUrl, setAdUrl] = useState('');
    const [iframeSize, setIframeSize] = useState({ width: '100%', height: 'auto' });

    useEffect(() => {
        const determineAdUrl = () => {
            if (window.innerWidth <= 600) {
                setAdUrl('/ads-small.html');
            } else if (window.innerWidth <= 1024) {
                setAdUrl('/ads-medium.html');
            } else {
                setAdUrl('/ads-big.html');
            }
        };

        const handleMessage = (event) => {
            if (event.data.frameHeight && event.data.frameWidth) {
                setIframeSize({ height: event.data.frameHeight + 'px', width: event.data.frameWidth + 'px' });
            }
        };

        window.addEventListener('resize', determineAdUrl);
        window.addEventListener('message', handleMessage);

        determineAdUrl();

        return () => {
            window.removeEventListener('resize', determineAdUrl);
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <div className={Style.adbanner_import}>
            <iframe 
                title="Ad"
                style={{ ...iframeSize, border: 'none' }}
                src={adUrl}
            />
        </div>
    );
};

export default Ads;

