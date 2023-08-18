import React from "react";


//INTERNAL IMPORT
import Style from "./OverHead.module.css";


const OverHead = () => {
    return (
        <div className={Style.overHead}>
           Pulse Plaza is in beta test mode, running on PulseChain Testnet V4. Many functionalities are still not working!
        </div>
    )
};

export default OverHead;