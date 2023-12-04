
import React from "react";
import Style from "./Ads.module.css";

const Ads = () => {
    return (
        <div className={Style.adbanner_import}>
            <iframe 
                src={`${process.env.PUBLIC_URL}/ads.html`} 
                title="Advertisement"
                style={{ width: '100%', height: 'auto', border: 'none' }} 
                scrolling="no">
            </iframe>
        </div>
    );
};

export default Ads;








