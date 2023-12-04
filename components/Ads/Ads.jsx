
import React from "react";
import Style from "./Ads.module.css";

const Ads = () => {
    return (
        <div className={Style.adbanner_import}>
            <script
                src="/ads.html"
                title="Advertisement"
                style={{ width: '100%', height: 'auto', border: 'none' }}
            >
            </script>
        </div>
    );
};

export default Ads;








