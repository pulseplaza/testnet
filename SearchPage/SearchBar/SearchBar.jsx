
import React, { useEffect, useState } from "react";
import { BsSearch, BsArrowRight } from "react-icons/bs";


import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./SearchBar.module.css";



const SearchBar = ({ onHandleSearch, onClearSearch, placeholder = "Search", className, style }) => {


  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);
  const [isInitialQuerySet, setIsInitialQuerySet] = useState(false);

  const router = useRouter();



  useEffect(() => {
    const queryParam = router.query.query;
    if (queryParam && !isInitialQuerySet) {
      setSearchItem(queryParam);
      onHandleSearch(queryParam);
      setIsInitialQuerySet(true);
    }
  }, [router.query, onHandleSearch]);


  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]);


  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);


  return (
    <div className={`${Style.SearchBar} ${className}`}>
      <div className={Style.SearchBar_box} style={style}>
        <BsSearch className={Style.SearchBar_box_icon} />
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => setSearchItem(e.target.value)}
          value={searchItem}
        />
        <BsArrowRight className={Style.SearchBar_box_icon} />

      </div>

    </div>

  );
};

export default SearchBar;

