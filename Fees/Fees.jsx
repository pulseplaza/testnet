

import React from "react";


//INTERNAL IMPORT
import Style from "../Fees/Fees.module.css";


const Fees = ({ el, i }) => {
    return (
        <div className={Style.FeesBox}>
            <div className={Style.FeesBox_box}>
                <span className={Style.FeesBox_box_span}>{el.plan}</span>


                <p className={Style.FeesBox_box_price}>{el.price}</p>

                <div className={Style.FeesBox_box_info}>
                    {el.service.map((el, i) => (
                        <p className={Style.FeesBox_box_info_para} key={i + 1}>
                            
                            {el}
                        </p>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default Fees;
