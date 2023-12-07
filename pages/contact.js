
import React from "react";
import Head from 'next/head';


import {
    TiSocialFacebook,
    TiSocialLinkedin,
    TiSocialTwitter,
    TiSocialYoutube,
    TiSocialInstagram,
} from "react-icons/ti";

import { BsDiscord, BsTwitterX } from "react-icons/bs";
import { RiFacebookBoxFill, RiMastodonFill } from "react-icons/ri";

import { HiOutlineMail } from "react-icons/hi";


//INTERNAL IMPORT
import Style from "../styles/contact.module.css";
import formStyle from "../components/Form/Form.module.css";
import { Button, Title } from "../components/componentsindex";



const contactus = () => {








    return (
        <div className={Style.contactus}>

            <Head>
                <title>Contact Us - Pulse Plaza NFT Marketplace</title>
            </Head>

            <Title
                heading="Contact Us"
                paragraph="Ay doubts or questions? Feel free to contact us and we will get back to you as soon as possible."
            />


            <div className={Style.contactus_box}>
                {/* <h1>Contact Us</h1> */}
                <div className={Style.contactus_box_box}>
                    <div className={Style.contactus_box_box_left}>


                        <div className={Style.contactus_box_box_left_item}>
                            <h3>✉️ EMAIL</h3>
                            <p>contact@pulseplaza.io</p>
                        </div>


                        <div className={Style.contactus_box_box_left_item}>
                            <h3>🌍 SOCIAL</h3>
                            <div className={Style.contactus_social}>
                                <a href="https://discord.com/invite/w7tVUW9Fb3" target="_blank" rel="noopener noreferrer"><BsDiscord /></a>
                                <a href="https://twitter.com/PulsePlazaio" target="_blank" rel="noopener noreferrer"><BsTwitterX /></a>
                                <a href="https://www.facebook.com/PulsePlazaio" target="_blank" rel="noopener noreferrer"><RiFacebookBoxFill /></a>
                                <a href="https://instagram.com/pulseplazaio" target="_blank" rel="noopener noreferrer"><TiSocialInstagram /></a>
                                <a href="https://mastodon.social/@pulseplaza" target="_blank" rel="noopener noreferrer"><RiMastodonFill /></a>
                            </div>
                        </div>

                    </div>
                    <div className={Style.contactus_box_box_right}>

                        <h3>⚠️ CONTACT FORM CURRENTLY NOT WORKING. PLEASE USE EMAIL TO CONTACT US.</h3>


                        <form>
                            {/* First Name and Last Name input fields */}
                            <div className={formStyle.Form_box_input_group}>
                                <div className={formStyle.Form_box_input_half}>
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        className={formStyle.Form_box_input_userName}
                                    />
                                </div>
                                <div className={formStyle.Form_box_input_half}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className={formStyle.Form_box_input_userName}
                                    />
                                </div>
                            </div>

                            {/* Email input field */}
                            <div className={formStyle.Form_box_input}>
                                <label htmlFor="email">Email</label>
                                <div className={formStyle.Form_box_input_box}>
                                    <div className={formStyle.Form_box_input_box_icon}>
                                        <HiOutlineMail />
                                    </div>
                                    <input type="text" placeholder="john@gmail.com" />
                                </div>
                            </div>

                            {/* Message textarea field */}
                            <div className={formStyle.Form_box_input}>
                                <label htmlFor="description">Message</label>
                                <textarea
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="6"
                                    placeholder="What would you like to talk about?"
                                ></textarea>
                            </div>

                            {/* Send Message button */}
                            <Button
                                btnName="Send Message"
                                handleClick={() => { }}
                                classStyle={Style.button}
                            />
                        </form>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default contactus;







