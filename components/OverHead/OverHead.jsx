import React from "react";


//INTERNAL IMPORT
import Style from "./OverHead.module.css";


const OverHead = () => {
    return (
        <div className={Style.overHead}>
           BETA MODE, running on PulseChain Testnet V4. For testing purposes only!
        </div>
    )
};

export default OverHead;