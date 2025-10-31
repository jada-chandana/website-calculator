import React from "react";
import { useState,useEffect } from "react";
import Chips from "./ChipsInput";
import { NavLink } from "react-router-dom";

const type = [
  { name: "1-4", price: 0 ,limit:4},
  { name: "5-9", price: 0 ,limit:9},
  { name: "10-14", price: 0 ,limit:14},
  { name: "Unlimited", price: 0,limit:Infinity },
];

const Pages = ({ selectedItems = {}, setSelectedItems = () => {} }) => {
  
  const handleSelect = (item) => {
    setSelectedItems({ ...selectedItems, pages: item });
  };

  // ✅ Enable Next button only if a page is selected
  const isPageSelected = !!selectedItems.pages;

  return (
    <>
      <h3 className="head">How much to make website</h3>
      <h3 className="sub">Number of Pages</h3>

      <ul className="item-grid">
        {type.map((item, index) => (
          <li
            key={index}
            onClick={() => handleSelect(item)}
            style={{
              cursor: "pointer",
              border:
                selectedItems?.pages?.name === item.name
                  ? "2px solid blue"
                  : "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              backgroundColor:
                selectedItems?.pages?.name === item.name ? "#eaf0ff" : "white",
              transition: "all 0.3s ease",
              textAlign: "center",
              fontFamily: "sans-serif",
            }}
          >
            <p className="type-name">{item.name}</p>
          </li>
        ))}
      </ul>

      {/* Chips Input */}
      <Chips selectedItems={selectedItems} setSelectedItems={setSelectedItems} />

      {/* Navigation Buttons */}
      <div className="btn" style={{ marginTop: "30px" }}>
        {/* ✅ Previous always enabled */}
        <NavLink className="next" to="/">
          Previous
        </NavLink>

        {/* ✅ Next disabled until page is selected */}
        <NavLink
          to={isPageSelected ? "/nextPages" : "#"}
          className={`next ${!isPageSelected ? "disabled" : ""}`}
          onClick={(e) => {
            if (!isPageSelected) e.preventDefault();
          }}
        >
          Next
        </NavLink>
      </div>
    </>
  );
};

export default Pages;
