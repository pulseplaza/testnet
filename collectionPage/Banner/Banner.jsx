import React from "react";
import Image from "next/image";


//INTERNAL IMPORT
import Style from "./Banner.module.css";


const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <div style={{position:"relative"}}>
          <Image
            src={bannerImage}
            style={{objectFit:"cover", width: "100%", height: "300px"}}
            alt="Background"
            width={1600}
            height={300}
          />
        </div>
      </div>

      <div className={Style.banner_img_mobile}>
        <div style={{position:"relative"}}>
          <Image
            src={bannerImage}
            style={{objectFit:"cover", width: "100%", height: "700px"}}
            alt="Background"
            width={1600}
            height={700}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;