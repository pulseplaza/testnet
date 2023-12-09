
import React from "react";
import Style from "./Filter.module.css";

const Filter = ({ onSort, value }) => {
  const handleSortChange = (event) => {
    onSort(event.target.value);
  };

  return (
    <div className={Style.filter}>
      <select onChange={handleSortChange} value={value}>
        <option value="" disabled>Sort By</option>
        <option value="newest">Recently Created</option>
        <option value="oldest">First Created</option>
        <option value="expensive">Price: High to Low</option>
        <option value="cheapest">Price: Low to High</option>
      </select>
    </div>
  );
};

export default Filter;

