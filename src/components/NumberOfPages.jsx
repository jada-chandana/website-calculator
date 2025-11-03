import React from "react";
import { NavLink } from "react-router-dom";
import Chips from "./ChipsInput";

const type = [
  { name: "1-4", price: 0, limit: 4 },
  { name: "5-9", price: 0, limit: 9 },
  { name: "10-14", price: 0, limit: 14 },
  { name: "Unlimited", price: 0, limit: Infinity },
];

const Pages = ({ selectedItems = {}, setSelectedItems = () => {} }) => {
  // Handle selection of page type
  const handleSelect = (item) => {
    setSelectedItems({ ...selectedItems, pages: item });
  };

  // ✅ Get chips safely (empty array if not present)
  const selectedChips = selectedItems.chips || [];

  // ✅ Enable "Next" only if either pages or chips are selected
  const isNextEnabled = !!selectedItems.pages && selectedChips.length >0;

  return (
    <>
      <h3 className="head">How much to make website</h3>
      <h3 className="sub">Number of Pages</h3>

      {/* ✅ Page Options */}
      <ul className="item-grid">
        {type.map((item, index) => (
          <li
            key={index}
            onClick={() => handleSelect(item)}
            style={{
              cursor: "pointer",
              border:
                selectedItems?.pages?.name === item.name
                  ? "2px solid #0056d2"
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

      {/* ✅ Chips Input Section */}
      <Chips selectedItems={selectedItems} setSelectedItems={setSelectedItems} />

      {/* ✅ Navigation Buttons */}
      <div className="btn" style={{ marginTop: "30px" }}>
        <NavLink className="next" to="/">
          Previous
        </NavLink>

        <NavLink
          to={isNextEnabled ? "/nextPages" : "#"}
          className={`next ${!isNextEnabled ? "disabled" : ""}`}
          onClick={(e) => {
            if (!isNextEnabled) e.preventDefault();
          }}
        >
          Next
        </NavLink>
      </div>
    </>
  );
};

export default Pages;
