import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md"


//INTERNAL IMPORT
import Style from "./DaysComponents.module.css";
import images from "../../../img";


const DaysComponents = ({ el, i }) => {
  return (
    <div className={Style.daysComponent}>
      <div className={Style.daysComponent_box}>
        <div className={Style.daysComponent_box_img}>
          <Image
            src={el.background}
            className={Style.daysComponent_box_img_img}
            alt="Profile background"
            width={500}
            height={300}
            style={{ width: '100%', height: '300px' }}
          />
        </div>

        <div className={Style.daysComponent_box_profile}>

          <Image
            src={images.creatorbackground2}
            alt="Profile"
            width={200}
            height={200}
            className={Style.daysComponent_box_img_1}
            style={{ width: '100%', height: 'auto' }}
          />

          <Image
            src={images.creatorbackground2}
            alt="Profile"
            width={200}
            height={200}
            className={Style.daysComponent_box_img_2}
            style={{ width: '100%', height: 'auto' }}
          />

          <Image
            src={images.creatorbackground2}
            alt="Profile"
            width={200}
            height={200}
            className={Style.daysComponent_box_img_3}
            style={{ width: '100%', height: 'auto' }}
          />

        </div>

        <div className={Style.daysComponent_box_title}>
          <h2>Amazing Collection</h2>
          <div className={Style.daysComponent_box_title_info}>
            <div className={Style.daysComponent_box_title_info_profile}>
              <Image
                src={el.user}
                alt="Profile"
                width={30}
                height={30}
                style={{ width: '100%', height: 'auto' }}
                className={Style.daysComponent_box_title_info_profile_img}
              />

              <div className={Style.daysComponent_box_title_info_profile_text}>
                <p>Creator</p>
                <p>
                  <span>
                    Max Mustermann
                    <small>
                      <MdVerified />
                    </small>
                  </span>
                </p>
              </div>

            </div>

            <div className={Style.daysComponent_box_title_info_price}>
              <small>650 PLS</small>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponents;