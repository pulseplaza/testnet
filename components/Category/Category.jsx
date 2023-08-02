import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";


//INTERNAL IMPORT
import Style from "./Category.module.css";
import images from "../../img";



const Category = () => {
    const CategoryArray = [
        images.creatorbackground1,
        images.creatorbackground2,
        images.creatorbackground3,
        images.creatorbackground4,
        images.creatorbackground5,
        images.creatorbackground6,
    ];

    return (
        <div className={Style.box_category}>
            <div className={Style.category}>
            {CategoryArray.map((el, i) => (
                <div className={Style.category_box} key={1 + 1}>

                    <Image
                        src={el}
                        className={Style.category_box_img}
                        alt="Background image"
                        width={350}
                        height={150}
                        style={{ width: '100%', height: '150px' }}
                    />

                    <div className={Style.category_box_title}>
                        <span>
                            <BsCircleFill/>
                        </span>
                        <div className={Style.category_box_title_info}>
                            <h4>Entertainment</h4>
                            <small>1995 NFTs</small>

                        </div>
                    </div>
                </div>
            ))}
        </div>

        </div>
        
    );
};

export default Category;