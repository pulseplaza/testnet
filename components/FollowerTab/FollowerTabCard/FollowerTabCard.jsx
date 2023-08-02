import React, {useState} from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";


//INTERNAL IMPORT
import Style from "./FollowerTabCard.module.css";


const imageStyle = {
    objectFit: 'cover',
};

const FollowerTabCard = ({ i, el}) => {
    const [following, setFollowing] = useState(false);

    const followMe = () => {
        if (!following) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }
    };

    return (
        <div className={Style.FollowerTabCard}>
            <div className={Style.FollowerTabCard_rank}>
                <p>
                    #{i + 1} <span>🎖️</span>
                </p>
            </div>

            <div className={Style.FollowerTabCard_box}>
                <div className={Style.FollowerTabCard_box_img}>
                    <div style={{position:"relative"}}>
                        <Image
                            className={Style.FollowerTabCard_box_img_img}
                            src={el.background}
                            alt="Profile background"
                            width={500}
                            height={300}
                            style={{objectFit:"cover"}}
                        />
                    </div>
                </div>


                <div className={Style.FollowerTabCard_box_profile}>
                    <div style={{position:"relative"}}>
                    <Image
                        className={Style.FollowerTabCard_box_profile_img}
                        src={el.user}
                        alt="Profile picture"
                        width={90}
                        height={90}
                        style={{objectFit:"cover"}}
                    />
                    </div>
                </div>

                <div className={Style.FollowerTabCard_box_info}>
                    <div className={Style.FollowerTabCard_box_info_name}>
                        <h4>
                            Giada Mann{""}{" "}
                            <span>
                                <MdVerified/>
                            </span>
                        </h4>
                        <p>420 PLS</p>
                    </div>

                    <div className={Style.FollowerTabCard_box_info_following}>
                        {following ? (
                           <a onClick={() => followMe()}>
                            Follow
                           </a> 
                        ) : (
                            <a onClick={() => followMe()}>Following</a>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FollowerTabCard;