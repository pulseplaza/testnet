
import React, { useState, useEffect } from "react";
import { SearchBar } from "../searchBarIndex";
import { Filter } from "../../components/componentsindex";
import Style from "./SearchWithFilter.module.css";

const SearchWithFilter = ({ onHandleSearch, onClearSearch, onSortChange, sortOption, placeholder = "Search" }) => {


    const [isNarrowScreen, setIsNarrowScreen] = useState(false);

    useEffect(() => {
        setIsNarrowScreen(window.innerWidth <= 1024);

        const handleResize = () => {
            setIsNarrowScreen(window.innerWidth <= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    return (
        <div className={Style.searchWrapper}>
            <div className={Style.searchBarContainer}>
                <SearchBar
                    onHandleSearch={onHandleSearch}
                    onClearSearch={onClearSearch}
                    placeholder={placeholder}
                    style={{ width: isNarrowScreen ? '90%' : '60%' }}
                />
            </div>
            <div className={Style.filterContainer}>
                <Filter onSort={onSortChange} value={sortOption} />
            </div>
        </div>
    );
};

export default SearchWithFilter;

