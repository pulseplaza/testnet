import React from "react";


//INTERNAL IMPORT
import Style from "../styles/fees.module.css";
import Fees from "../Fees/Fees";



const fees = () => {

    const feesArray = [
        {
            plan: "STARTER",
            price: "$5/mo",
            popular: "",
            service: ["Automated Reporting", "Faster Processing", "Customizations"],
            info: "Literally you probably haven't heard of them jean shorts.",
        },
        {
            plan: "BASIC",
            price: "$15/mo",
            popular: "POPULAR",
            service: [
                "Everything in Starter",
                "100 Builds",
                "Progress Reports",
                "Premium Support",
            ],

            info: "Literally you probably haven't heard of them jean shorts.",
        },
        {
            plan: "PLUS",
            price: "$25/mo",
            popular: "",
            service: [
                "Everything in Basic",
                "Unlimited Builds",
                "Advanced Analytics",
                "Company Evaluations",
            ],

            info: "Literally you probably haven't heard of them jean shorts.",
        },
    ];


    return (
        <div className={Style.Fees}>
            <div className={Style.Fees_box}>
                <div className={Style.Fees_box_info}>
                    <h1>💎 Fees</h1>
                    <p>Pricing to fit the needs of any company size.</p>
                </div>

                <div className={Style.Fees_box_box}>
                    {feesArray.map((el, i) => (
                        <Fees key={i + 1} i={1} el={el} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default fees;