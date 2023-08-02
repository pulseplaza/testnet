import React from "react";
import Image from "next/image";


//INTERNAL IMPORT
import Style from "./Video.module.css";
import images from "../../img";


const Video = () => {
    return (
        <div className={Style.Video}>
            <div className={Style.Video_box}>
                <h1>
                    <span>🎬</span> Videos
                </h1>
                <p>
                    Check out our hottest videos on PulseChain.
                </p>

                <div className={Style.Video_box_frame}>
                    <div className={Style.Video_box_frame_left}>
                        <div style={{ position: "relative" }}>
                            <Image
                                src={images.NFTVideo}
                                alt="Video image"
                                width={1920}
                                height={1080}
                                style={{ objectFit: "cover" }}
                                className={Style.Video_box_frame_left_img}
                            />
                        </div>
                    </div>

                    <div className={Style.Video_box_frame_right}>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Video;